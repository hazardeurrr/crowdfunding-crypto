import React from 'react';
import Link from 'next/link';

const Cta = () => {
    return (
        <div className="iot-cta-area bg-0f054b">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="cta-iot-img">
                            <img 
                                src='/images/cta-shape2.png'
                                className="animate__animated animate__fadeInUp animate__delay-0.6s" 
                                alt="image" 
                            />
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="cta-iot-content">
                            <h3>Connect and Manage your IoT at Scale</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>

                            <Link href="/contact">
                                <a className="btn btn-primary">Get Started!</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="circle-box">
                <img src='/images/circle.png' alt="image" />
            </div>
            <div className="cta-shape">
                <img src='/images/cta-shape.png' alt="image" />
            </div>
        </div>
    );
}

export default Cta;
