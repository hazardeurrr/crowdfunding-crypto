import React from 'react';
import Link from 'next/link';

const DiscoverAreaCrea = () => {
    return (
        <div className="discover-area discover-area-crea ptb-80">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12">
                        <div className="discover-image">
                            {/* <img src="/images/bigdata-analytics/discover-img1.png" alt="image" /> */}
                            <img src="/images/bigdata-analytics/connection_crea.svg" alt="image" />

                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <div className="discover-content">
                            <h2>Making use of the blockchain to connect creators and contributors</h2>
                            <p>Creators can easily create a campaign to raise funds in BNB, BUSD or BBST. Contributors can then see it and finance the project in two clicks, thanks to the power of blockchain.</p>

                            <Link href="/how-it-works">
                                <a className="btn btn2 btn-primary">Learn more about how it works</a>
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

export default DiscoverAreaCrea;  