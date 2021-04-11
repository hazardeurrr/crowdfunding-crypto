import React from 'react';
import Link from 'next/link';

const DigitalAgencyFunFacts = () => {
    return (
        <div className="funfacts-area ptb-80">
            <div className="container">
                <div className="section-title">
                    <h2>We Completed 1500+ Projects Yearly Successfully & Counting</h2>
                    <div className="bar"></div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>

                <div className="row">
                    <div className="col-lg-3 col-md-3 col-6">
                        <div className="funfact">
                            <h3>180K</h3>
                            <p>Downloaded</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-3 col-6">
                        <div className="funfact">
                            <h3>20K</h3>
                            <p>Feedback</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-3 col-6">
                        <div className="funfact">
                            <h3>500+</h3>
                            <p>Workers</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-3 col-6">
                        <div className="funfact">
                            <h3>70+</h3>
                            <p>Contributors</p>
                        </div>
                    </div>
                </div>

                <div className="contact-cta-box">
                    <h3>Have any question about us?</h3>
                    <p>Don't hesitate to contact us</p>

                    <Link href="/contact">
                        <a className="btn btn-primary">Contact Us</a>
                    </Link>
                </div>

                <div className="map-bg">
                    <img src="/images/map.png" alt="map" />
                </div>
            </div>
        </div>
    )
}

export default DigitalAgencyFunFacts;