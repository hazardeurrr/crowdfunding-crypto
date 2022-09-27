import React, { useState, useEffect, useReducer } from 'react';
import ProfilePic from "@/components/ITStartup/ProfilePic";
import { updateDoc, getOne, postDoc } from 'firebase-crowdfund/queries'
import firebase from 'firebase-crowdfund/index';
import Button from '@material-ui/core/Button';
import { FaTwitter } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import Skeleton from '@material-ui/lab/Skeleton';
import axios from 'axios';
import { db } from 'firebase-crowdfund/index'
import { RiContactsBookLine } from 'react-icons/ri';
import { GiConsoleController } from 'react-icons/gi';

const ProfileForm = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [twitter, setTwitter] = useState('');
    const[image, setImage] = useState('');
    const [site, setSite] = useState('');
    const [dialogOpen, setDialog] = useState(false);
    const currentUser = props.currentUser;

    const handleChangeName = (event) => setName(event.target.value);
    const handleChangeEmail = (event) => setEmail(event.target.value);
    const handleChangeBio = (event) => setBio(event.target.value);
    const handleChangeTwitter = (event) => setTwitter(event.target.value);
    const handleChangeSite = (event) => setSite(event.target.value);

    const handleChangeImage = (image) => {
        // console.log("image changed")
        setImage(image);
    }

    const authHandler = (err, data) => {
        console.log(err, data);
    };

    const authenticateTwitter = () => {
        var provider = new firebase.auth.TwitterAuthProvider();

        firebase
        .auth()
        .signInWithPopup(provider)
        .then((result) => {

            let username = result.additionalUserInfo.username
            setTwitter(username)
            // user.twitter = username;

        }).catch((error) => {
            // Handle Errors here.
            console.log(error)
      
        });
    }

    function testRules() {
        // const profile = { eth_address: "0x2136ea398111ce7ae5e5539046958a3cf5605dea",
        //     liked: new Array() }; 0x0fcf46697cdcb23ab8fdde200132409870c3b584

        const profile = { username: "", eth_address: "0x2136ea398111ce7ae5e5539046958a3cf5605dea", image: "", bio: "", twitter: "", liked: new Array() };

        // db.collection('profileTest').doc(profile.eth_address).collection("privacy").doc(profile.eth_address).get().then((doc) => {
		// 	console.log(doc.data())
		// }).catch((err) => {
		// 	console.log(err);
		// })

        const req = db.collection('profileTest').doc(profile.eth_address).collection("privacy").doc(profile.eth_address).get();

        req.then((doc) => {
            console.log();
        })

        // db.collection('profileTest').doc(profile.eth_address).get().then((doc) => {
        //     db.collection('profileTest').doc(profile.eth_address).collection("privacy").doc(profile.eth_address).get().then((docu) => {
        //         let t = {profile: doc.data(), privacy: docu.data()}
        //         console.log(t);
        //     }).catch((err) => {
        //         console.log(err);
        //     })
        // }).catch((err) => {
        //     console.log(err);
        // });

        // db.collection('profileTest').doc(profile.eth_address).set(profile).then(() => {
		// 	// db.collection('profileTest').doc(profile.eth_address).collection("privacy").doc(profile.eth_address).update(privacy).then(() => {
        //     //     console.log("user updated");
		// 	// }).catch((err) => {
		// 	// 	console.log(err);
		// 	// })
        //     console.log("updated");
		// }).catch((err) => {
		// 	console.log(err);
		// }
    }

    function loadData() {

        if(currentUser != undefined) {

            // axios({
            //     method: 'post',
            //     url: 'https://europe-west1-crowdfunding-dev-5f802.cloudfunctions.net/getEmail',
            //     data: {
            //       address: currentUser.eth_address
            //     }
            // }).then((response) => {
            //     console.log(response.data);
            // })

            const uid = firebase.auth().currentUser.uid;

            db.collection('profileTest').doc(uid).collection("privacy").doc(uid).get().then((doc) => {
                setEmail(doc.data().email);
            }).catch((err) => {
                console.log(err);
            })

            setName(currentUser.username);
            setImage(currentUser.image);
            setBio(currentUser.bio);
            setTwitter(currentUser.twitter);
            setSite(currentUser.site);
        }
    }

    function openDialog(){
        setDialog(true);
    }

    function closeDialog(){
        setDialog(false);
    }

    const displayValidation = (addr) => {
        return <div style={{justifyContent:'center'}}>
            <DialogTitle id="alert-dialog-title">Profile Updated!</DialogTitle>
            <DialogContent>
            
            <div style={{display: 'flex', justifyContent:'center', alignItems:'center', flexDirection:'column'}}>
                <div style={{justifyContent:'center'}}>
                <h5 style={{marginBottom: 5}}>You can now go back to your profile to check your changes !</h5>
                    <Link href={{
                        pathname: "/user/[id]",
                        query: {
                            id: addr,
                            }
                        }}
                        >
                    <a style={{marginTop: 15}} className="btn btn-primary">Back to your profile</a>
                    </Link>  
                </div>
            </div>    
            
            </DialogContent></div>
    }

    const updateProfile = () => {
        let tmpUser = currentUser;

        const user = { username: name, eth_address: tmpUser.eth_address, image: image, bio: bio, twitter: twitter, 
            liked: tmpUser.liked, site: site };
        const privacy = { email: email };

        // console.log(privacy);
        // console.log(user);

        db.collection('profileTest').doc(user.eth_address).update(user).then(() => {
			db.collection('profileTest').doc(user.eth_address).collection("privacy").doc(user.eth_address).update({email: email}).then(() => {
				openDialog();
                console.log("user updated");
			}).catch((err) => {
				console.log(err);
			})
		}).catch((err) => {
			console.log(err);
		})
    }

    function handleSubmit(event) {
        event.preventDefault();

        updateProfile()
        
    }

    useEffect(() => {
        loadData();
    }, [props.currentUser] )

    const displayTwitter = () => {
        if(twitter != '' && twitter != undefined && twitter != null){
            return <>
            <p><i>You're currently linked to @<a href={`https://twitter.com/${twitter}`} target="_blank">{twitter}</a></i></p>
            <Button onClick={() => authenticateTwitter()} size="small" variant="contained" style={{color:'white', backgroundColor:'#1d9bf0'}} startIcon={<FaTwitter />}>
                Change Account
            </Button>
            <Button onClick={() => removeTwitter()} variant="contained" style={{marginLeft : 15, color:'red', backgroundColor:'white'}} size="small" startIcon={<ImCross />}>
                Unlink
            </Button>
            </>
        } else {
            return <Button onClick={() => authenticateTwitter()} variant="contained" style={{color:'white', backgroundColor:'#1d9bf0'}} startIcon={<FaTwitter />}>
                Connect
            </Button>
        }
    }

    const removeTwitter = () => {
        setTwitter('')
    }

    const displayProfileForm = () => {
        if(currentUser != undefined){
            return <>
            <div className="services-area-two pt-80 pb-50 bg-f9f6f6">
                <div className="container">
                    <div className="section-title">
                        <h2>Profile</h2>
                        <div className="bar"></div>
                        <p>Customize your profile here.</p>
                    </div>

                    {/* <button onClick={showAddress}>Show address</button>
                     */}
                     <Dialog
                        className='dialogResponsive'
                        open={dialogOpen}
                        onClose={(_, reason) => {
                            if (reason !== "backdropClick") {
                                closeDialog();
                            }
                            }}
                        
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        {displayValidation(currentUser.eth_address)}
                        {/* <DialogActions>
                        <Button onClick={this.closeDialog} color="primary">
                            Close
                        </Button>
                        </DialogActions> */}
                    </Dialog>

                    <div className="faq-contact">
                        {/* <button className="btn btn-primary" onClick={() => {
                                testRules()}}>Test</button> */}
                        <h3>Complete the information about your profile</h3>
                        <form action={`/user/${currentUser.eth_address}`} onSubmit={(event) => {
                            handleSubmit(event)
                        }
                        }>
                        <div className="row">
                                <p><i> Address : <span className='user-address2'>{currentUser.eth_address}</span></i><br/></p>

                                <p><strong> Displayed name </strong><br/>Choose a name that will be displayed to the other users</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <input type="text" placeholder="Name" className="form-control" value={name} onChange={handleChangeName} maxLength="32"/>
                                    </div>
                                </div>

                                <p><strong> Email </strong><br/>Enter your email address.</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <input type="email" placeholder="Email" className="form-control" value={email} onChange={handleChangeEmail}/>
                                    </div>
                                </div>
                                <p><i style={{fontSize: 12}}>Email is NOT mandatory. However, if you are waiting for a reward after a participation, please make sure this field is filled
                                    as it's currently the only way for us to establish direct contact between creators and contributors.</i></p>

                                <p><strong> Profile Pic </strong><br/>Choose a profile picture to represent your account</p>
                                <p><i style={{fontSize: 12}}>Size : max 600kb / Format : JPG, PNG or GIF</i></p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <ProfilePic onImageChange={handleChangeImage} />
                                    </div>
                                </div>

                                <p><strong> Bio </strong><br/> Make a short description of yourself.</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <textarea cols="30" rows="6" placeholder="Bio" className="form-control" value={bio} onChange={handleChangeBio}></textarea>
                                    </div>
                                </div>

                                <p><strong> Twitter account </strong><br/>Enter your twitter username</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <div style={{display:'flex', alignItems:'center'}}>@<input style={{marginLeft: 3}} type="text" placeholder="myusername" className="form-control" value={twitter} onChange={handleChangeTwitter}/></div>
                                    </div>
                                </div>

                                <p><strong> Website </strong><br/>Enter a link to your website</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <input type="url" id="url" pattern="https://.*" placeholder="https://your-site.com" className="form-control" 
                                        value={site} onChange={handleChangeSite}/>
                                    </div>
                                </div>

                    
                                {/* <p><strong> Twitter account </strong><br/>Connect to Twitter to link your account to your profile</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        {displayTwitter()}
                                        
                                    </div>
                                </div> */}

                                <div className="col-lg-12 col-md-12">
                                    <button className="btn btn-primary" type="submit" onClick={(event) => {
                                    handleSubmit(event)}}>Update Profile</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
        } else {
            return  <>
            <div className="services-area-two pt-80 pb-50 bg-f9f6f6">
                <div className="container">
                    <div className="section-title">
                        <h2>Profile</h2>
                        <div className="bar"></div>
                        <p>Customize your profile here.</p>
                    </div>

                    <div className="faq-contact">
                        <h3>Complete the information about your profile</h3>
                            <div className="row">
                                <p style={{display:'flex'}}><i> Address : </i><Skeleton animation={false} variant="text"/><br/></p>

                                <p><strong> Displayed name </strong><br/>Choose a name that will be displayed to the other users</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <Skeleton animation={false} variant="rect" height={35} />
                                    </div>
                                </div>

                                <p><strong> Email </strong><br/>Enter your email address.</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <Skeleton animation={false} variant="rect" height={35} />
                                    </div>
                                </div>
                                <p><i style={{fontSize: 12}}>Email is NOT mandatory. However, if you are waiting for a reward after a participation, please make sure this field is filled
                                    as it's currently the only way for us to establish direct contact between creators and contributors.</i></p>

                                <p><strong> Profile Pic </strong><br/>Choose a profile picture to represent your account</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <Skeleton animation={false} variant="rect" height={40} />
                                    </div>
                                </div>

                                <p><strong> Bio </strong><br/> Make a short description of yourself.</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <Skeleton animation={false} variant="rect" height={150} />
                                    </div>
                                </div>

                                <p><strong> Twitter account </strong><br/>Enter your twitter username</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <Skeleton animation={false} variant="rect" height={45} />
                                    </div>
                                </div>

                                <p><strong> Website </strong></p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <Skeleton animation={false} variant="rect" height={45} />
                                    </div>
                                </div>

                    
                                {/* <p><strong> Twitter account </strong><br/>Connect to Twitter to link your account to your profile</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <Skeleton animation={false} variant="rect" height={45} />
                                    </div>
                                </div> */}
                            </div>
                    </div>
                </div>
            </div>
        </>
        }
    }

    return (
        displayProfileForm()
    )
}

export default ProfileForm;