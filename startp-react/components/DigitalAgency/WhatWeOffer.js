import React from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';

const WhatWeOffer = () => {
    return (
        <div className="solutions-area ptb-80">
            <div className="container">
                <div className="section-title st-fs-28">
                    <span className="sub-title">What We Offer</span>
                    <h2>Our Featured Solutions</h2>
                    <div className="bar"></div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>

                <div className="row">
                    <div className="col-lg-3 col-sm-6 col-md-6">
                        <div className="solutions-box">
                            <div className="icon">
                                <i className="bx bx-landscape"></i>
                                <img src="/images/agency-image/agency-icon-bg.png" alt="image" />
                            </div>

                            <h3>
                                <Link href="/service-details">
                                    <a>Programmatic Advertising</a>
                                </Link>
                            </h3>
                            <p>Lorem ipsum dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore.</p>

                            <Link href="/service-details">
                                <a className="learn-more-btn">
                                    <Icon.PlusCircle /> Learn More
                                </a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-sm-6 col-md-6">
                        <div className="solutions-box">
                            <div className="icon">
                                <i className="bx bx-bar-chart-alt"></i>
                                <img src="/images/agency-image/agency-icon-bg.png" alt="image" />
                            </div>

                            <h3>
                                <Link href="/service-details">
                                    <a>Strategy & Research</a>
                                </Link>
                            </h3>
                            <p>Lorem ipsum dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore.</p>

                            <Link href="/service-details">
                                <a className="learn-more-btn">
                                    <Icon.PlusCircle /> Learn More
                                </a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-sm-6 col-md-6">
                        <div className="solutions-box">
                            <div className="icon">
                                <i className="bx bx-devices"></i>
                                <img src="/images/agency-image/agency-icon-bg.png" alt="image" />
                            </div>

                            <h3>
                                <Link href="/service-details">
                                    <a>Design & Development</a>
                                </Link>
                            </h3>
                            <p>Lorem ipsum dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore.</p>

                            <Link href="/service-details">
                                <a className="learn-more-btn">
                                    <Icon.PlusCircle /> Learn More
                                </a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-sm-6 col-md-6">
                        <div className="solutions-box">
                            <div className="icon">
                                <i className="bx bx-chalkboard"></i>
                                <img src="/images/agency-image/agency-icon-bg.png" alt="image" />
                            </div>

                            <h3>
                                <Link href="/service-details">
                                    <a>Branding & Marketing</a>
                                </Link>
                            </h3>
                            <p>Lorem ipsum dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore.</p>

                            <Link href="/service-details">
                                <a className="learn-more-btn">
                                    <Icon.PlusCircle /> Learn More
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="shape9 slow mobile-dnone">
                <img 
                    src="/images/agency-image/agency-shape1.png" 
                    className="animate__animated animate__fadeInLeft animate__delay-0.7s" 
                    alt="image" 
                />
            </div>
        </div>
    );
}

export default WhatWeOffer;