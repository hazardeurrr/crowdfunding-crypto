import React from 'react';
import Link from 'next/link';

const PricingStyleTwo = () => {
    return (
        <div className="pricing-area pt-80 pb-50 bg-f7fafd">
            <div className="container">
                <div className="section-title">
                    <h2>Pricing Plans</h2>
                    <div className="bar"></div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6">
                        <div className="single-pricing-table">
                            <div className="pricing-header">
                                <i className="flaticon-data"></i>
                                <h3>Web Hosting</h3>
                            </div>
                            
                            <div className="price">
                                <span><sup>$</sup>10.99<span>/m</span></span>
                            </div>
                            
                            <div className="pricing-features">
                                <ul>
                                    <li><i data-feather="check"></i> 99.9% Uptime Guarantee</li>
                                    <li><i data-feather="check"></i> Reliable & Secure</li>
                                    <li><i data-feather="check"></i> Powered by cPanel / Plesk</li>
                                    <li><i data-feather="check"></i> Web Asset Delivery</li>
                                    <li><i data-feather="check"></i> 24/7 Dedicated Support</li>
                                </ul>
                            </div>
                            
                            <div className="pricing-footer">
                                <Link href="#">
                                    <a className="btn btn-primary">Select Plan</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4 col-md-6">
                        <div className="single-pricing-table active-plan">
                            <div className="pricing-header">
                                <i className="flaticon-cloud"></i>
                                <h3>Cloud Hosting</h3>
                            </div>
                            
                            <div className="price">
                                <span><sup>$</sup>13.99<span>/m</span></span>
                            </div>
                            
                            <div className="pricing-features">
                                <ul>
                                    <li><i data-feather="check"></i> 99.9% Uptime Guarantee</li>
                                    <li><i data-feather="check"></i> Reliable & Secure</li>
                                    <li><i data-feather="check"></i> Powered by cPanel / Plesk</li>
                                    <li><i data-feather="check"></i> Web Asset Delivery</li>
                                    <li><i data-feather="check"></i> 24/7 Dedicated Support</li>
                                </ul>
                            </div>
                            
                            <div className="pricing-footer">
                                <Link href="#">
                                    <a className="btn btn-primary">Select Plan</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4 col-md-6">
                        <div className="single-pricing-table">
                            <div className="pricing-header">
                                <i className="flaticon-vps"></i>
                                <h3>Vps Hosting</h3>
                            </div>
                            
                            <div className="price">
                                <span><sup>$</sup>15.99<span>/m</span></span>
                            </div>
                            
                            <div className="pricing-features">
                                <ul>
                                    <li><i data-feather="check"></i> 99.9% Uptime Guarantee</li>
                                    <li><i data-feather="check"></i> Reliable & Secure</li>
                                    <li><i data-feather="check"></i> Powered by cPanel / Plesk</li>
                                    <li><i data-feather="check"></i> Web Asset Delivery</li>
                                    <li><i data-feather="check"></i> 24/7 Dedicated Support</li>
                                </ul>
                            </div>
                            
                            <div className="pricing-footer">
                                <Link href="#">
                                    <a className="btn btn-primary">Select Plan</a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shape Images */}
            <div className="shape8 rotateme">
                <img src="/images/shape2.svg" alt="shape" />
            </div>
            <div className="shape2 rotateme">
                <img src="/images/shape2.svg" alt="shape" />
            </div>
            <div className="shape7">
                <img src="/images/shape4.svg" alt="shape" />
            </div>
            <div className="shape4">
                <img src="/images/shape4.svg" alt="shape" />
            </div>
        </div>
    );
}

export default PricingStyleTwo;
