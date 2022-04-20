import React from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';
import {db} from '../../firebase-crowdfund/index'
import { FaTelegramPlane, FaMediumM } from 'react-icons/fa';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const Footer = () => {

    const currentYear = new Date().getFullYear();

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
        <footer className="footer-area bg-f7fafd">
            <div className="container">
                <div className="row" style={{display: 'flex'}}>
                    <div style={{flex: 2}}>
                        <div className="single-footer-widget" style={{marginRight : '5%'}}>
                           
                                                                             

                                    <div className="logo">
                                <Link href="/">
                                    <a>
                                        <img src="/images/bb_logo_full_2.png" alt="logo" />
                                    </a>
                                </Link>
                            </div>
                            <p>BlockBoosted is an innovative crowdfunding ecosystem using the Ethereum Blockchain ! Less fees, more trust, better user experience and rewards for contributors.</p>
                        


                                <ul className="social-links" style={{marginTop: 15}}>
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
                            You successfully subscribed to our newsletter. See you soon on Blockboosted.com !
                        </DialogContentText>
                        </DialogContent>
                    </Dialog>

                    <div style={{flex: 1}}>
                        <div className="single-footer-widget pl-5">
                            <h3>BlockBoosted</h3>
                            <ul className="list">
                                <li>
                                    <Link href={{
                                        pathname: "/SearchPage/",
                                        query: {
                                            id: "explore",
                                        }
                                    }}>
                                        <a>Explore</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/form-campaign">
                                        <a>Create</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/how-it-works">
                                        <a>How it works</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/token">
                                        <a>BBST Token</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div style={{flex: 1}}>
                        <div className="single-footer-widget">
                            <h3>Community</h3>
                            <ul className="list">
                                <li>
                                    <a href="https://discord.gg/6QdBGMKSUn">Discord</a>
                                </li>
                            </ul>
                        </div>
                        <div className="single-footer-widget" style={{marginTop: 25}}>
                            <h3>About</h3>
                            <ul className="list">
                                {/* <li>
                                    <Link href="/term-condition">
                                        <a>Terms & Conditions</a>
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/contact">
                                        <a>Privacy policy</a>
                                    </Link>
                                </li> */}
                                <li>
                                    <Link href="/contact">
                                        <a>Contact Us</a>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-12 col-md-12">
                        <div className="free-trial-content">

                            <h5 >Get our latest news</h5>

                            <form className="newsletter-form" onSubmit={handleSubmit} style={{marginTop: -3}}>
                                <input type="email" className="input-newsletter" placeholder="Email" />
                                <button type="submit">GO !</button>
                            </form>
                        </div>
                        <div className="copyright-area">
                            <p>Copyright &copy; {currentYear} BlockBoosted. Made with <Icon.Heart /> by the BlockBoosted team</p>
                        </div>
                    </div>
                </div>
            </div>

            <img src="/images/map.png" className="map" alt="map" />

            {/* Shape Images */}
            <div className="shape1">
                <img src="/images/shape1.png" alt="shape" />
            </div>
            <div className="shape8 rotateme">
                <img src="/images/shape2.svg" alt="shape" />
            </div>
        </footer>
    )
     
}

export default Footer; 