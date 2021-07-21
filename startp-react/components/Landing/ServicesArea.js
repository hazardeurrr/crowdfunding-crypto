import React from 'react';
import * as Icon from 'react-feather';
import { Doughnut } from 'react-chartjs-2';
import { RiExchangeDollarLine, RiGitRepositoryPrivateFill, RiGovernmentLine, RiHandCoinLine, RiTeamLine } from 'react-icons/ri';
import {MdFavorite, MdMoneyOff, MdPriorityHigh, MdPublic} from 'react-icons/md';
import {GiReceiveMoney, GiPayMoney, GiMining} from 'react-icons/gi'
import {FiTrendingDown, FiTrendingUp, FiUserCheck} from 'react-icons/fi'
import {ImFire} from 'react-icons/im'
import { FaExchangeAlt } from 'react-icons/fa';
import {GrMoney} from 'react-icons/gr'
import {BiCoinStack} from 'react-icons/bi'
import {useRouter} from 'next/router'

import fr from '../../public/locales/fr/translation'
import en from '../../public/locales/en/translation'
const ServicesArea = () => {
    const router = useRouter()
    const  {locale} = router
    console.log('locale',locale)
    const t = locale === 'en' ? en : fr
    const chartData = {
        labels: [`${t.liquidity}`, `${t.IDO}`, `${t.privateSale}`, `${t.strategic}`, `${t.advisors}`, `${t.provide}`],
        datasets: [
          {
            data: [7000000, 2200000, 4000000, 3000000, 2400000, 1400000],
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
                                <h2>{t.bbstoken}</h2>
                                <div className="bar"></div>
                                <p>{t.descToken}<br></br>{t.partners}
                                </p>
                            </div>

                            <div className="row">

                                {/* <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        <BiCoinStack size={25}/> {t.staking}
                                    </div>
                                </div> */}
                                
                                

                                <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        <RiExchangeDollarLine size={25}/> {t.contribute}
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        <RiGovernmentLine size={25}/> {t.governanceRight}
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        <RiHandCoinLine size={25}/> {t.cashbackUsers}
                                        <p style={{fontSize : 12, fontStyle: 'italic'}}>{t.stake}</p>

                                    </div>
                                </div>
                              

                                <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        <ImFire size={25}/> {t.deflation}
                                        <p style={{fontSize : 12, fontStyle: 'italic'}}>{t.deflationExplained}</p>

                                    </div>
                                </div>


                                <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        <FiTrendingDown size={25}/> {t.reduceFees}
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        <MdFavorite size={25}/> {t.stakers}
                                    </div>
                                </div>

                              
                                <div className="col-lg-6 col-md-6">
                                    <div className="box">
                                        <FiUserCheck size={25}/> {t.eligible}
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
                                        <MdPriorityHigh size={25}/> {t.priority}
                                        <p style={{fontSize : 12, fontStyle: 'italic'}}>{t.future}</p>
                                    </div>
                                </div>

                    
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-12 services-right-image">
                            <img 
                                src="/images/bbst_sa2.png"
                                className="animate__animated animate__fadeInDown animate__delay-0.2s" 
                                alt="bbst-features"
                            />
                           
                         
                        
                            <img 
                                src="/images/services-right-image/cercle-shape-2.png"
                                className="bg-image rotateme" 
                                alt="shape"
                            />
                         
                            <img 
                                src="/images/bbst_sa2.png"
                                className="animate__animated animate__fadeInUp animate__delay-0.2s" 
                                alt="main-pic"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="services-area ptb-80">
                <div className="container">
                    <div className="row h-100 justify-content-center align-items-center">
                        <div className="col-lg-6 col-md-12 services-left-image"> */}
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
                            {/* <div style={{marginTop: '5%', marginBottom: '5%', marginRight: '5%', marginLeft: '5%'}}>         
                                <Doughnut options={{ responsive: true }} data={chartData} />
                            </div>

                        </div>

                        <div className="col-lg-6 col-md-12 services-content">
                            <div className="section-title">
                                <h2>{t.tokenomics}</h2>
                                <div className="bar"></div>
                            </div>

                            <div className="row">
                                    <div className="box">
                                       <BiCoinStack size={27}/> {t.totalSupply}: 20 000 000 BBST
                                    </div>
                                    <div className="box">
                                        <GiMining size={27} /> {t.liquidity}: 7 000 000 BBST
                                        <p style={{fontSize: 12, fontStyle: 'italic'}}>{t.earnBBST}</p>
                                    </div>
                                    <div className="box">
                                        <MdPublic size={27}/> {t.IDO}: 2 200 000 BBST
                                    </div>
                                    <div className="box">
                                        <RiGitRepositoryPrivateFill size={27}/> {t.privateSale}: 4 000 000 BBST
                                        <p style={{fontSize: 12, fontStyle: 'italic'}}>{t.privateLocked}</p>
                                    </div>
                                    <div className="box">
                                        <FiTrendingUp size={27} /> {t.strategic}: 3 000 000 BBST
                                        <p style={{fontSize: 12, fontStyle: 'italic'}}>{t.strategicExplained}</p>
                                    </div>
                                    <div className="box">
                                        <RiTeamLine size={27} /> {t.advisors}: 2 400 000 BBST
                                        <p style={{fontSize: 12, fontStyle: 'italic'}}>{t.lock}</p>
                                    </div>
                                    <div className="box">
                                        <FaExchangeAlt size={27}/> {t.provide}: 1 400 000 BBST
                                    </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    )
}

export default ServicesArea;