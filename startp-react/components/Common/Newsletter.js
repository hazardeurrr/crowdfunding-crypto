import React from 'react';

import {db, storage} from '../../firebase-crowdfund/index'
import firebase from '../../firebase-crowdfund/index'
import {useRouter} from 'next/router'
import fr from '../../public/locales/fr/translation'
import en from '../../public/locales/en/translation'
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
    const router = useRouter()
    const  {locale} = router
    console.log('locale',locale)
    const t = locale === 'en' ? en : fr
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
                            <h2>{t.newsletter}</h2>

                            <form className="newsletter-form" onSubmit={handleSubmit}>
                                      <input type="email" className="input-newsletter" placeholder={t.emailAddress} />
                                      <button type="submit">{t.subscribeBtn}</button>
                                  </form>
                            <p>{t.news}</p>
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