import React, { useEffect, useRef } from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import {chain} from '@/utils/chain'
import { updateDoc, getOne } from 'firebase-crowdfund/queries'
import {db, storage} from '../../firebase-crowdfund/index'
import campaignAbi from '@/components/ContractRelated/CampaignAbi';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from "@material-ui/lab/Alert";
import { Icon } from '@material-ui/core';
import * as IconFeather from 'react-feather';
import Link from 'next/link';

const Web3 = require('web3');

// async function selectPlan(amount){
//     let c = await loadWeb3();
//     if(c){
//         //interact with contract
//         console.log("plan selected of " + amount)
//     }
// }

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const PricingTiers = (props) => {

    const connected = useSelector((state) => state.metamask_connected)
    const chainID = useSelector((state) => state.chainID)
    const userAddr = useSelector((state) => state.address)
    const web3Instance = useSelector((state) => state.web3Instance)

    const campaign = props.project

    const [open, setOpen] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [creationState, setCreationState] = React.useState(0);
    const [Tx, setTx] = React.useState("");


    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {

    }, [web3Instance])

    const openDialog = () => {
        setDialogOpen(true)
    }

    const closeDialog = () => {
        setDialogOpen(false)
    }

    const openSnackbar = () => {
        closeDialog()
        setSnackbarOpen(true)
    }

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false)
    }

    const removeFromPending = (indexTier) => {

        var tierCamp = db.collection("campaign").doc(campaign.contract_address);

        db.runTransaction((transaction) => {
            return transaction.get(tierCamp).then((camp) => {
                if (!camp.exists) {
                    throw "Document does not exist!";
                }

                if(camp.data().tiers[indexTier].pending.includes(userAddr)) {

                    var newTiers = camp.data().tiers
                    var filtered = newTiers[indexTier].pending.filter(function(value){
                        return value != userAddr;
                    })

                    newTiers[indexTier].pending = filtered;

                    transaction.update(tierCamp, { tiers: newTiers });
                } else {
                    throw "Address not found in pending"
                }
                
            });
        }).then(function (camp) {
            if(!camp.data().tiers[indexTier].pending.includes(userAddr))
                console.log("Removed from pending because of failure of tx")  
                
        }).catch((err) => {
            console.error(err);
        });
    }

    const removePendAddSubs = (indexTier) => {
        var tierCamp = db.collection("campaign").doc(campaign.contract_address);

        db.runTransaction((transaction) => {
            return transaction.get(tierCamp).then((camp) => {
                if (!camp.exists) {
                    throw "Document does not exist!";
                }

                var newTiers = camp.data().tiers
                var filtered = newTiers[indexTier].pending.filter(function(value){
                    return value != userAddr;
                })

                newTiers[indexTier].pending = filtered;
                newTiers[indexTier].subscribers.push(userAddr);

                transaction.update(tierCamp, { tiers: newTiers });

            });
        }).then(function() {
            console.log("Removed from pending and added to subsribers")   
                
        }).catch((err) => {
            console.error(err);
        });
    }

    const monitortransacDB = (index) => {

        window.addEventListener('beforeunload', (e) => {
            e.preventDefault();
            
            removeFromPending(index);
                
            window.onbeforeunload = false;

            // return null;
            
        });

        // window.addEventListener('unload', (e) => {
        //     // e.preventDefault();
    
        //     if(campaign.tiers[index].pending.includes(userAddr)) {
        //         removeFromPending(index);
        //     }
            
        //     // if (performance.navigation.type == performance.navigation.TYPE_RELOAD) {
        //     //     removeFromPending(index);
        //     // }
        // });

        var tierCamp = db.collection("campaign").doc(campaign.contract_address);

        db.runTransaction((transaction) => {
            return transaction.get(tierCamp).then((camp) => {
                if (!camp.exists) {
                    throw "Document does not exist!";
                }

                var total = camp.data().tiers[index].pending.length + camp.data().tiers[index].subscribers.length

                if (camp.data().tiers[index].maxClaimers != -1 && ((camp.data().tiers[index].maxClaimers === camp.data().tiers[index].subscribers.length) || (total >= camp.data().tiers[index].maxClaimers))) {
                    setErrorMsg("Sorry, this plan is not available anymore !")
                    openSnackbar()
                    //alert("Sorry, this plan is not available anymore !")
                    throw "Plan not available anymore"
                } else {
                    // checker si maxClaimers == -1 <=> unlimited
                    console.log("entering in the case where its availbale")
                    if ((camp.data().tiers[index].maxClaimers == -1 && !camp.data().tiers[index].pending.includes(userAddr)) || (total < camp.data().tiers[index].maxClaimers && !camp.data().tiers[index].pending.includes(userAddr))) {
                        var newTiers = camp.data().tiers
                        newTiers[index].pending.push(userAddr)
                        transaction.update(tierCamp, { tiers: newTiers });
                        return newTiers;
                    } else {
                        setErrorMsg("You already are in a transaction")
                        openSnackbar()
                        return Promise.reject("You already are in a transaction !");
                    }
                }
            });
        }).then(async function() {
            // TX Metamask
            // onSuccess => retire du [] pending et on le met dans [] subscribers
            // onFailure => retire du [] pending
                
            const campCtrInstance = new web3Instance.eth.Contract(campaignAbi.campaignAbi, campaign.contract_address)
                if(campaign.currency == "ETH")
                    await participateInETH(campCtrInstance, campaign.tiers[index].threshold, index)
                else
                    await participateInERC20(campCtrInstance, campaign.tiers[index].threshold, index)
               
                
            })
        .catch((err) => {
            console.error(err);
        });
    }


    async function participateInETH(contractInstance, v, indexTier) {
       contractInstance.methods.participateInETH()
            .send({from : userAddr, value: web3Instance.utils.toWei(v)})
            .on('transactionHash', function(hash){
                openDialog()
                console.log("hash :" + hash)
                setTx(hash);
     
            })
            .on('confirmation', function(confirmationNumber, receipt){ 
    
                console.log("Confirmation number:" + confirmationNumber)
            })
            .on("error", function(error) {
                setErrorMsg(error.code + " : " + error.message)
                openSnackbar()
                if (indexTier !== undefined) {
                    removeFromPending(indexTier);
                    console.log(error);
                } else {
                    console.log(error)
                }

            })
            .then(() => {
                setCreationState(1)
                if(indexTier !== undefined) {
                    removePendAddSubs(indexTier);
                } else {
                    //alert("Thanks for helping the campaign !")
                }
            })
    }

    async function participateInERC20(contractInstance, v, indexTier){
        contractInstance.methods.participateInERC20(v)
            .send({from : userAddr, value: 0})
            .on('transactionHash', function(hash){
                openDialog()
                console.log("hash :" + hash)
                setTx(hash);
            })
            .on('confirmation', function(confirmationNumber, receipt){
    
                console.log("Confirmation number:" + confirmationNumber)
            })
            .on("error", function(error) {
                setErrorMsg(error.code + " : " + error.message)
                openSnackbar()
                if (indexTier !== undefined) {
                    removeFromPending(indexTier);
                    console.log(error);
                } else {
                    console.log(error)
                }

            })
            .then(() => {
                setCreationState(1)
                if(indexTier !== undefined) {
                    removePendAddSubs(indexTier);
                } else {
                    //alert("Thanks for helping the campaign !")
                }
            })
        }

    const selectPlan = (tier, index) => {
        if(connected == true && chainID == chain){
            // console.log("content tier : " + JSON.stringify(tier))
            console.log("plan selected of " + tier.threshold);

            monitortransacDB(index);

            // add to Followed projects
        } else {
            handleDialogOpen()
        }
    }

    const valueRef = useRef('')

    const handleClick = (tier, index) => e => {    
        if(tier.threshold > 0){
            selectPlan(tier, index)
        }
    }

    async function handleClickFree(e) {    
        let amount = valueRef.current.value
        if(amount > 0){
            const campCtrInstance = new web3Instance.eth.Contract(campaignAbi.campaignAbi, campaign.contract_address)
                if(campaign.currency == "ETH")
                    await participateInETH(campCtrInstance, amount, undefined)
                else
                    await participateInERC20(campCtrInstance, amount, undefined)
        }
    }

    const displayTiers = () => {

        var rows = [];
        for (var i = 0; i < campaign.tiers.length; i++) {
            var tier = campaign.tiers[i];
            var disable = tier.maxClaimers === tier.subscribers.length ? "disabled" : "";
            var text = tier.maxClaimers === tier.subscribers.length ? "Out of stock" : "Select Plan";
            var classe = tier.maxClaimers === tier.subscribers.length ? "btn btn-primary-disabled" : "btn btn-primary"; 
            rows.push( 
                <div key={i} className="col-lg-4 col-md-6">
                        <div className="pricing-table active-plan">
                            <div className="pricing-header">
                                <h3>{tier.title}</h3>
                            </div>
                            
                            <div className="price">
                                <span><sup>{campaign.currency}</sup>{tier.threshold}</span>
                            </div>
                            
                            <div className="pricing-features">
                                <ul>
                                    <li className="active">{tier.description}</li>
                                </ul>
                            </div>
                            
                            <div className="pricing-footer">
                                
                                    <button onClick={handleClick(tier, i)} className={classe} disabled={disable}>{text}</button>
                            </div>
                        </div>
                    </div>
            );
        }
        return rows;
      }

     const displayConfirmModal = (x) => {
        switch(x) {
            case 0:
                return <div style={{justifyContent:'center'}}>
                <DialogTitle id="alert-dialog-title">Waiting for confirmation...</DialogTitle>
                <DialogContent>

                    <CircularProgress style={{marginTop: 20, marginBottom: 20}}/>

                <DialogContentText id="alert-dialog-description">
                Transaction Hash : </DialogContentText>
                <DialogContentText id="alert-dialog-description"><a href={`https://etherscan.io/tx/${Tx}`} target="_blank">{Tx}</a></DialogContentText>
                </DialogContent></div>
            case 1:
                return <div style={{justifyContent:'center'}}>
                <DialogTitle id="alert-dialog-title">Thanks for your participation ! <IconFeather.Heart/></DialogTitle>
                <DialogContent>    
                <div style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                    <h5>You supported succesfully :</h5>
                    <h4 style={{marginBottom: 5}}>{campaign.title}</h4>
                    <img width={320} height={180} src={campaign.main_img} alt='campaign image'/>
                    <DialogContentText id="alert-dialog-description">
                    <Link href={{
                                pathname: "/"
                                }}
                                >
                            <a style={{marginTop: 15}} className="btn btn-primary">Discover other projects </a>
                            </Link>  </DialogContentText>
                </div>
                <DialogContentText id="alert-dialog-description" style={{marginTop: 15}}>
                Transaction confirmed : </DialogContentText>
                <DialogContentText id="alert-dialog-description"><a href={`https://etherscan.io/tx/${Tx}`} target="_blank">{Tx}</a></DialogContentText>
                </DialogContent></div>
            default:
                return <div style={{justifyContent:'center'}}>
                <DialogTitle id="alert-dialog-title">Waiting for confirmation...</DialogTitle>
                <DialogContent>
                
                <CircularProgress style={{marginTop: 20, marginBottom: 20}}/>
                </DialogContent></div>

        }
    }

    const displayContent = () => {
        if(userAddr != campaign.creator){
            return <div className="pricing-area pt-80 pb-50 bg-f9f6f6">

            <Snackbar
                open={snackbarOpen}
                onClose={() => handleCloseSnackbar()}
                autoHideDuration={9000}
            >
            <Alert onClose={() => handleCloseSnackbar()} severity="error" >
                Error : {errorMsg}
            </Alert>
            </Snackbar>

            <Dialog
                open={dialogOpen}
                onClose={(_, reason) => {
                    if (reason !== "backdropClick") {
                        closeDialog();
                    }
                    }}
                
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {displayConfirmModal(creationState)}
                {/* <DialogActions>
                <Button onClick={this.closeDialog} color="primary">
                    Close
                </Button>
                </DialogActions> */}
            </Dialog>

            <div className="container">
                <div className="section-title">
                    <h2>{campaign.title}</h2>
                    <p>{campaign.small_description}</p>
                    <div className="bar"></div>

                    <h3>Choose the plan you want and the amount you wish to donate !</h3>
                    
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6">
                        <div className="pricing-table">
                            <div className="pricing-header">
                                <h3>Free donation</h3>
                            </div>
                            
                            <div className="price">
                                <span><sup>{campaign.currency}</sup> 
                                <TextField
                                id="standard-number"
                                type="number"
                                size="small"
                                inputRef={valueRef}   //connecting inputRef property of TextField to the valueRef

                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{ min: 0}}
                                /></span>
                            </div>
                            
                            <div className="pricing-features">
                                <ul>
                                    <li className="active">Thanks for supporting this campaign !</li>
                                </ul>
                            </div>
                            
                            <div className="pricing-footer">
                                <button onClick={handleClickFree} className="btn btn-primary">Select Plan</button>
                            </div>
                        </div>
                    </div>   

                    {displayTiers()}


                </div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"You are not connected to the Ethereum Network with Metamask"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please connect to Metamask. If you are already connected, be sure to select Ethereum Mainnet as network on the Metamask tab.
                    </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>

            {/* Shape Images */}
            <div className="shape8 rotateme">
                <img src="/images/shape2.svg" alt="shape" />
            </div>
            <div className="shape2 rotateme">
                <img src="/images/shape2.svg" alt="shape" />
            </div>
            <div className="shape7">
                <img src="/images/shape4.svg" alt="shape" />
            </div>
            <div className="shape4">
                <img src="/images/shape4.svg" alt="shape" />
            </div>
        </div>
        } else {
            return <>
                <div className="pricing-area pt-80 pb-50 bg-f9f6f6">
                    <div className="container">
                        <div className="section-title">
                            <h2>Access forbidden</h2>
                            <div className="bar"></div>

                            <h3>You can't donate to your own campaign !</h3>
                            <Link href={{
                            pathname: "/Campaigns/[id]",
                            query: {
                                id: campaign.contract_address,
                                }
                            }}
                            >
                            <a style={{marginTop: 15}} className="btn btn-primary">Back to your campaign</a>
                            </Link>  
                        </div>
                    </div>

                    {/* Shape Images */}
                    <div className="shape8 rotateme">
                        <img src="/images/shape2.svg" alt="shape" />
                    </div>
                    <div className="shape2 rotateme">
                        <img src="/images/shape2.svg" alt="shape" />
                    </div>
                    <div className="shape7">
                        <img src="/images/shape4.svg" alt="shape" />
                    </div>
                    <div className="shape4">
                        <img src="/images/shape4.svg" alt="shape" />
                    </div>
                    </div>
            </>
        }
    }

    return (

        displayContent()
    );
    
}

export default PricingTiers;
