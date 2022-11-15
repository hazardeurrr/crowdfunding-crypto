import React from 'react'
import Link from 'next/link'

const ImgAndTxt = () => {
    return (
        <><div className="iot-features-area ptb-80 bg-f7fafd">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6 iot-features-content">
                        <div style={{width: '85%', marginLeft:'auto', marginRight:'auto'}}><h3>Raise crypto on BlockBoosted</h3>
                        <ul><li><p style={{marginBottom: 10}}>Create your fundraising campaign for free and start raising BNB or BUSD.</p></li>
                        {/* <li><p style={{marginBottom: 10}}>Charity, startup or individual... For a cause or a project of any kind. Everyone can create a campaign on BlockBoosted !</p></li> */}
                        <li><p style={{marginBottom: 10}}>Customize your campaign and add reward tiers to increase engagement.</p></li>
                        <li><p style={{marginBottom: 10}}>Keep it all ! We won't take any fee on what you raise.</p></li>
                        </ul>
                        {/* <p>Charities, start-up or individual, for a cause or a project of any kind, everyone can create its campaign on BlockBoosted ! </p> */}

                        <a className="btn btn-primary" href="https://app.blockboosted.com/">Create your fundraiser</a></div>
                    </div>
                    <div className="col-lg-6 iot-features-image">
                        <img src="/images/campImg.png" style={{border:"2px solid #44ce6f69", borderRadius:10}} className="animate__animated animate__fadeInUp animate__delay-0.6s" alt="image"/>
                    </div>
                </div>
            </div>
        </div>

        {/* <div class="iot-features-area ptb-80">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 iot-features-image">
                        <img src="/images/iot-features-image/iot-feature-image2.png" className="animate__animated animate__fadeInUp animate__delay-0.6s" alt="image"/>
                    </div>
                    <div className="col-lg-6 iot-features-content">
                        <h3>How Can Your City Use IoT Technology?</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus.</p>
                        <a className="btn btn-primary" href="/iot/#">Explore More</a>
                    </div>
                </div>
            </div>
        </div> */}
        </>
    )
 
}

export default ImgAndTxt;  