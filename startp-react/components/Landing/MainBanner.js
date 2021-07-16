import React from 'react';
import Link from 'next/link';
import {db} from '../../firebase-crowdfund/index'
import * as Icon from 'react-feather';
import { FaTelegramPlane, FaMediumM } from 'react-icons/fa';
import firebase from '../../firebase-crowdfund/index'
import {useRouter} from 'next/router'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import fr from '../../public/locales/fr/translation'
import en from '../../public/locales/en/translation'


const MainBanner = () => {
    
    const [open, setOpen] = React.useState(false);
    const [inBase, setTrue] = React.useState(false);
      
    const handleClose = () => {
        setOpen(false);
    };
    
    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log('in submit function')
        // console.log(event.target[0].value)
        // console.log(event)
        
        const email = event.target[0].value

        db.collection('newsletter').where("email", "==", email).get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                if (doc.exists) {
                    setTrue(true);
                    console.log("document found")
                } else {
                    console.log("document not found")
                }
            })
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

        console.log(inBase)

        if (inBase == false) {
            db.collection('newsletter').doc(firebase.database().ref().push().key).set({email: email}).then(x => {
                setOpen(true);
                console.log('document written with : ' + email)
            }).catch(err => {
                console.error(err)
            })
        } else {
            alert("Adress already added to newsletter !")
        }
    }
    
    const router = useRouter()
    const  {locale} = router
    console.log('locale',locale)
    const t = locale === 'en' ? en : fr

    return (
        <div className="ml-main-section">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-12">
                        <div className="ml-banner-content">
                            <h1>{t.hero}</h1>
                            <p>{t.heroDesc}</p>

                              <div className="free-trial-content">
                                <div className="single-footer-widget">
                                    <ul className="social-links">
                                        
                                        <li>
                                            <Link href="https://twitter.com/blockboosted">
                                                <a className="twitter" target="_blank"><Icon.Twitter /></a>
                                            </Link>
                                        </li>
                                        {/* <li>
                                            <Link href="https://twitter.com/blockboosted">
                                                <a className="linkedin" target="_blank"><FaTelegramPlane /></a>
                                            </Link>
                                        </li> */}
                                        <li>
                                            <Link href="https://medium.com/@blockboosted">
                                                <a className="instagram" target="_blank"><FaMediumM /></a>
                                            </Link>
                                        </li>
                                      
                                    </ul>
                                  </div>
                                <br></br>
                                <p>{t.subscribe}</p>
                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"Subscription to the newsletter"}</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        You successfully subscribed to our newsletter. See you soon on Blockboosted.com !
                                    </DialogContentText>
                                    </DialogContent>
                                </Dialog>
                                  <form className="newsletter-form" onSubmit={handleSubmit}>
                                      <input type="email" className="input-newsletter" placeholder={t.emailAddress} />
                                      <button type="submit">{t.subscribeBtn}</button>
                                  </form>
                                 
                              </div>
                        </div>
                    </div>

                    <div className="col-lg-6 col-md-12">
                        <div className="ml-banner-image">
                        <img 
                                src="/images/ml-banner-image/man.png" 
                                className="animate__animated animate__fadeInDown animate__delay-0.5s" 
                                alt="image" 
                            />
                        
                            <img 
                                src="/images/ml-banner-image/blockchain.png" 
                                className="animate__animated animate__fadeInUp animate__delay-1s" 
                                alt="image" 
                            />
                    
                            <img 
                                src="/images/ml-banner-image/piggy.png" 
                                className="animate__animated animate__fadeInDown animate__delay-1s" 
                                alt="image" 
                            />
                            <img 
                                src="/images/ml-banner-image/graph.png" 
                                className="animate__animated animate__fadeInUp animate__delay-1s" 
                                alt="image" 
                            />
                            <img 
                                src="/images/ml-banner-image/bbtoken.png" 
                                className="animate__animated animate__fadeIn animate__delay-2s" 
                                alt="image" 
                            />
                             <img 
                                src="/images/ml-banner-image/ml-main-pic-2.png" 
                                className="animate__animated animate__fadeIn animate__delay-2s" 
                                alt="image" 
                            />

                        </div>
                    </div>
                </div>
            </div>

            {/* Shape Images */}
            <div className="shape1">
                <img src="/images/shape1.png" alt="shape" />
            </div>
            <div className="shape3">
                <img src="/images/shape3.svg" alt="shape" />
            </div>
            <div className="shape4">
                <img src="/images/shape4.svg" alt="shape" />
            </div>
            <div className="shape6 rotateme">
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

export default MainBanner;