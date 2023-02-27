import React from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';
import {GiReceiveMoney, GiPayMoney, GiMining, GiTwoCoins} from 'react-icons/gi'
import {HiOutlinePhotograph} from 'react-icons/hi'
import {CgCommunity} from 'react-icons/cg'
import {GrMoney} from 'react-icons/gr'
const MainPageArea = () => {
    return (
        <div className="services-area ptb-80">
                <div className="container">
                    <div className="row h-100 justify-content-center align-items-center">
                        <div className="col-lg-6 col-md-12" style={{marginBottom: 50}}>
                            
                            <img src="/images/content_creator.svg" alt="main-pic"/>
                        </div>
                        <div className="col-lg-6 col-md-12 services-content">
                            <div className="section-title">
                                <h2>Designed for content creators</h2>
                                <div className="bar"></div>
                                <p>Receive crypto donations from your community. Reward them with custom NFTs, exclusive content or other counterparts.</p>
                            </div>
                            <div className="row">
                            <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                                            <line x1="12" y1="18" x2="12.01" y2="18"></line>
                                        </svg> */}
                                        <Icon.Layout />
                                        Customize your page
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <line x1="19" y1="5" x2="5" y2="19"></line>
                                            <circle cx="6.5" cy="6.5" r="2.5"></circle>
                                            <circle cx="17.5" cy="17.5" r="2.5"></circle>
                                        </svg> */}
                                        <Icon.Share2 />
                                        Share it to your community
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        <GiReceiveMoney size={25} />
                                        Receive donations in crypto
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        <GiTwoCoins size={25}/>
                                        Choose between BNB and BUSD
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        <Icon.Hexagon/>
                                        Integrate NFTs as counterparts for donations
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        <CgCommunity size={25}/>
                                        Engage your community with exclusive content
                                    </div>
                                </div>
                                
                                {/* <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <circle cx="9" cy="21" r="1"></circle>
                                            <circle cx="20" cy="21" r="1"></circle>
                                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                        </svg>
                                        E-commerce development
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                                            <polyline points="22 4 12 14.01 9 11.01"></polyline>
                                        </svg>
                                        Print ready design
                                    </div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                    {/* <div className="funfacts-area ptb-80">
            <div className='container'> */}
                <div className='contact-cta-box'>
                    <div style={{display:'flex', alignItems:'center'}}><img src="images/logo_crowd.png" style={{width: 30, height: 30, marginRight: 10, marginBottom: 5}}/><h3>BlockBoosted Crowdfunding</h3></div>
                    <p>Raise crypto for a specific cause or project in a limited period of time on our dedicated crowdfunding platform.</p>
                    <a href="https://blockboosted.com" className="btn btn-primary">Try it</a>
                {/* </div>
            </div> */}
                </div>
                </div>
            </div>

            
    )
}

export default MainPageArea;  