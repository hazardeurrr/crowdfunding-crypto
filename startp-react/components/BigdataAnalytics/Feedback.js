import React from 'react'; 

const Feedback = () => {
    return (
        <div className="bigdata-feedback-area pt-80 pb-50">
            <div className="container">
                <div className="section-title">
                    <h2>What Users Saying</h2>
                    <div className="bar"></div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
                
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-sm-6 col-md-6">
                        <div className="single-feedback-box">
                            <div className="feedback-desc">
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accus antium doloremque laudantium, totam rem aperiam, eaque ipsaquaeab illo.</p>
                            </div>

                            <div className="client-info">
                                <img src="/images/author1.jpg" alt="image" />
                                <h3>David Luis</h3>
                                <span>Founder & CEO</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6 col-md-6">
                        <div className="single-feedback-box">
                            <div className="feedback-desc">
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accus antium doloremque laudantium, totam rem aperiam, eaque ipsaquaeab illo.</p>
                            </div>

                            <div className="client-info">
                                <img src="/images/author2.jpg" alt="image" />
                                <h3>Steven Smith</h3>
                                <span>Developer</span>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4 col-sm-6 col-md-6">
                        <div className="single-feedback-box">
                            <div className="feedback-desc">
                                <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accus antium doloremque laudantium, totam rem aperiam, eaque ipsaquaeab illo.</p>
                            </div>

                            <div className="client-info"> 
                                <img src="/images/author3.jpg" alt="image" />
                                <h3>Sarah Lucy</h3>
                                <span>Designer</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Feedback;  