import React from 'react';
import * as Icon from 'react-feather';
import Link from 'next/link';

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
                        <div className="contact-info-box">

                            <div className="icon">
                                <Icon.Mail />
                            </div>
                            <h3>Support</h3>
                            <p>We’ll Be Glad To Assist You !</p>
                            <p><a href="mailto:support@blockboosted.com?subject=[SUPPORT]">support@blockboosted.com</a></p>
                        </div>
                    </div>

                    <div className="col-lg-4 col-md-6 col-sm-6">
                        <div className="contact-info-box">
                            <div className="icon">
                                <Icon.ThumbsUp />
                            </div>
                            <h3>Feedback</h3>
                            <p>Give us your thoughts about BlockBoosted</p>
                            <p><a href="mailto:feedback@blockboosted.com?subject=[FEEDBACK]">feedback@blockboosted.com</a></p>
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