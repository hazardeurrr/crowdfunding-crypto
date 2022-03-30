import React from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';
import { GiTwoCoins } from 'react-icons/gi';
import { RiHandCoinLine, RiFundsFill } from 'react-icons/ri';
import {MdMoneyOff} from 'react-icons/md';
import {FaVoteYea, FaRegHandPointUp} from 'react-icons/fa'
import {useRouter} from 'next/router'
import fr from '../../public/locales/fr/translation'
import en from '../../public/locales/en/translation'
const OurFeatures = () => {
    const router = useRouter()
    const  {locale} = router
    // console.log('locale',locale)
    const t = locale === 'en' ? en : fr
    return (
        <div className="features-area pt-80 pb-50 bg-f7fafd">
            <div className="container">
                <div className="section-title">
                    <h2>{t.title}</h2>
                    <div className="bar"></div>
                    <h5>{t.subtitle}</h5>
                </div>

                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="single-features">
                            <div className="icon">
                                    <GiTwoCoins size={30}/>
                            </div>
                            <h3>
                                    {t.fees}
                            </h3>
                            <p><b style={{fontSize: 17}}>{t.chargedFees}</b><br></br> {t.fees2}<em style={{fontSize: 10, marginTop: -1}}>*</em><br></br>
                            <i style={{fontSize: 13}}></i>{t.fees3}</p>
                            {/* <p style={{fontSize: 10, marginTop: 20}}>*{t.repartition}</p> */}
                            <p style={{fontSize: 10, marginTop: 10}}>*{t.fees4}</p>

                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="single-features">
                            <div className="icon">
                                <MdMoneyOff  size={30}/>
                            </div> 
                            <h3>
                                <Link href="/feature-details">
                                    <a>{t.noPayment}</a>
                                </Link>
                            </h3>
                            <p>{t.noFees}<br></br>
                            <i style={{fontSize: 12}}>{t.charges}</i></p>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="single-features">
                            <div className="icon bg-eb6b3d">
                                <RiHandCoinLine  size={30}/>
                            </div>
                            <h3>
                                    {t.cashback}
                            </h3>
                            <p>{t.boostCampaign}</p>
                        </div>
                    </div>
                

                    <div className="col-lg-6 col-md-6">
                        <div className="single-features">
                            <div className="icon bg-eb6b3d">
                                <FaVoteYea size={30} />
                            </div>
                            <h3>
                                  {t.governance}  
                            </h3>
                            <p>{t.power}</p>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="single-features">
                            <div className="icon bg-c679e3">
                                <RiFundsFill size={45}/>
                            </div>
                            <h3>
                                    {t.raise}{t.raiseCrypto}
                            </h3>
                            <p>{t.raising}</p>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-6">
                        <div className="single-features">
                            <div className="icon bg-c679e3">
                                <FaRegHandPointUp size={30} />
                            </div>
                            <h3>
                                    {t.easy2use}
                            </h3>
                            <p>{t.fast}</p>
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>
    )
}

export default OurFeatures;  