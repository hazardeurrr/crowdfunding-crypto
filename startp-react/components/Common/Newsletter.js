import React from 'react';

import {db, storage} from '../../firebase-crowdfund/index'
import firebase from '../../firebase-crowdfund/index'
import {useRouter} from 'next/router'
import fr from '../../public/locales/fr/translation'
import en from '../../public/locales/en/translation'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const Newsletter = () => {

    const [open, setOpen] = React.useState(false);
    const [inBase, setTrue] = React.useState(false);
        
    const handleClose = () => {
        setOpen(false);
    };
    
    const handleClosed = () => {
        setTrue(false);
    };
    
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
                   // console.log('document written with : ' + email)
                }).catch(err => {
                    console.error(err)
                })
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    
    }

    
    const router = useRouter()
    const  {locale} = router
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
                                        You successfully subscribed to our newsletter. See you soon on Blockboosted.com !
                                    </DialogContentText>
                                    </DialogContent>
                                </Dialog>
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