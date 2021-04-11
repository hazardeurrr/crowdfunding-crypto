import React from 'react';
import Link from 'next/link';

const MainBanner = () => {
    return (
        <div className="hosting-main-banner">
            <div className="d-table">
                <div className="d-table-cell">
                    <div className="container">
                        <div className="row align-items-center">
                            <div className="col-lg-6 col-md-12">
                                <div className="hosting-banner-content">
                                    <h1>The Best Web Hosting</h1>
                                    <ul>
                                        <li>FREE Domain Name for 2st Year</li>
                                        <li>FREE SSL Certificate Included</li>
                                        <li>1-Click Wordpress Install</li>
                                        <li>24/7 Support</li>
                                    </ul>

                                    <p>Starting at <span>$8.99</span> $3.95/month</p>

                                    <Link href="/contact">
                                        <a className="btn btn-primary">Get Started</a>
                                    </Link>
                                </div>
                            </div>
                            
                            <div className="col-lg-6 col-md-12">
                                <div className="hosting-banner-image">
                                    <img 
                                        src="/images/hosting-banner-image/hosting-shape1.png" 
                                        className="animate__animated animate__fadeInDown animate__delay-0.7s"
                                        alt="image" 
                                    /> 

                                    <img 
                                        src="/images/hosting-banner-image/hosting-shape2.png" 
                                        className="animate__animated animate__fadeInDown animate__delay-0.7s" 
                                        alt="image"
                                    />
                            
                                    <img 
                                        src="/images/hosting-banner-image/hosting-shape3.png" 
                                        className="animate__animated animate__fadeInDown animate__delay-0.7s" 
                                        alt="image"
                                    />
                            
                                    <img 
                                        src="/images/hosting-banner-image/hosting-shape4.png" 
                                        className="animate__animated animate__fadeInDown animate__delay-0.7s" 
                                        alt="image"
                                    />
                            
                                    <img 
                                        src="/images/hosting-banner-image/hosting-shape5.png" 
                                        className="animate__animated animate__fadeInDown animate__delay-0.7s" 
                                        alt="image"
                                    />
                        
                                    <img 
                                        src="/images/hosting-banner-image/hosting-shape6.png" 
                                        className="animate__animated animate__fadeInDown animate__delay-0.7s" 
                                        alt="image"
                                    />
                            
                                    <img 
                                        src="/images/hosting-banner-image/hosting-shape7.png" 
                                        className="animate__animated animate__fadeInDown animate__delay-0.7s" 
                                        alt="image"
                                    />
                            
                                    <img 
                                        src="/images/hosting-banner-image/hosting-shape8.png" 
                                        className="animate__animated animate__fadeInDown animate__delay-0.7s" 
                                        alt="image"
                                    />
                        
                                    <img 
                                        src="/images/hosting-banner-image/hosting-shape9.png" 
                                        className="animate__animated animate__fadeInDown animate__delay-0.7s" 
                                        alt="image"
                                    />
                        
                                    <img 
                                        src="/images/hosting-banner-image/hosting-static-main.png" 
                                        className="animate__animated animate__fadeInUp animate__delay-0.7s" 
                                        alt="image"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            {/* Shape Images */}
            <div className="shape1"><img src="/images/shape1.png" alt="shape" /></div>
            <div className="shape2 rotateme"><img src="/images/shape2.svg" alt="shape" /></div>
            <div className="shape3"><img src="/images/shape3.svg" alt="shape" /></div>
            <div className="shape4"><img src="/images/shape4.svg" alt="shape" /></div>
            <div className="shape5"><img src="/images/shape5.png" alt="shape" /></div>
            <div className="shape6 rotateme"><img src="/images/shape4.svg" alt="shape" /></div>
            <div className="shape7"><img src="/images/shape4.svg" alt="shape" /></div>
            <div className="shape8 rotateme"><img src="/images/shape2.svg" alt="shape" /></div>
        </div>
    );
}

export default MainBanner;
