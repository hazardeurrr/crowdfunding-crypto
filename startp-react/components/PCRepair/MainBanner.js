import React from 'react';
import Link from 'next/link';

const MainBanner = () => {
    return (
        <div className="repair-main-banner">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="repair-banner-content">
                            <h1>Your Local Computer Repair Experts!</h1>
                            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.</p>

                            <Link href="/contact">
                                <a className="btn btn-primary">Get Started</a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="repair-banner-image">
                            <img 
                                src='/images/repair-banner-image/repair-banner-img.png' 
                                alt="image" 
                            />
 
                            <img 
                                src='/images/repair-banner-image/repair-shape1.png' 
                                className="animate__animated animate__zoomIn animate__delay-0.6s" 
                                alt="image" 
                            /> 
                            
                            <img 
                                src='/images/repair-banner-image/repair-shape2.png' 
                                className="animate__animated animate__fadeInLeft animate__delay-0.6s" 
                                alt="image" 
                            />
                    
                            <img 
                                src='/images/repair-banner-image/repair-shape-circle.png' 
                                className="rotateme" 
                                alt="image" 
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainBanner;
