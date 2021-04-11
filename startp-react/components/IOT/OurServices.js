import React from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';

const OurServices = () => {
    return (
        <div className="iot-services-area pt-80 pb-50">
            <div className="container justify-content-center">
                <div className="section-title">
                    <h2>Our Featured Services that We Provide</h2>
                    <div className="bar"></div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                
                <div className="row">
                    <div className="col-lg-4 col-md-6">
                        <div className="single-repair-services bg1">
                            <div className="icon">
                                <i className="flaticon-software"></i>
                            </div>

                            <h3>Software Development <br /> IoT Solutions</h3>
                            <p>Lorem ipsum eiusmod dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            
                            <Link href="/service-details">
                                <a><Icon.ArrowRight /></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="single-repair-services bg2">
                            <div className="icon">
                                <i className="flaticon-gear"></i>
                            </div>

                            <h3>Smart Home, Office <br /> IoT Solutions</h3>
                            <p>Lorem ipsum eiusmod dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            
                            <Link href="/service-details">
                                <a><Icon.ArrowRight /></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="single-repair-services bg3">
                            <div className="icon">
                                <i className="flaticon-skyline"></i>
                            </div>

                            <h3>Smart City <br />IoT Solutions</h3>
                            <p>Lorem ipsum eiusmod dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            
                            <Link href="/service-details">
                                <a><Icon.ArrowRight /></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="single-repair-services bg4">
                            <div className="icon">
                                <i className="flaticon-car-insurance"></i>
                            </div>

                            <h3>Automative <br /> IoT Solutions</h3>
                            <p>Lorem ipsum eiusmod dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            
                            <Link href="/service-details">
                                <a><Icon.ArrowRight /></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="single-repair-services bg5">
                            <div className="icon">
                                <i className="flaticon-factory"></i>
                            </div>

                            <h3>Industrial <br /> IoT Solutions</h3>
                            <p>Lorem ipsum eiusmod dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            
                            <Link href="/service-details">
                                <a><Icon.ArrowRight /></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="single-repair-services bg6">
                            <div className="icon">
                                <i className="flaticon-chip"></i>
                            </div>

                            <h3>System on Chip <br /> IoT Solutions</h3>
                            <p>Lorem ipsum eiusmod dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            
                            <Link href="/service-details">
                                <a><Icon.ArrowRight /></a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OurServices;
