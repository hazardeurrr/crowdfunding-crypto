import React from 'react';

const Newsletter = () => {
    return (
        <div className="free-trial-area">
            <div className="container-fluid">
                <div className="row align-items-center">
                    <div className="col-lg-6 col-md-12">
                        <div className="free-trial-image">
                            <img src="/images/free-trial-img.png" alt="image" />
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <div className="free-trial-content">
                            <h2>Start your free trial</h2>

                            <form className="newsletter-form">
                                <input type="email" className="input-newsletter" placeholder="Enter your business email here" />
                                <button type="submit">Sign Up Free</button>
                            </form>

                            <p>Test out the Machine Learning features for 14 days, no credit card required.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Shape Images */}
            <div className="shape2 rotateme">
                <img src="/images/shape2.svg" alt="shape" />
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

export default Newsletter;