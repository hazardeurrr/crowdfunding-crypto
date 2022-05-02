import React from 'react';
import * as Icon from 'react-feather';
import Link from 'next/link';
import { FaDiscord } from 'react-icons/fa';


const ContactInfo = () => {
    return (
        <div className="contact-info-area ptb-80">
            <div className="container">
                <div className="section-title">
                    <h2>Get In Touch With Us</h2>
                        <div className="bar"></div>
                        <p>If you have any question, please make sure it's not already answered on our <Link href="/how-it-works"><a>"How it works"</a></Link> page.</p>

                </div>
                <div className="row justify-content-center">

                <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="contact-info-box" style={{border: '2px solid #c8ccce', borderRadius: 8}}>
                        <a href="https://discord.gg/6QdBGMKSUn" target="_blank"><div className="icon">
                                <FaDiscord />
                            </div>
                            <h3>Discord</h3>
                            <p style={{fontSize: 10, fontStyle:"italic", marginTop: -17, marginBottom: 7}}>(Recommended)</p>
                            <p><b>Quick support</b>.<br></br>Talk directly with the team & community.</p>
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="contact-info-box">

                            <div className="icon">
                                <Icon.Mail />
                            </div>
                            <h3>Email</h3>
                            <p style={{marginTop: 15}}>You can also contact our team by email</p>
                            <p><a href="mailto:contact@blockboosted.com">contact@blockboosted.com</a></p>
                        </div>
                    </div>



                    {/* <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="contact-info-box">
                            <div className="icon">
                                <Icon.MapPin />
                            </div>
                            <h3>Visit Here</h3>
                            <p>27 Division St, New York, NY 10002, United States of America</p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="contact-info-box">
                            <div className="icon">
                                <Icon.Phone />
                            </div>
                            <h3>Call Here</h3>
                            <p><a href="tel:+1234567890">+123 456 7890</a></p>
                            <p><a href="tel:+2414524526">+241 452 4526</a></p>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default ContactInfo;  