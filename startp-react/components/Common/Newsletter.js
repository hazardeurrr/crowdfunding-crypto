import React from 'react';

import {db, storage} from '../../firebase-crowdfund/index'
import firebase from '../../firebase-crowdfund/index'

const handleSubmit = (event) => {
    event.preventDefault()
    console.log('in submit function')
    console.log(event.target[0].value)
    console.log(event)
    const email = event.target[0].value
    db.collection('newsletter').doc(firebase.database().ref().push().key).set({email: email}).then(x => {
        console.log('document written with : ' + email)
    }).catch(err => {
        console.error(err)
    })
}

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
                            <h2>Subscribe to our newsletter</h2>

                            <form className="newsletter-form" onSubmit={handleSubmit}>
                                      <input type="email" className="input-newsletter" placeholder="Enter your email here" />
                                      <button type="submit">Subscribe !</button>
                                  </form>
                            <p>Get the latest news on the project and the BBST IDO.</p>
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