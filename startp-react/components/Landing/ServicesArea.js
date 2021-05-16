import React from 'react';
import * as Icon from 'react-feather';
import { Doughnut } from 'react-chartjs-2';
import { RiExchangeDollarLine, RiGovernmentLine, RiHandCoinLine, RiTeamLine } from 'react-icons/ri';
import {MdFavorite, MdMoneyOff, MdPriorityHigh, MdPublic} from 'react-icons/md';
import {GiReceiveMoney, GiPayMoney, GiMining} from 'react-icons/gi'
import {FiTrendingDown, FiTrendingUp, FiUserCheck} from 'react-icons/fi'
import {ImFire} from 'react-icons/im'
import { FaExchangeAlt } from 'react-icons/fa';


const ServicesArea = () => {

    const chartData = {
        labels: ['Platform Liquidity mining (cashback)', 'IDO', 'Strategic Development', 'Team & Advisors', 'Liquidity Providing'],
        datasets: [
          {
            label: '%',
            data: [35, 30, 17, 12, 6],
            backgroundColor: [
              '#c679e3',
              '#44ce6f',
              '#DDC0E8',
              '#87D7A0',
              '#573563',
              '#1A4F2B',
            ],
            borderColor: [
              '#c679e3',
              '#44ce6f',
              '#DDC0E8',
              '#87D7A0',
              '#573563',
              '#1A4F2B',
            ],
            borderWidth: 1,
          },
        ],
      };

    return (
        <>
            <div className="services-area ptb-80 bg-f7fafd">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-lg-6 col-md-12 services-content">
                            <div className="section-title">
                                <h2>BBST Token</h2>
                                <div className="bar"></div>
                                <p>The BlockBoosted Token (BBST) is at the heart of the BlockBoosted ecosystem. The token is an ERC20 on the Ethereum blockchain.<br></br>We will launch our IDO in Q3 2021 and the token will then be available on Uniswap.
                                    Here are some use cases and property of the token, many more coming with the expansion of the ecosystem.
                                </p>
                            </div>

                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        <RiGovernmentLine size={25}/> Governance right
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        <RiExchangeDollarLine size={25}/> Contribute & Raise in BBST
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        <RiHandCoinLine size={25}/> Cashback for users
                                        <p style={{fontSize : 12, fontStyle: 'italic'}}>Increased depending on your stake of BBST</p>

                                    </div>
                                </div>
                              

                                <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        <ImFire size={25}/> Deflation with burning process
                                        <p style={{fontSize : 12, fontStyle: 'italic'}}>A part of each fee collected will be used to burn BBST.</p>

                                    </div>
                                </div>


                                <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        <FiTrendingDown size={25}/> Reduced fees when raising in BBST
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        <MdFavorite size={25}/> Stakers can choose featured campaigns
                                    </div>
                                </div>

                              
                                <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        <FiUserCheck size={25}/> Eligibility for airdrops (depending on your stake)
                                    </div>
                                </div>

                           

                                {/* <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        <GiPayMoney size={25}/> Tip in BBST
                                        <p style={{fontSize : 12, fontStyle: 'italic'}}>Coming with tip.blockboosted</p>
                                    </div>
                                </div> */}

                                <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        <MdPriorityHigh size={25}/> Priority access to limited projects for stakers
                                        <p style={{fontSize : 12, fontStyle: 'italic'}}>Coming in the future</p>
                                    </div>
                                </div>

                    
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12 services-right-image">
                            <img 
                                src="/images/services-right-image/book-self.png"
                                className="animate__animated animate__fadeInDown animate__delay-0.2s" 
                                alt="book-self"
                            />
                           
                            <img 
                                src="/images/services-right-image/box.png"
                                className="animate__animated animate__fadeInUp animate__delay-0.2s" 
                                data-wow-delay="0.6s" 
                                alt="box"
                            />
                         
                            <img 
                                src="/images/services-right-image/chair.png"
                                className="animate__animated animate__fadeInLeft animate__delay-0.2s" 
                                alt="chair"
                            /> 
                            
                            <img 
                                src="/images/services-right-image/cloud.png"
                                className="animate__animated animate__zoomIn animate__delay-0.2s" 
                                alt="cloud"
                            />
                   
                            <img 
                                src="/images/services-right-image/cup.png"
                                className="animate__animated animate__bounceIn animate__delay-0.2s" 
                                alt="cup"
                            />
               
                            <img 
                                src="/images/services-right-image/flower-top.png"
                                className="animate__animated animate__fadeInDown animate__delay-0.2s" 
                                alt="flower"
                            />
                     
                            <img 
                                src="/images/services-right-image/head-phone.png"
                                className="animate__animated animate__zoomIn animate__delay-0.2s" 
                                alt="head-phone"
                            />
                  
                            <img 
                                src="/images/services-right-image/monitor.png"
                                className="animate__animated animate__fadeInUp animate__delay-0.2s" 
                                alt="monitor"
                            />
                
                            <img 
                                src="/images/services-right-image/mug.png"
                                className="animate__animated animate__rotateIn animate__delay-0.2s" 
                                alt="mug"
                            />
           
                            <img 
                                src="/images/services-right-image/table.png"
                                className="animate__animated animate__fadeInUp animate__delay-0.2s" 
                                alt="table"
                            />
                    
                            <img 
                                src="/images/services-right-image/tissue.png"
                                className="animate__animated animate__zoomIn animate__delay-0.2s" 
                                alt="tissue"
                            />
                   
                            <img 
                                src="/images/services-right-image/water-bottle.png"
                                className="animate__animated animate__fadeInUp animate__delay-0.2s" 
                                alt="water-bottle"
                            />
                
                            <img 
                                src="/images/services-right-image/wifi.png"
                                className="animate__animated animate__fadeInLeft animate__delay-0.2s" 
                                data-wow-delay="0.6s" 
                                alt="wifi"
                            />
                        
                            <img 
                                src="/images/services-right-image/cercle-shape.png"
                                className="bg-image rotateme" 
                                alt="shape"
                            />
                         
                            <img 
                                src="/images/bbst_img.png"
                                className="animate__animated animate__fadeInUp animate__delay-0.2s" 
                                alt="main-pic"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="services-area ptb-80">
                <div className="container">
                    <div className="row h-100 justify-content-center align-items-center">
                        <div className="col-lg-6 col-md-12 services-left-image">
                            {/* <img 
                                src="/images/services-left-image/big-monitor.png"
                                className="animate__animated animate__fadeInDown animate__delay-0.2s" 
                                alt="big-monitor"
                            />
            
                            <img 
                                src="/images/services-left-image/creative.png"
                                className="animate__animated animate__fadeInUp animate__delay-0.2s" 
                                alt="creative"
                            />
    
                            <img 
                                src="/images/services-left-image/developer.png"
                                className="animate__animated animate__fadeInLeft animate__delay-0.2s" 
                                alt="developer"
                            />
                    
                            <img 
                                src="/images/services-left-image/flower-top.png"
                                className="animate__animated animate__fadeInLeft animate__delay-0.2s" 
                                data-wow-delay="0.6s" 
                                alt="flower-top"
                            />
        
                            <img 
                                src="/images/services-left-image/small-monitor.png"
                                className="animate__animated animate__bounceIn animate__delay-0.2s" 
                                alt="small-monitor"
                            />
                        
                            <img 
                                src="/images/services-left-image/small-top.png"
                                className="animate__animated animate__fadeInDown animate__delay-0.2s" 
                                alt="small-top"
                            />
                
                            <img 
                                src="/images/services-left-image/table.png"
                                className="animate__animated animate__zoomIn animate__delay-0.2s" 
                                alt="table"
                            />
            
                            <img 
                                src="/images/services-left-image/target.png"
                                className="animate__animated animate__fadeInUp animate__delay-0.2s" 
                                alt="target"
                            />
                        
                            <img 
                                src="/images/services-left-image/cercle-shape.png"
                                className="bg-image rotateme" 
                                alt="shape"
                            />
           
                            <img 
                                src="/images/services-left-image/service-left-main-pic.png"
                                className="animate__animated animate__fadeInUp animate__delay-0.2s" 
                                alt="main-pic"
                            /> */}
                            <div style={{marginTop: '5%', marginBottom: '5%', marginRight: '5%', marginLeft: '5%'}}>         
                                <Doughnut options={{ responsive: true }} data={chartData} />
                            </div>

                        </div>

                        <div className="col-lg-6 col-md-12 services-content">
                            <div className="section-title">
                                <h2>Tokenomics</h2>
                                <div className="bar"></div>
                            </div>

                            <div className="row">
                                    <div className="box">
                                       Total supply : 20 000 000 BBST
                                    </div>
                                    <div className="box">
                                        <GiMining size={27} /> Platform Liquidity Mining : 7 000 000 BBST
                                        <p style={{fontSize: 12, fontStyle: 'italic'}}>Users participating on the platform will earn BBST as cashback</p>
                                    </div>
                                    <div className="box">
                                        <MdPublic size={27}/> Public Sale (IDO) : 6 000 000 BBST
                                    </div>
                                    <div className="box">
                                        <FiTrendingUp size={27} /> Strategic Development : 3 400 000 BBST
                                        <p style={{fontSize: 12, fontStyle: 'italic'}}>Half locked for 1 year, half locked for 2 years.</p>
                                    </div>
                                    <div className="box">
                                        <RiTeamLine size={27} /> Team & Advisors: 2 400 000 BBST
                                        <p style={{fontSize: 12, fontStyle: 'italic'}}>Locked for 2 years</p>
                                    </div>
                                    <div className="box">
                                        <FaExchangeAlt size={27}/> Liquidity Providing : 1 200 000 BBST
                                    </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ServicesArea;