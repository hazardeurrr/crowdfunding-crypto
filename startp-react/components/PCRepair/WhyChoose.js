import React from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';

const WhyChoose = () => {
    return (
        <div className="repair-why-choose-us ptb-80 pb-0">
            <div className="container">
                <div className="section-title">
                    <h2>Why We Are Best From Others</h2>
                    <div className="bar"></div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6">
                        <div className="single-repair-box">
                            <div className="icon">
                                <i className="flaticon-handshake"></i>
                            </div>
                            <h3>Quick Repair Process</h3>
                            <p>Lorem ipsum dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>

                            <Link href="#">
                                <a>
                                    <Icon.ArrowRight />
                                </a>
                            </Link>

                            <div className="back-icon">
                                <i className="flaticon-handshake"></i>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="single-repair-box">
                            <div className="icon">
                                <i className="flaticon-repair"></i>
                            </div>
                            <h3>Free Diagnostics</h3>
                            <p>Lorem ipsum dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>

                            <Link href="#">
                                <a>
                                    <Icon.ArrowRight />
                                </a>
                            </Link>

                            <div className="back-icon">
                                <i className="flaticon-repair"></i>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="single-repair-box">
                            <div className="icon">
                                <i className="flaticon-delivery-truck"></i>
                            </div>
                            <h3>Fast Delivery</h3>
                            <p>Lorem ipsum dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            
                            <Link href="#">
                                <a>
                                    <Icon.ArrowRight />
                                </a>
                            </Link>

                            <div className="back-icon">
                                <i className="flaticon-delivery-truck"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhyChoose;
