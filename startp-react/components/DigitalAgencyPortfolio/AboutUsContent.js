import React from 'react';
import Link from 'next/link';

const AboutUsContent = () => {
    return (
        <div className="agency-portfolio-about-area pt-80 pb-50">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-sm-6">
                        <div className="single-text-box">
                            <img src="/images/agency-portfolio-about-image/ap-about-img1.jpg" alt="image" />
                            <h3>About Us</h3>
                            <p>Vestibulum ac posuere mi. Nullam euismod dui condimentum metus consequat blandit. Donec leo tortor, commodo eget fermentum id, molestie quis est. Ut lectus metus, condimentum eget facilisis sed, fermentum et tortor.</p>

                            <Link href="/about-1">
                                <a className="learn-more-btn">
                                    <i data-feather="plus-circle"></i> Learn More
                                </a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="single-text-box">
                            <img src="/images/agency-portfolio-about-image/ap-about-img2.jpg" alt="image" />
                            <h3>Our Vision</h3>
                            <p>Vestibulum ac posuere mi. Nullam euismod dui condimentum metus consequat blandit. Donec leo tortor, commodo eget fermentum id, molestie quis est. Ut lectus metus, condimentum eget facilisis sed, fermentum et tortor.</p>
                            
                            <Link href="/about-1">
                                <a className="learn-more-btn">
                                    <i data-feather="plus-circle"></i> Learn More
                                </a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6">
                        <div className="single-text-box">
                            <img src="/images/agency-portfolio-about-image/ap-about-img3.jpg" alt="image" />
                            <h3>Our Mission</h3>
                            <p>Vestibulum ac posuere mi. Nullam euismod dui condimentum metus consequat blandit. Donec leo tortor, commodo eget fermentum id, molestie quis est. Ut lectus metus, condimentum eget facilisis sed, fermentum et tortor.</p>
                            
                            <Link href="/about-1">
                                <a className="learn-more-btn">
                                    <i data-feather="plus-circle"></i> Learn More
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AboutUsContent;  