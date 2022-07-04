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

const ProfileForm = (props) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [twitter, setTwitter] = useState('');
    const[image, setImage] = useState('');
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

    function loadData() {

        if(currentUser != undefined) {
            setName(currentUser.username);
            db.collection('profileTest').doc(currentUser.eth_address).collection("privacy").doc("personalData").get().then((doc) => {
                setEmail(doc.data().email);
            }).catch((err) => {
                console.log(err);
            })
            setImage(currentUser.image);
            setBio(currentUser.bio);
            setTwitter(currentUser.twitter);
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
                        pathname: "/User/[id]",
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

    const createProfile = () => {
        const user = { username: "", eth_address: "0xCE82601346578C58fFE5b5769a0A640d8d9Ed7C5".toLowerCase(), image: "", bio: "", twitter: "", liked: new Array() };
        const privacy = { email: "" };

        axios({
            method: 'post',
            url: 'https://europe-west1-crowdfunding-dev-5f802.cloudfunctions.net/assignProfile',
            data: {
                profile: user,
                privacy: privacy
            }
        }).then(async(response) => {
            console.log(response.data);
            
            dispatch({
                type: 'SET_CURRENT_USER',
                id: user
            })
        }).catch(console.log);
    }

    const updateProfile = () => {
        let tmpUser = currentUser;

        const user = { username: name, eth_address: tmpUser.eth_address, image: image, bio: bio, twitter: twitter, 
            liked: tmpUser.liked };
        const privacy = { email: email };

        axios({
            method: 'post',
            url: 'https://europe-west1-crowdfunding-dev-5f802.cloudfunctions.net/updateProfile',
            data: {
                profile: user,
                privacy: privacy
            }
        }).then(async(response) => {
            openDialog();
            console.log(response.data);
        }).catch(console.log);
    }

    // function printPf() {
    //     db.collection('profileTest').doc("0xCE82601346578C58fFE5b5769a0A640d8d9Ed7C5".toLowerCase()).get().then((doc) => {
	// 		db.collection('profileTest').doc("0xCE82601346578C58fFE5b5769a0A640d8d9Ed7C5".toLowerCase()).collection("privacy").doc("personalData").get().then((doc) => {
    //             console.log("subcollection doc", doc.data());
	// 		}).catch((err) => {
	// 			console.log(err);
	// 		})
    //         console.log("doc gathered", doc.data());
	// 	}).catch((err) => {
	// 		console.log(err);
	// 	})
    // }

    function handleSubmit(event) {
        event.preventDefault();

        // let user = currentUser

        // user.username = name;
        // user.email = email;
        // user.image = image;
        // user.bio = bio;
        // user.twitter = twitter;

        // updateDoc(user.eth_address, 'profile', user, function() {
        //     openDialog();
        // })

        updateProfile()
        
    }

    useEffect(() => {
        loadData()
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
                        <h3>Complete the information about your profile</h3>
                        <form action={`/User/${currentUser.eth_address}`} onSubmit={(event) => {
                            handleSubmit(event)
                        }
                        }>
                            <div className="row">
                                <p><i> Address : {currentUser.eth_address}</i><br/></p>

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
                                <p><i style={{fontSize: 12}}>Size : max 800kb / Format : JPG, PNG or GIF</i></p>
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

                    
                                <p><strong> Twitter account </strong><br/>Connect to Twitter to link your account to your profile</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        {displayTwitter()}
                                        
                                    </div>
                                </div>

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

                    
                                <p><strong> Twitter account </strong><br/>Connect to Twitter to link your account to your profile</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <Skeleton animation={false} variant="rect" height={45} />
                                    </div>
                                </div>
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