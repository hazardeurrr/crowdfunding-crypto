import React from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';
import { GiTwoCoins } from 'react-icons/gi';
import { RiHandCoinLine, RiFundsFill } from 'react-icons/ri';
import {MdMoneyOff} from 'react-icons/md';
import {FaVoteYea, FaRegHandPointUp} from 'react-icons/fa'

const OurFeatures = () => {
    return (
        <div className="features-area pt-80 pb-50 bg-f7fafd">
            <div className="container">
                <div className="section-title">
                    <h2>Fair crowdfunding</h2>
                    <div className="bar"></div>
                    <p>With BlockBoosted, we want to make crowdfunding fairer for raisers and contributors.</p>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="single-features">
                            <div className="icon">
                                    <GiTwoCoins size={30}/>
                            </div>
                            <h3>
                                <Link href="/feature-details">
                                    <a>Less platform fees</a>
                                </Link>
                            </h3>
                            <p><b>We charge 0% fee.</b><em style={{fontSize: 10}}>*.</em><br></br>
                            <i style={{fontSize: 13}}>Crowdfunding platforms usually charge a 5% platform fee.</i></p>
                            <p style={{fontSize: 10, marginTop: 20}}>*0% for campaigns in BBST, 1.5% for successfuls campaigns in ETH and USDT</p>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="single-features">
                            <div className="icon">
                                <MdMoneyOff  size={30}/>
                            </div> 
                            <h3>
                                <Link href="/feature-details">
                                    <a>No payment or processing fee</a>
                                </Link>
                            </h3>
                            <p>No intermediate, no fee ! You only need to pay the gas fee of the Ethereum blockchain.<br></br>
                            <i style={{fontSize: 12}}>Crowdfunding platforms usually charge a 3% payment fee for their payment provider on top of the platform fee.</i></p>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="single-features">
                            <div className="icon bg-eb6b3d">
                                <RiHandCoinLine  size={30}/>
                            </div>
                            <h3>
                                <Link href="/feature-details">
                                    <a>Cashback for contributors</a>
                                </Link>
                            </h3>
                            <p>Contributors that boost projects on BlockBoosted are given BBST tokens, depending on their stake and contribution !</p>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="single-features">
                            <div className="icon bg-eb6b3d">
                                <FaVoteYea size={30} />
                            </div>
                            <h3>
                                <Link href="/feature-details">
                                    <a>Governance for stakers</a>
                                </Link>
                            </h3>
                            <p>Power to the users ! BBST stakers can vote for majors changes on the platform as well as featured campaigns.</p>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="single-features">
                            <div className="icon bg-c679e3">
                                <RiFundsFill size={45}/>
                            </div>
                            <h3>
                                <Link href="/feature-details">
                                    <a>Raise in crypto</a>
                                </Link>
                            </h3>
                            <p>Choose to raise money in ETH, USDT or BBST.</p>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="single-features">
                            <div className="icon bg-c679e3">
                                <FaRegHandPointUp size={30} />
                            </div>
                            <h3>
                                <Link href="/feature-details">
                                    <a>Easy to use</a>
                                </Link>
                            </h3>
                            <p>Create a campaign in less than 2 minutes and start raising funds ! Share your campaign to your social media in 1 click !</p>
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    )
}

export default OurFeatures;  