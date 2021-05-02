import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import loadWeb3 from "@/components/ITStartup/MetaMaskConnection";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';




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

    const [open, setOpen] = React.useState(false);

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const selectPlan = (amount) => {
        if(connected == true && chainID == '0x1'){
            console.log("plan selected of " + amount)
        } else {
            handleDialogOpen()
        }
    }


    const valueRef = useRef('')

    const handleClick = (amount) => e => {    
        if(amount > 0){
            selectPlan(amount)
        }
    }

    const handleClickFree = e => {    
        let amount = valueRef.current.value
        if(amount > 0){
            selectPlan(amount)
        }
    }

    const campaign = props.project

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
                                
                                    <button onClick={handleClick(tier.threshold)} className="btn btn-primary">Select Plan</button>
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
