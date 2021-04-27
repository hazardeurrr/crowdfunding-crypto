import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import Link from 'next/link';
import HTMLEditor from '@/components/Common/HTMLEditor';
import * as Icon from 'react-feather';
import ProfilePic from "@/components/ITStartup/ProfilePic"
import { ContactSupportOutlined } from '@material-ui/icons';
import profiles from '@/utils/usersListJson.json';


const SetProfile = (props) => {
    // const data = undefined;

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

                    <div className="faq-contact">
                        <h3>Complete the information about your profile</h3>
                        <form>
                            <div className="row">
                                <p><strong> Displayed name </strong><br/>Choose a name that will be displayed to the other users</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <input type="text" placeholder="Name" className="form-control" />
                                    </div>
                                </div>

                                <p><strong> Email </strong><br/>Enter your email address</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <input type="email" placeholder="Email" className="form-control" />
                                    </div>
                                </div>

                                <p><strong> Profile Pic </strong><br/>Choose a profile picture to represent your account</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <ProfilePic/>
                                    </div>
                                </div>

                                <p><strong> Bio </strong><br/> Make a short description of yourself.</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <textarea name="bio" cols="30" rows="6" placeholder="Bio" className="form-control"></textarea>
                                    </div>
                                </div>

                                <p><strong> Twitter account </strong><br/>Link your Twitter account to be certified</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <input type="text" placeholder="@" className="form-control" />
                                    </div>
                                </div>

                                <p><strong> Website </strong></p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <input type="url" name="url" id="url" pattern="https://.*" placeholder="https://your-site.com" className="form-control" />
                                    </div>
                                </div>

                                <div className="col-lg-12 col-md-12">
                                    <button className="btn btn-primary" type="submit" onClick={() => {
                                        const user = profiles.users.find(e => e.eth_address == "0x899657553381574")
                                        console.log(user.eth_address)
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