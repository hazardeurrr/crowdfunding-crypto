import React, { useState } from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import Link from 'next/link';
import ProfilePic from "@/components/ITStartup/ProfilePic";
import profiles from '@/utils/usersListJson.json';


const SetProfile = (props) => {
    // const data = undefined;

    const userAddr = props.location.address

    function getJson() {
        const user = profiles.users.find(e => e.eth_address == "0x899657553381574")
        console.log("user : " + user.eth_address)
    }

    // console.log(JSON.stringify(profiles))

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [bio, setBio] = useState('');
    const [twitter, setTwitter] = useState('');
    const [site, setSite] = useState('');

    const handleChangeName = (event) => setName(event.target.value);
    const handleChangeEmail = (event) => setEmail(event.target.value);
    const handleChangeBio = (event) => setBio(event.target.value);
    const handleChangeTwitter = (event) => setTwitter(event.target.value);
    const handleChangeSite = (event) => setSite(event.target.value);

    function showAddress() {
        console.log(userAddr)
    }

    return (
        <>
            <Navbar />

            <PageBanner pageTitle="User Profile" />

            <div className="services-area-two pt-80 pb-50 bg-f9f6f6">
                <div className="container">
                    <div className="section-title">
                        <h2>Profile</h2>
                        <div className="bar"></div>
                        <p>Customize your profile here.</p>
                    </div>

                    <button className="btn btn-primary" onClick={showAddress()}>Show address</button>

                    <div className="faq-contact">
                        <h3>Complete the information about your profile</h3>
                        <form onSubmit={() => {
                            // alert(name + email + bio + twitter + site)
                        }}>
                            <div className="row">
                                <p><strong> Displayed name </strong><br/>Choose a name that will be displayed to the other users</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <input type="text" placeholder="Name" className="form-control" value={name} onChange={handleChangeName}/>
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
                                        <ProfilePic />
                                    </div>
                                </div>

                                <p><strong> Bio </strong><br/> Make a short description of yourself.</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <textarea name="bio" cols="30" rows="6" placeholder="Bio" className="form-control" value={bio} onChange={handleChangeBio}></textarea>
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
                                        <input type="url" name="url" id="url" pattern="https://.*" placeholder="https://your-site.com" className="form-control" value={site} onChange={handleChangeSite}/>
                                    </div>
                                </div>

                                <div className="col-lg-12 col-md-12">
                                    <button className="btn btn-primary" type="submit" onClick={() => {
                                        const user = profiles.users.find(e => e.eth_address == "0x899657553381574");
                                        user.username = name;
                                        user.email = email;
                                        user.bio = bio;
                                        user.twitter = twitter;
                                        user.website = site;

                                        const newData = JSON.stringify(profiles);

                                        alert(newData)

                                    }}>Update Profile</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default SetProfile;



export async function getServerSideProps(context) {
    console.log(context.query) 
    // returns { id: episode.itunes.episode, title: episode.title}
    
  
    //you can make DB queries using the data in context.query
    return {
        props: { 
           address: context.query.id //pass it to the page props
        }
    }
}