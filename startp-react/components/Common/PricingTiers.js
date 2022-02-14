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
import { updateDoc } from 'firebase-crowdfund/queries'



// async function selectPlan(amount){
//     let c = await loadWeb3();
//     if(c){
//         //interact with contract
//         console.log("plan selected of " + amount)
//     }
// }



const PricingTiers = (props) => {

    const connected = useSelector((state) => state.metamask_connected)
    const chainID = useSelector((state) => state.chainID)
    const userAddr = useSelector((state) => state.address)

    const campaign = props.project

    const [open, setOpen] = React.useState(false);

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const selectPlan = (tier) => {
        if(connected == true && chainID == chain){
            tier.subscribers.push(userAddr);
            // console.log("content tier : " + JSON.stringify(tier))
            console.log("plan selected of " + tier.threshold);

            updateDoc(campaign.contract_address, 'campaign', campaign, function() {
                console.log("Campaign updated !")
            })

            // add to Followed projects
        } else {
            handleDialogOpen()
        }
    }

    const valueRef = useRef('')

    const handleClick = (tier) => e => {    
        if(tier.threshold > 0){
            selectPlan(tier)
        }
    }

    const handleClickFree = e => {    
        let amount = valueRef.current.value
        if(amount > 0){
            selectPlan(amount)
        }
    }

    const displayTiers = () => {
        var rows = [];
        for (var i = 0; i < campaign.tiers.length; i++) {
            var tier = campaign.tiers[i];
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
                                
                                    <button onClick={handleClick(tier)} className="btn btn-primary">Select Plan</button>
                            </div>
                        </div>
                    </div>
            );
        }
        return rows;
      }

      

    return (
        <div className="pricing-area pt-80 pb-50 bg-f9f6f6">
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
    );
    
}

export default PricingTiers;
