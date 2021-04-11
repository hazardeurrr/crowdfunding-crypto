import React from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';

const WhyWeAreBest = () => {
    return (
        <div className="iot-why-choose-us pt-80">
            <div className="container">
                <div className="section-title">
                    <h2>Why We Are Best From Others</h2>
                    <div className="bar"></div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6">
                        <div className="single-iot-box">
                            <div className="icon">
                                <img src='/images/icon1.png' alt="image" />
                            </div>
                            <h3>Digital Technology</h3>
                            <p>Lorem ipsum dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            <Link href="#">
                                <a><Icon.ArrowRight /></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="single-iot-box">
                            <div className="icon">
                                <img src='/images/icon2.png' alt="image" />
                            </div>
                            <h3>Business Protection</h3>
                            <p>Lorem ipsum dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            <Link href="#">
                                <a><Icon.ArrowRight /></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="single-iot-box">
                            <div className="icon">
                                <img src='/images/icon3.png' alt="image" />
                            </div>
                            <h3>Data Analysis</h3>
                            <p>Lorem ipsum dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            <Link href="#">
                                <a><Icon.ArrowRight /></a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WhyWeAreBest;
