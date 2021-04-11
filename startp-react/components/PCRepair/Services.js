import React from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';

const Services = () => {
    return (
        <div className="repair-services-area ptb-80 bg-f7fafd">
            <div className="container">
                <div className="section-title">
                    <h2>Our Featured Services that We Provide</h2>
                    <div className="bar"></div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6">
                        <div className="single-repair-services bg1">
                            <div className="icon">
                                <i className="flaticon-monitor"></i>
                            </div>

                            <h3>Laptop Repair</h3>
                            <p>Lorem ipsum eiusmod dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            
                            <Link href="/service-details">
                                <a><Icon.ArrowRight /></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="single-repair-services bg2">
                            <div className="icon">
                                <i className="flaticon-idea"></i>
                            </div>

                            <h3>Computer Repair</h3>
                            <p>Lorem ipsum eiusmod dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            
                            <Link href="/service-details">
                                <a><Icon.ArrowRight /></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="single-repair-services bg3">
                            <div className="icon">
                                <i className="flaticon-layout"></i>
                            </div>

                            <h3>Apple Products Repair</h3>
                            <p>Lorem ipsum eiusmod dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            
                            <Link href="/service-details">
                                <a><Icon.ArrowRight /></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="single-repair-services bg4">
                            <div className="icon">
                                <i className="flaticon-update-arrows"></i>
                            </div>

                            <h3>Software Update</h3>
                            <p>Lorem ipsum eiusmod dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            
                            <Link href="/service-details">
                                <a><Icon.ArrowRight /></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="single-repair-services bg5">
                            <div className="icon">
                                <i className="flaticon-smartphone"></i>
                            </div>

                            <h3>Smartphone Repair</h3>
                            <p>Lorem ipsum eiusmod dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            
                            <Link href="/service-details">
                                <a><Icon.ArrowRight /></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="single-repair-services bg6">
                            <div className="icon">
                                <i className="flaticon-hard-disk"></i>
                            </div>

                            <h3>Data Backup & Recovery</h3>
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

export default Services;
