import React from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';
import {db} from '../../firebase-crowdfund/index'
import { FaTelegramPlane, FaMediumM } from 'react-icons/fa';
import {useRouter} from 'next/router'
import fr from '../../public/locales/fr/translation'
import en from '../../public/locales/en/translation'

const Footer = () => {

    const router = useRouter()
    const  {locale} = router
    const currentYear = new Date().getFullYear();
    let t = locale === 'en' ? en : fr

    const handleLanguage = (e) => {
        const locale = e.target.value
        router.push('/landing-page', '/landing-page', {locale})
        let t = locale === 'en' ? en : fr
    }
  
    

    return (
        <footer className="footer-area bg-f7fafd" style={{overflowY: 'hidden'}}>
            <div className="container">
                <div className="row">
                    

                    <div className="col-lg-12 col-md-12">
                        <div className="single-footer-widget">
                           
                        <div className="copyright-area">
                        <div className="logo">
                                        <img src="/images/bb_logo_full_2.png" alt="logo" />
                            </div>
                           <ul className="social-links">
                                            <li>
                                               <Link href="https://twitter.com/blockboosted">
                                                   <a className="twitter" target="_blank"><Icon.Twitter /></a>
                                               </Link>
                                           </li>
                                           {/* <li>
                                               <Link href="https://linkedin.com/blockboosted">
                                                   <a className="linkedin" target="_blank"><FaTelegramPlane /></a>
                                               </Link>
                                           </li> */}
                                           <li>
                                               <Link href="https://medium.com/@blockboosted">
                                                   <a className="instagram" target="_blank"><FaMediumM /></a>
                                               </Link>
                                           </li>
                                           <li>
                                           <div className="form-group">
                                                <select className="form-select" id='languageSelected' onChange={handleLanguage} defaultValue={locale}>
                                                    <option value={'en'}>EN</option>
                                                    <option value={'fr'}>FR</option> 
                                                </select>
                                            </div>
                                           </li>
                                           
                           </ul>
                            
                            <p style={{marginTop: 15}}>Copyright &copy; {currentYear} BlockBoosted. Made with <Icon.Heart /> by the BBST Team</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <img src="/images/map.png" className="map" alt="map" />

            {/* Shape Images */}
            <div className="shape1">
                <img src="/images/shape1.png" alt="shape" />
            </div>
            <div className="shape8 rotateme">
                <img src="/images/shape2.svg" alt="shape" />
            </div>
        </footer>
    )
     
}

export default Footer; 