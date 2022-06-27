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
import {bnb_chain} from '@/utils/bnb_chain'
import { updateDoc, getOne } from 'firebase-crowdfund/queries'
import {db, storage} from '../../firebase-crowdfund/index'
import campaignAbi from '@/components/ContractRelated/CampaignAbi';
import {usdcAddr} from '@/components/ContractRelated/USDCAddr';
import {bbstAddr} from '@/components/ContractRelated/BbstAddr';
import {bnb_busdAddr} from '@/components/ContractRelated/bnb_busdAddr';
import {bnb_bbstAddr} from '@/components/ContractRelated/bnb_BbstAddr';

import {erc20PaymentAddr} from '@/components/ContractRelated/ERC20PaymentAddr';
import {bnb_erc20PaymentAddr} from '@/components/ContractRelated/bnb_ERC20PaymentAddr';
import {erc20PaymentAbi} from '@/components/ContractRelated/ERC20PaymentABI';
import { erc20standardAbi } from '../ContractRelated/ERC20standardABI';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from "@material-ui/lab/Alert";
import { Icon } from '@material-ui/core';
import * as IconFeather from 'react-feather';
import Link from 'next/link';
import { BN } from 'bn.js';
import { toBaseUnit } from '@/utils/bnConverter';
import { bbstAbi } from '../ContractRelated/BbstAbi';
import firebase from '../../firebase-crowdfund/index';
import { prefixedAddress } from '@/utils/prefix';

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
  //  const currentUser = useSelector((state) => state.currentUser)
    const campaign = props.project

    const [open, setOpen] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [creationState, setCreationState] = React.useState(0);
    const [Tx, setTx] = React.useState("");
    const [subsLength, setSubsLength] = React.useState("");

    var globalERC20Addr
    if(campaign.network == chain){
        globalERC20Addr = erc20PaymentAddr
    } else if(campaign.network == bnb_chain){
        globalERC20Addr = bnb_erc20PaymentAddr
    }


    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        
        getSubsLength();
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

 
    const monitortransacDB = async(index) => {

       
            // TX Metamask
            // onSuccess => retire du [] pending et on le met dans [] subscribers
            // onFailure => retire du [] pending

            // var userDoc = db.collection("profile").doc(userAddr);
            // // Atomically add a new region to the "participated" array field.
            // userDoc.update({
            //     participated: firebase.firestore.FieldValue.arrayUnion(campaign.contract_address)
            // })
                            
            const campCtrInstance = new web3Instance.eth.Contract(campaignAbi.campaignAbi, campaign.contract_address)
                if(campaign.currency == "ETH" || campaign.currency == "b_BNB")
                    await participateInETH(false, campCtrInstance, campaign.tiers[index].threshold, index)
                else
                    await participateInERC20(false, campCtrInstance, campaign.tiers[index].threshold, index)
    }


    async function participateInETH(isFreeDonation, contractInstance, v, indexTier) {
       let ind = isFreeDonation ? 0 : indexTier + 1

       contractInstance.methods.participateInETH(ind)
            .send({from : userAddr, value: web3Instance.utils.toWei(v)})
            .on('transactionHash', function(hash){
                openDialog()
                console.log("hash :" + hash)
                setTx(hash);
     
            })
            .on('confirmation', function(confirmationNumber, receipt){ 
    
                // console.log("Confirmation number:" + confirmationNumber)
            })
            .on("error", function(error) {
                setErrorMsg(error.code + " : " + error.message)
                openSnackbar()
                
            })
            .then(() => {
                setCreationState(1)
                
            }).catch(() => {
                console.log("error in the transac")
            })
    }



    async function checkAllowed(contractInstance){
        console.log(globalERC20Addr)
       return await contractInstance.methods.allowance(userAddr, globalERC20Addr).call()
      
    }

    async function participateInERC20(isFreeDonation, contractInstance, v, indexTier){
        console.log("participatinginERC20")
        let erc20Ctr = undefined

        const max = new BN("115792089237316195423570985008687907853269984665640564039457584007913129639935");

        if(campaign.currency == "USDC"){
            erc20Ctr = new web3Instance.eth.Contract(erc20standardAbi, usdcAddr)
        } else if(campaign.currency == "BBST"){
            erc20Ctr = new web3Instance.eth.Contract(bbstAbi, bbstAddr)
        } else if(campaign.currency == "b_BUSD"){
            erc20Ctr = new web3Instance.eth.Contract(erc20standardAbi, bnb_busdAddr)
        } else if(campaign.currency == "b_BBST"){
            erc20Ctr = new web3Instance.eth.Contract(erc20standardAbi, bnb_bbstAddr)
        }

        console.log(v)


        if(erc20Ctr != undefined){
            erc20Ctr.methods.decimals().call().then((decimals) => {
                console.log(decimals)
                const amt = toBaseUnit(v.toString(), decimals.toString(), web3Instance.utils.BN)     
                console.log(amt.toString())

                checkAllowed(erc20Ctr).then(res => {
                    let bnres = new BN(res.toString())
                    console.log(bnres)
                    // console.log(amt)
                    if(bnres.gte(amt)){
                         console.log("allowance OK")
                        payInERC(isFreeDonation, contractInstance, amt, indexTier)
                    } else {
                        console.log("approve to do")

                        erc20Ctr.methods.approve(globalERC20Addr, max).send({from : userAddr, value: 0})
                        .on('transactionHash', function(hash){
                            setCreationState(2)
                            openDialog()
                            console.log("hash :" + hash)
                            setTx(hash);
                        })
                        .on("error", function(error) {
                            setErrorMsg(error.code + " : " + error.message)
                            openSnackbar()    
                        })
                        .then(() => {
                            setCreationState(3)
                            payInERC(isFreeDonation, contractInstance, amt, indexTier);
                        })
                    }
                })
            })
        }            
    }
    

    async function payInERC(isFreeDonation, contractInstance, v, indexTier){

       
            let ind = isFreeDonation ? 0 : indexTier + 1;

            // let erc20Inst = await new web3Instance.eth.Contract(erc20PaymentAbi, erc20PaymentAddr)

            // erc20Inst.methods.payInERC20Bis(v, userAddr, campaign.contract_address, usdcAddr).send({from : userAddr, value: 0})
            // .on("error", function(error) {
            //     setErrorMsg(error.code + " : " + error.message)
            //     openSnackbar()    
            // })
            // .then(res => console.log(res))

            // console.log(ind)
            // console.log(v)
            console.log(v.toString())

            contractInstance.methods.participateInERC20(ind, v)
                .send({from : userAddr, value: 0})
                .on('transactionHash', function(hash){
                    setCreationState(0)
                    openDialog()
                    console.log("hash :" + hash)
                    setTx(hash);
                })
                .on('confirmation', function(confirmationNumber, receipt){
        
                    // console.log("Confirmation number:" + confirmationNumber)
                })
                .on("error", function(error) {
                    setErrorMsg(error.code + " : " + error.message)
                    openSnackbar()
                    console.log(error)
    
                })
                .then((a) => {
                    setCreationState(1)
                    // console.log(a.events)
                })
    }


    const selectPlan = (tier, index) => {
        if(connected == true && chainID == campaign.network){
            // console.log("content tier : " + JSON.stringify(tier))
            // console.log("plan selected of " + tier.threshold);

            var ind = parseInt(index)

            monitortransacDB(ind);

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
            // var userDoc = db.collection("profile").doc(userAddr);
            // console.log(userDoc)
            // // Atomically add a new region to the "participated" array field.
            // userDoc.update({
            //     participated: firebase.firestore.FieldValue.arrayUnion(campaign.contract_address)
            // }).then(res => console.log(res));
            
            const campCtrInstance = new web3Instance.eth.Contract(campaignAbi.campaignAbi, campaign.contract_address)
                if(campaign.currency == "ETH" || campaign.currency == "b_BNB")
                    await participateInETH(true, campCtrInstance, amount, 0)
                else
                    await participateInERC20(true, campCtrInstance, amount, 0)
        }
    }

    const getSubsLength = async() => {
        if(web3Instance != undefined && chainID == campaign.network){
            const campCtrInstance = new web3Instance.eth.Contract(campaignAbi.campaignAbi, campaign.contract_address)
            campCtrInstance.methods.getStock().call().then(res => {
                // console.log(res)
                setSubsLength(res);
            })
        }
        
    }

    const showCurrencyWoPrefix = () => {
        if(campaign.currency.includes('_'))
            return campaign.currency.substring(campaign.currency.indexOf('_') + 1);
        else
            return campaign.currency
    }

    const displayTiers = () => {

        var rows = [];
        for (var i = 0; i < campaign.tiers.length; i++) {
            var tier = campaign.tiers[i];
            // var subsLength = subsLength;
            var disable = parseInt(subsLength[i+1]) === 0 ? "disabled" : "";
            var text = parseInt(subsLength[i+1]) === 0 ? "Out of stock" : "Select Plan";
            var classe = parseInt(subsLength[i+1]) === 0 ? "btn btn-primary-disabled" : "btn btn-primary"; 
            // console.log(subsLength)
            rows.push( 
                <div key={i} className="col-lg-4 col-md-6">
                        <div className="pricing-table active-plan">
                            <div className="pricing-header">
                                <h3>{tier.title}</h3>
                            </div>
                            
                            <div className="price">
                                <span><sup>{showCurrencyWoPrefix()}</sup>{parseFloat(tier.threshold)}</span>
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

      const showScan = () => {
        if(campaign.network == chain){
            return <a href={`https://goerli.etherscan.io/tx/${Tx}`} target="_blank">{Tx}</a>
        } else if(campaign.network == bnb_chain){
            return <a href={`https://testnet.bscscan.com/tx/${Tx}`} target="_blank">{Tx}</a>
        }
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
                <DialogContentText id="alert-dialog-description">{showScan()}</DialogContentText>
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
                    <i>Make sure to fill your profile if you are waiting for a counterpart. The creator will contact you by email if needed.</i>
                </div>
                <DialogContentText id="alert-dialog-description" style={{marginTop: 15}}>
                Transaction confirmed : </DialogContentText>
                <DialogContentText id="alert-dialog-description">{showScan()}</DialogContentText>
                </DialogContent></div>
            case 2:
                return <div style={{justifyContent:'center'}}>
                <DialogTitle id="alert-dialog-title">Waiting for approval...</DialogTitle>
                <div style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                    <i>You only need to do this once in order to use this token on our platform.<br></br>
                        <Link href={{
                            pathname: "/how-it-works"
                            }}
                            >
                        <a style={{marginTop: 15}}>More information about BEP20 allowance here</a>
                        </Link>.</i>
                </div>

                <DialogContent>

                    <CircularProgress style={{marginTop: 20, marginBottom: 20}}/>

                <DialogContentText id="alert-dialog-description">
                Transaction Hash : </DialogContentText>
                <DialogContentText id="alert-dialog-description">{showScan()}</DialogContentText>
                </DialogContent></div>
            case 3:
                return <div style={{justifyContent:'center'}}>
                <DialogTitle id="alert-dialog-title">Approval confirmed</DialogTitle>

                <DialogContent>

                    <CircularProgress style={{marginTop: 20, marginBottom: 20}}/>
                    <DialogContentText id="alert-dialog-description">
                    Please confirm the transaction on Metamask to finalize your donation.</DialogContentText>
                </DialogContent></div>
            default:
                return <div style={{justifyContent:'center'}}>
                <DialogTitle id="alert-dialog-title">Waiting for confirmation...</DialogTitle>
                <DialogContent>
                
                <CircularProgress style={{marginTop: 20, marginBottom: 20}}/>
                </DialogContent></div>

        }
    }

    const showNetwork = () => {
        if(campaign.network == chain){
            return <>
                <img style={{height: 15, marginRight: 3, marginTop: -1}} src={'/images/cryptoicons/smallethgray.svg'}/>Ethereum 
            </>
        } else if(campaign.network == bnb_chain){
            return <>
                <img style={{height: 15, marginRight: 3, marginTop: -1}} src={'/images/cryptoicons/smallbnbgray.svg'}/>BNB Smart Chain 
            </>
        }
    }

    const showPlans = () => {
        if(chainID == campaign.network){
            return <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6">
                <div className="pricing-table">
                    <div className="pricing-header">
                        <h3>Free donation</h3>
                    </div>
                    
                    <div className="price">
                        <span><sup>{showCurrencyWoPrefix()}</sup> 
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
        }
    }

    const showChoose = () => {
        if(chainID == campaign.network){
            return <h3 style={{marginTop: 10}}>Choose the plan you want and the amount you wish to donate !</h3>                    
        } else {
            return <div style={{marginTop: 30}}>
            <h3><IconFeather.AlertTriangle /> You are not connected to the right network !</h3>
            <p>Please switch to <strong>{showNetwork()}</strong> network to donate to this campaign.</p>
        </div>
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
                    <p style={{marginTop: 5}}>{campaign.small_description}</p>
                    <div className="bar"></div>
                    {/* <p>Network : {showNetwork()}</p> */}
                    {showChoose()}
                </div>

                {showPlans()}
                
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"You are not connected to the right network"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Please connect to Metamask. If you are already connected, be sure to select the right network.
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
                                id: prefixedAddress(campaign.network, campaign.contract_address),
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
