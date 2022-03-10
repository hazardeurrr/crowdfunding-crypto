import React, { useState, useEffect } from 'react';
import ProfilePic from "@/components/ITStartup/ProfilePic";
import { updateDoc, getOne, postDoc } from 'firebase-crowdfund/queries'
import firebase from 'firebase';
import Button from '@material-ui/core/Button';
import { FaTwitter } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';


const ProfileForm = (props) => {
    // const data = undefined;

    let userAddr = props.address

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [twitter, setTwitter] = useState('');
    const [site, setSite] = useState('');
    const[image, setImage] = useState('');

    const handleChangeName = (event) => setName(event.target.value);
    const handleChangeEmail = (event) => setEmail(event.target.value);
    const handleChangeBio = (event) => setBio(event.target.value);
    const handleChangeTwitter = (event) => setTwitter(event.target.value);
    const handleChangeSite = (event) => setSite(event.target.value);

    function showAddress() {
        console.log(userAddr)
    }

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

        }).catch((error) => {
            // Handle Errors here.
            console.log(error)
      
        });
    }



    function loadData() {
        let user = undefined
        // let userAddr = useSelector((state) => state.address)
        // console.log('Adresse: ' + userAddr)
        getOne('profile', userAddr, function(doc) {
            if (doc.exists) {
                user = doc.data()
               // console.log("user info : " + JSON.stringify(user))
                setName(user.username);
                setEmail(user.email);
                setImage(user.image);
                setBio(user.bio);
                setTwitter(user.twitter);
                setSite(user.website);
            } else {
                console.log("Document not found")
            }
        })
    }

    function handleSubmit(event) {
        event.preventDefault();

        let user = undefined
        getOne('profile', userAddr, function(doc) {
            if (doc.exists) {
                user = doc.data()
                user.username = name;
                user.email = email;
                user.image = image;
                user.bio = bio;
                user.twitter = twitter;
                user.website = site;

                updateDoc(user.eth_address, 'profile', user, function() {
                    alert("Profile updated !")
                    window.location.replace("/User/"+userAddr)
                })
            } else {
                console.log("Document not found")
            }


        })

    }

    useEffect(() => {
        loadData()
    }, [props.address] )

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

    return (
        <>
            <div className="services-area-two pt-80 pb-50 bg-f9f6f6">
                <div className="container">
                    <div className="section-title">
                        <h2>Profile</h2>
                        <div className="bar"></div>
                        <p>Customize your profile here.</p>
                    </div>

                    {/* <button onClick={showAddress}>Show address</button>
                     */}

                    <div className="faq-contact">
                        <h3>Complete the information about your profile</h3>
                        <form action={`/User/${userAddr}`} onSubmit={(event) => {
                            handleSubmit(event)
                        }
                        }>
                            <div className="row">
                                <p><strong> Displayed name </strong><br/>Choose a name that will be displayed to the other users</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <input type="text" placeholder="Name" className="form-control" value={name} onChange={handleChangeName} maxLength="32"/>
                                    </div>
                                </div>

                                <p><strong> Email </strong><br/>Enter your email address</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <input type="email" placeholder="Email" className="form-control" value={email} onChange={handleChangeEmail}/>
                                    </div>
                                </div>

                                <p><strong> Profile Pic </strong><br/>Choose a profile picture to represent your account</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <ProfilePic onImageChange={handleChangeImage} ratio="less" resolutionWidth={1920} resolutionHeight={1080} />
                                    </div>
                                </div>

                                <p><strong> Bio </strong><br/> Make a short description of yourself.</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <textarea cols="30" rows="6" placeholder="Bio" className="form-control" value={bio} onChange={handleChangeBio}></textarea>
                                    </div>
                                </div>

                                {/* <p><strong> Twitter account </strong><br/>Link your Twitter account to be certified</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <input type="text" placeholder="@" className="form-control" value={twitter} onChange={handleChangeTwitter}/>
                                        <TwitterLogin
                                            authCallback={authHandler}
                                            consumerKey={secrets.consumer_key}
                                            consumerSecret={secrets.consumer_secret}
                                            buttonTheme="light_short"
                                        />
                                    </div>
                                </div> */}

                                {/* <p><strong> Twitter account </strong><br/>Enter your twitter username</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <input type="text" placeholder="@" className="form-control" value={twitter} onChange={handleChangeTwitter}/>
                                    </div>
                                </div> */}
                                <p><strong> Twitter account </strong><br/>Connect to Twitter to link your account to your profile</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        {displayTwitter()}
                                        
                                    </div>
                                </div>

                                

                                <p><strong> Website </strong></p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <input type="url" id="url" pattern="https://.*" placeholder="https://your-site.com" className="form-control" 
                                        value={site} onChange={handleChangeSite}/>
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
    )
}

export default ProfileForm;