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
                            <h2>Making use of the blockchain to connect creators and contributors</h2>
                            <p>Creators can easily create a campaign to raise funds in ETH or USDT. Contributors can then see it and finance the project in one click, thanks to the power of the Ethereum blockchain.</p>

                            <Link href="/how-it-works">
                                <a className="btn btn-primary">Learn more about how it works</a>
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