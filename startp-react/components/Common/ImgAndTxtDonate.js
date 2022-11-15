import React from 'react'
import Link from 'next/link'

const ImgAndTxtDonate = () => {
    return (
        <>
        <div class="iot-features-area ptb-80">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-lg-6 iot-features-image">
                        <img style={{border:"2px solid #44ce6f69", borderRadius:10}} src="/images/explore.png" className="animate__animated animate__fadeInUp animate__delay-0.6s" alt="image"/>
                    </div>
                    <div className="col-lg-6 iot-features-content">
                        <div style={{width: '85%', marginLeft:'auto', marginRight:'auto'}}>
                            <h3>Support meaningful projects</h3>
                            <ul><li><p style={{marginBottom: 10}}>Browse campaigns by categories.</p></li>
                            <li><p style={{marginBottom: 10}}>Donate in BNB or BUSD to causes & projects that make sense to you.</p></li></ul>
                            <a className="btn btn-primary" href="https://app.blockboosted.com/explore">Explore</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
 
}

export default ImgAndTxtDonate;  