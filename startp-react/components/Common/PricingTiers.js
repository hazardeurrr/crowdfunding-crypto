import React, { useRef } from 'react';
import Link from 'next/link';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import loadWeb3 from "@/components/ITStartup/MetaMaskConnection"

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));




async function selectPlan(amount){
    let c = await loadWeb3();
    if(c){
        //interact with contract
        console.log("plan selected of " + amount)
    }
}

const PricingTiers = (props) => {

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
