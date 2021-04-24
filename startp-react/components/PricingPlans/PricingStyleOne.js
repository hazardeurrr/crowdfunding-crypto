import React from 'react';
import Link from 'next/link';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const PricingStyleOne = (props) => {

    const campaign = props.project

    const displayTiers = () => {
        var rows = [];
        for (var i = 0; i < campaign.tiers.length; i++) {
            var tier = campaign.tiers[i]
            rows.push( 
                <div className="col-lg-4 col-md-6">
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
                                <Link href="#">
                                    <a className="btn btn-primary">Select Plan</a>
                                </Link>
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
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                /></span>
                            </div>
                            
                            <div className="pricing-features">
                                <ul>
                                    <li className="active">Thanks for supporting this campaign !</li>
                                </ul>
                            </div>
                            
                            <div className="pricing-footer">
                                <Link href="#">
                                    <a className="btn btn-primary">Select Plan</a>
                                </Link>
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

export default PricingStyleOne;
