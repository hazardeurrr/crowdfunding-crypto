import React from 'react'
import Link from 'next/link'

const CreateDeleteBtn = () => {
    return (
        <div className="iot-why-choose-us pt-80">
            <div className="container">
                <div className="section-title">
                    <h2>Ready to try ?</h2>
                    <div className="bar"></div>
                    <p>Join the web3 crowdfunding revolution now !</p>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6">
                        <div className="single-iot-box">
                            {/* <div className="icon"><img src="/images/icon1.png" alt="image"/></div> */}
                            <h3>Create your fundraising campaign</h3>
                            <p>Raise money in crypto for free !</p>
                            <a href="https://app.blockboosted.com"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLineJoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6">
                        <div className="single-iot-box">
                            {/* <div className="icon"><img src="/images/icon3.png" alt="image"/></div> */}
                                <h3>Donate to meaningful projects</h3>
                                <p>Support causes that make sense.</p>
                                <a href="https://app.blockboosted.com/explore"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLineJoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
                            </div>
                        </div>
                    </div>

                    {/* <div className="col-lg-4 col-md-6">
                        <div className="single-iot-box"><div className="icon">
                            <img src="/images/icon2.png" alt="image"/></div>
                            <h3>Business Protection</h3>
                            <p>Lorem ipsum dolor sit amet elit, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            <a href="/service-details/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg></a>
                        </div>
                    </div> */}
                </div>
            </div>
    )
 
}

export default CreateDeleteBtn;  