import React from 'react';
import Link from 'next/link';
import {db} from '../../firebase-crowdfund/index'
import * as Icon from 'react-feather';
import { FaTelegramPlane, FaMediumM } from 'react-icons/fa';


const handleSubmit = (event) => {
    event.preventDefault()
    console.log('in submit function')
    console.log(event.target[0].value)
    console.log(event)
    const email = event.target[0].value
    db.collection('newsletter').doc(firebase.database().ref().push().key).set({email: email}).then(x => {
        console.log('document written with : ' + email)
    }).catch(err => {
        console.error(err)
    })
}

const MainBanner = () => {
    return (
        <div className="ml-main-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div className="ml-banner-content">
                            <h1>Crowdfunding reinvented with BlockBoosted !</h1>
                            <p>BlockBoosted is an innovative crodfunding ecosystem using the Ethereum Blockchain ! Less fees, more trust, better user experience and cashback for contributors.</p>

                              <div className="free-trial-content">
                                <div className="single-footer-widget">
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
                                  </div>
                                <br></br>
                                <p>Subscribe to our newsletter for free to get the latest news on BlockBoosted and BBST Token Sale.</p>
                                  <form className="newsletter-form" onSubmit={handleSubmit}>
                                      <input type="email" className="input-newsletter" placeholder="Enter your email here" />
                                      <button type="submit">Subscribe !</button>
                                  </form>
                                 
                              </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <div className="ml-banner-image">
                            <img 
                                src="/images/ml-banner-image/one.png" 
                                className="animate__animated animate__fadeIn animate__delay-2s" 
                                alt="image" 
                            />
                        
                            <img 
                                src="/images/ml-banner-image/two.png" 
                                className="animate__animated animate__fadeInUp animate__delay-1s" 
                                alt="image" 
                            />
                    
                            <img 
                                src="/images/ml-banner-image/three.png" 
                                className="animate__animated animate__fadeInUp animate__delay-0.5s" 
                                alt="image" 
                            />
                    
                            <img 
                                src="/images/ml-banner-image/four.png" 
                                className="animate__animated animate__fadeInUp animate__delay-2s" 
                                alt="image" 
                            />
                        
                            <img 
                                src="/images/ml-banner-image/five.png" 
                                className="animate__animated animate__fadeInDown animate__delay-2.5s" 
                                alt="image" 
                            />
                
                            <img 
                                src="/images/ml-banner-image/six.png" 
                                className="animate__animated animate__fadeInDown animate__delay-1.9s" 
                                alt="image" 
                            />
                        
                            <img 
                                src="/images/ml-banner-image/seven.png" 
                                className="animate__animated animate__fadeInDown animate__delay-2.1s" 
                                alt="image" 
                            />
                        
                            <img 
                                src="/images/ml-banner-image/eight.png" 
                                className="animate__animated animate__fadeInDown animate__delay-1.9s" 
                                alt="image" 
                            />
                        
                            <img 
                                src="/images/ml-banner-image/nine.png" 
                                className="animate__animated animate__fadeInDown animate__delay-1.7s" 
                                alt="image" 
                            />
                    
                            <img 
                                src="/images/ml-banner-image/ten.png" 
                                className="animate__animated animate__fadeInDown animate__delay-1.5s" 
                                alt="image" 
                            />
                    
                            <img 
                                src="/images/ml-banner-image/eleven.png" 
                                className="animate__animated animate__fadeInUp animate__delay-0.4s" 
                                alt="image" 
                            />
                    
                            <img 
                                src="/images/ml-banner-image/ml-main-pic.png" 
                                className="animate__animated animate__fadeInUp animate__delay-0.5s" 
                                alt="image" 
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Shape Images */}
            <div className="shape1">
                <img src="/images/shape1.png" alt="shape" />
            </div>
            <div className="shape3">
                <img src="/images/shape3.svg" alt="shape" />
            </div>
            <div className="shape4">
                <img src="/images/shape4.svg" alt="shape" />
            </div>
            <div className="shape6 rotateme">
                <img src="/images/shape4.svg" alt="shape" />
            </div>
            <div className="shape7">
                <img src="/images/shape4.svg" alt="shape" />
            </div>
            <div className="shape8 rotateme">
                <img src="/images/shape2.svg" alt="shape" />
            </div>
        </div>
    );
}

export default MainBanner;