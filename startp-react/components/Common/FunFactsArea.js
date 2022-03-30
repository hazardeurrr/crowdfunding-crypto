import React from 'react';
import Link from 'next/link';
import {db} from '../../firebase-crowdfund/index'

import fr from '../../public/locales/fr/translation'
import en from '../../public/locales/en/translation'
import firebase from '../../firebase-crowdfund/index'
import {useRouter} from 'next/router'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const FunFactsArea = () => {

    const [open, setOpen] = React.useState(false);
    const [inBase, setTrue] = React.useState(false);
      
    const handleClose = () => {
        setOpen(false);
    };

    const handleClosed = () => {
        setTrue(false);
    };

    const router = useRouter()
    const  {locale} = router
    const t = locale === 'en' ? en : fr

    const handleSubmit = (event) => {
        event.preventDefault()
        // console.log('in submit function')
        // console.log(event.target[0].value)
        // console.log(event)
        
        const email = event.target[0].value

        db.collection('newsletter').where("email", "==", email).get().then(function(querySnapshot) {
            var res = false

            querySnapshot.forEach(function(doc) {
                // console.log(doc.data())
                if (doc.exists) {
                    res = true
                    setTrue(true);
                    // console.log("document found")
                } else {
                    // console.log("document not found")
                }
            })

            if (res == false) {
                db.collection('newsletter').doc(firebase.database().ref().push().key).set({email: email}).then(x => {
                    setOpen(true);
                    console.log('document written with : ' + email)
                }).catch(err => {
                    console.error(err)
                })
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });

    }

    return (
        <div className="funfacts-area ptb-80" style={{marginTop: -175}}>
            <div className="container">
                {/* <div className="section-title">
                    <h2>We always try to understand users expectation</h2>
                    <div className="bar"></div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div> */}

                <div className="row">
                    <div className="col-lg-3 col-md-3 col-6">
                        <div className="funfact">
                            <h3>0%</h3>
                            <p>{t.platformf}</p>
                            <p style={{fontStyle:'italic', fontSize: 10, marginTop: -15}}>({t.inbbst})</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-3 col-6">
                        <div className="funfact">
                            <h3>0%</h3>
                            <p>{t.payfee}</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-3 col-6">
                        <div className="funfact">
                            <h3>3</h3>
                            <p>{t.currenciesn}</p>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-3 col-6">
                        <div className="funfact">
                            <h3>{t.rewardsevery}</h3>
                            <p>{t.everyweek}</p>
                            {/* <p style={{fontStyle:'italic', fontSize: 10, marginTop: -15}}>(BBST rewards)</p> */}
                        </div>
                    </div>

                    
                </div>
                

                <div className="landing-email">
                    <div style={{flex: 1, marginTop: 23, marginRight: 10}}>
                        <h3 style={{fontSize: 20}}>{t.keep}</h3>
                        <p>{t.getnews}</p>
                    </div>
                        
                    <div className="free-trial-content" style={{flex: 3, marginLeft : 20}}>
                        <div className="single-footer-widget">
                            <form className="newsletter-form" onSubmit={handleSubmit}>
                                <input type="email" className="input-newsletter" placeholder="Enter your email here" />
                                <button type="submit">Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>



                                <Dialog
                                    open={inBase}
                                    onClose={handleClosed}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"Subscription to the newsletter"}</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        You already subscribed to our newsletter !
                                    </DialogContentText>
                                    </DialogContent>
                                </Dialog>

                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"Subscription to the newsletter"}</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        You successfully subscribed to our newsletter. See you soon on blockboosted.com !
                                    </DialogContentText>
                                    </DialogContent>
                                </Dialog>


                
                <div className="map-bg">
                    <img src="/images/map.png" alt="map" />
                </div>
            </div>
        </div>
    )
}

export default FunFactsArea;