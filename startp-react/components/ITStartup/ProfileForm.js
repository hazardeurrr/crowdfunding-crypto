import React, { useState, useEffect } from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import Link from 'next/link';
import ProfilePic from "@/components/ITStartup/ProfilePic";
import profiles from '@/utils/usersListJson.json';
import { useSelector, useDispatch } from 'react-redux'
import { updateDoc, getOne } from 'firebase-crowdfund/queries'


const ProfileForm = (props) => {
    // const data = undefined;

    let userAddr = useSelector((state) => state.address)

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
        setImage(image);
    }

    function loadData() {
        let user = undefined
        // let userAddr = useSelector((state) => state.address)
        // console.log('Adresse: ' + userAddr)
        getOne('profile', userAddr, function(doc) {
            if (doc.exists) {
                user = doc.data()
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

    function formIsValid() {
        let valid = true

        if (name.replace(/\s/g, '') === "" || email === "" || twitter === "") {
            valid = false
        }

        return valid
    }

    useEffect(() => {
        loadData()
    }, [] )

    return (
        <>
            <div className="services-area-two pt-80 pb-50 bg-f9f6f6">
                <div className="container">
                    <div className="section-title">
                        <h2>Profile</h2>
                        <div className="bar"></div>
                        <p>Customize your profile here.</p>
                    </div>

                    <button onClick={showAddress}>Show address</button>

                    <div className="faq-contact">
                        <h3>Complete the information about your profile</h3>
                        <form action={`/User/${userAddr}`} onSubmit={() => {
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

                                    //console.log(user)

                                    updateDoc(user.eth_address, 'profile', user, function() {
                                        console.log("Updated")
                                    })
                                } else {
                                    Console.log("Document not found")
                                }
                            })
                            alert("Profile updated !")
                        }}>
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
                                        <ProfilePic onImageChange={handleChangeImage}/>
                                    </div>
                                </div>

                                <p><strong> Bio </strong><br/> Make a short description of yourself.</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <textarea cols="30" rows="6" placeholder="Bio" className="form-control" value={bio} onChange={handleChangeBio}></textarea>
                                    </div>
                                </div>

                                <p><strong> Twitter account </strong><br/>Link your Twitter account to be certified</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <input type="text" placeholder="@" className="form-control" value={twitter} onChange={handleChangeTwitter}/>
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
                                        // formIsValid = formIsValid()

                                        // if (formIsValid === false) {
                                        //     event.preventDefault()
                                        //     alert("The form is not valid. Check for the errors !")
                                        // }

                                        // else {
                                        // }
                                        // event.preventDefault()


                                    }}>Update Profile</button>
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