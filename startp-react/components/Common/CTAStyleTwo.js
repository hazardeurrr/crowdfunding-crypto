import React from 'react';
import Link from 'next/link';

const CTAStyleTwo = () => {
    return (
        <div className="agency-cta-area ptb-80">
            <div className="container">
                <div className="agency-cta-content">
                    <h2>Do you have any projects?</h2>

                    <Link href="/contact">
                        <a className="btn btn-gradient">Contact Us</a>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CTAStyleTwo;