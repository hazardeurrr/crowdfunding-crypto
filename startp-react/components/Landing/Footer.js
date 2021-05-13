import React from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';
import {db} from '../../firebase-crowdfund/index'
import { FaTelegramPlane, FaMediumM } from 'react-icons/fa';
const Footer = () => {

    const currentYear = new Date().getFullYear();

  
    

    return (
        <footer className="footer-area bg-f7fafd">
            <div className="container">
                <div className="row">
                    

                    <div className="col-lg-12 col-md-12">
                        <div className="single-footer-widget">
                           
                        <div className="copyright-area">
                        <div className="logo">
                                        <img src="/images/bb_logo_full.png" alt="logo" />
                            </div>
                           <ul className="social-links">
                                            <li>
                                               <Link href="https://twitter.com/blockboosted">
                                                   <a className="twitter" target="_blank"><Icon.Twitter /></a>
                                               </Link>
                                           </li>
                                           <li>
                                               <Link href="https://twitter.com/blockboosted">
                                                   <a className="linkedin" target="_blank"><FaTelegramPlane /></a>
                                               </Link>
                                           </li>
                                           <li>
                                               <Link href="https://medium.com/@blockboosted">
                                                   <a className="instagram" target="_blank"><FaMediumM /></a>
                                               </Link>
                                           </li>
                           </ul>
                            
                            <p style={{marginTop: 15}}>Copyright &copy; {currentYear} BlockBoosted. Made with <Icon.Heart /> by the BlockBoosted team</p>
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