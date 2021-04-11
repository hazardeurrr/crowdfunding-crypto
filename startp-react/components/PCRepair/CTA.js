import React from 'react';
import Link from 'next/link';

const CTA = () => {
    return (
        <div className="repair-cta-area bg-0f054b">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="cta-repair-content">
                            <h3>We'll help you get back to work</h3>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.</p>

                            <Link href="/contact">
                                <a className="btn btn-primary">Contact Us</a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="cta-repair-img">
                            <img src='/images/man-and-women.png' alt="image" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="circle-box">
                <img src='/images/circle.png' alt="image" />
            </div>
            <div className="cta-shape">
                <img src='/images/cta-shape.png' alt="image" />
            </div>
        </div>
    );
}

export default CTA;
