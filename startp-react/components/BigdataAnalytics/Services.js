import React from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';

const Services = () => {
    return (
        <div className="bigdata-services-area ptb-80 bg-eef6fd">
            <div className="container">
                <div className="section-title">
                    <h2>Services We Can Help You With</h2>
					<div className="bar"></div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="single-services-box-item">
                            <div className="icon">
                                <img src="/images/bigdata-analytics/icon1.png" alt="image" />
                            </div>
                            <h3>
                                <Link href="/service-details">
                                    <a>Big Data Analysis</a>
                                </Link>
                            </h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ut labore et dolore magna aliqua.</p>
                            
                            <Link href="/service-details">
                                <a className="learn-more-btn">
                                    <Icon.ArrowRight /> Learn More
                                </a>
                            </Link>

                            <div className="shape">
                                <img src="/images/bigdata-analytics/rectangle.png" alt="image" />
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="single-services-box-item">
                            <div className="icon">
                                <img src="/images/bigdata-analytics/icon2.png" alt="image" />
                            </div>
                            <h3>
                                <Link href="/service-details">
                                    <a>Robust Analytics</a>
                                </Link>
                            </h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ut labore et dolore magna aliqua.</p>
                            
                            <Link href="/service-details">
                                <a className="learn-more-btn">
                                    <Icon.ArrowRight /> Learn More
                                </a>
                            </Link>

                            <div className="shape">
                                <img src="/images/bigdata-analytics/rectangle.png" alt="image" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="single-services-box-item">
                            <div className="icon">
                                <img src="/images/bigdata-analytics/icon3.png" alt="image" />
                            </div>
                            <h3>
                                <Link href="/service-details">
                                    <a>Marketing Analytics</a>
                                </Link>
                            </h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ut labore et dolore magna aliqua.</p>
                            
                            <Link href="/service-details">
                                <a className="learn-more-btn">
                                    <Icon.ArrowRight /> Learn More
                                </a>
                            </Link>

                            <div className="shape">
                                <img src="/images/bigdata-analytics/rectangle.png" alt="image" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="single-services-box-item">
                            <div className="icon">
                                <img src="/images/bigdata-analytics/icon4.png" alt="image" />
                            </div>
                            <h3>
                                <Link href="/service-details">
                                    <a>Data Visualization</a>
                                </Link>
                            </h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ut labore et dolore magna aliqua.</p>
                            
                            <Link href="/service-details">
                                <a className="learn-more-btn">
                                    <Icon.ArrowRight /> Learn More
                                </a>
                            </Link>

                            <div className="shape">
                                <img src="/images/bigdata-analytics/rectangle.png" alt="image" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="single-services-box-item">
                            <div className="icon">
                                <img src="/images/bigdata-analytics/icon5.png" alt="image" />
                            </div>
                            <h3>
                                <Link href="/service-details">
                                    <a>Securities Research</a>
                                </Link>
                            </h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ut labore et dolore magna aliqua.</p>
                            
                            <Link href="/service-details">
                                <a className="learn-more-btn">
                                    <Icon.ArrowRight /> Learn More
                                </a>
                            </Link>

                            <div className="shape">
                                <img src="/images/bigdata-analytics/rectangle.png" alt="image" />
                            </div>
                        </div>
                    </div>
                    
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="single-services-box-item">
                            <div className="icon">
                                <img src="/images/bigdata-analytics/icon6.png" alt="image" />
                            </div>
                            <h3>
                                <Link href="/service-details">
                                    <a>Data Governance</a>
                                </Link>
                            </h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod ut labore et dolore magna aliqua.</p>
                            
                            <Link href="/service-details">
                                <a className="learn-more-btn">
                                    <Icon.ArrowRight /> Learn More
                                </a>
                            </Link>

                            <div className="shape">
                                <img src="/images/bigdata-analytics/rectangle.png" alt="image" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Services;  