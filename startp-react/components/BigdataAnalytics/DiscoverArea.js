import React from 'react';
import Link from 'next/link';

const DiscoverArea = () => {
    return (
        <div className="discover-area ptb-80">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12">
                        <div className="discover-image">
                            <img src="/images/bigdata-analytics/discover-img1.png" alt="image" />
                            <img src="/images/bigdata-analytics/discover-img2.jpg" alt="image" />
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <div className="discover-content">
                            <h2>Engaging New Audiences through Smart Approach</h2>
                            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage.</p>

                            <Link href="#">
                                <a className="btn btn-primary">Discover More</a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="analytics-shape1">
                <img src="/images/bigdata-analytics/analytics-shape1.png" alt="image" />
            </div>
        </div>
    )
}

export default DiscoverArea;  