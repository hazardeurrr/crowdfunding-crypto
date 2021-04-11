import React from 'react';
import Link from 'next/link';

const MainBanner = () => {
    return (
        <div className="ml-main-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div className="ml-banner-content">
                            <h1>World’s Leading AI & Machine Learning Company</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>

                            <Link href="/contact">
                                <a className="btn btn-secondary">Get Started</a>
                            </Link>
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