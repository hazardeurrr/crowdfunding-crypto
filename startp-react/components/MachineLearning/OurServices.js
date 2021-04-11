import React from 'react';
import Link from 'next/link';

const OurServices = () => {
    return (
        <div className="ml-services-area ptb-80">
            <div className="container">
                <div className="section-title">
                    <span className="sub-title">Our Solutions</span>
                    <h2>Our Services</h2>
                    <div className="bar"></div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-4 col-sm-6">
                        <div className="single-ml-services-box">
                            <div className="image">
                                <img src="/images/services-image/service-image1.png" alt="image" />
                            </div>
                            <h3>
                                <Link href="/service-details">
                                    <a>IT Professionals</a>
                                </Link>
                            </h3>
                            <p>Lorem ipsum dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="single-ml-services-box">
                            <div className="image">
                                <img src="/images/services-image/service-image2.png" alt="image" />
                            </div>
                            <h3>
                                <Link href="/service-details">
                                    <a>Software Engineers</a>
                                </Link>
                            </h3>
                            <p>Lorem ipsum dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="single-ml-services-box">
                            <div className="image">
                                <img src="/images/services-image/service-image3.png" alt="image" />
                            </div>
                            <h3>
                                <Link href="/service-details">
                                    <a>Health & Manufacturing</a>
                                </Link>
                            </h3>
                            <p>Lorem ipsum dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="single-ml-services-box">
                            <div className="image">
                                <img src="/images/services-image/service-image4.png" alt="image" />
                            </div>
                            <h3>
                                <Link href="/service-details">
                                    <a>Security & Surveillance</a>
                                </Link>
                            </h3>
                            <p>Lorem ipsum dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="single-ml-services-box">
                            <div className="image">
                                <img src="/images/services-image/service-image5.png" alt="image" />
                            </div>
                            <h3>
                                <Link href="/service-details">
                                    <a>Automatic Optimization</a>
                                </Link>
                            </h3>
                            <p>Lorem ipsum dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="single-ml-services-box">
                            <div className="image">
                                <img src="/images/services-image/service-image6.png" alt="image" />
                            </div>
                            <h3>
                                <Link href="/service-details">
                                    <a>Data Analysts</a>
                                </Link>
                            </h3>
                            <p>Lorem ipsum dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shape Images */}
            <div className="shape1">
                <img src="/images/shape1.png" alt="shape" />
            </div>
            <div className="shape2 rotateme">
                <img src="/images/shape2.svg" alt="shape" />
            </div>
            <div className="shape3">
                <img src="/images/shape3.svg" alt="shape" />
            </div>
            <div className="shape4">
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

export default OurServices;