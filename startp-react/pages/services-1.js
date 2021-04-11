import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import Link from 'next/link';
import * as Icon from 'react-feather';
 
const Services1 = () => {
    return (
        <>
            <Navbar />

            <PageBanner pageTitle="Services Style One" />

            <div className="services-area-two pt-80 pb-50 bg-f9f6f6">
                <div className="container">
                    <div className="section-title">
                        <h2>Our Services</h2>
                        <div className="bar"></div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>

                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-sm-6">
                            <div className="single-services-box">
                                <div className="icon">
                                    <Icon.Settings />
                                </div>
                                <h3>
                                    <Link href="/service-details">
                                        <a>Incredible Infrastructure</a>
                                    </Link>
                                </h3>
                                <p>Lorem ipsum dolor amet, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="single-services-box">
                                <div className="icon">
                                    <Icon.Mail />
                                </div>
                                <h3>
                                    <Link href="/service-details">
                                        <a>Email Notifications</a>
                                    </Link>
                                </h3>
                                <p>Lorem ipsum dolor amet, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="single-services-box">
                                <div className="icon">
                                    <Icon.Bell />
                                </div>
                                <h3>
                                    <Link href="/service-details">
                                        <a>Best Analytics Audits</a>
                                    </Link>
                                </h3>
                                <p>Lorem ipsum dolor amet, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="single-services-box">
                                <div className="icon bg-c679e3">
                                    <Icon.Grid />
                                </div>
                                <h3>
                                    <Link href="/service-details">
                                        <a>Simple Dashboard</a>
                                    </Link>
                                </h3>
                                <p>Lorem ipsum dolor amet, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="single-services-box">
                                <div className="icon bg-c679e3">
                                    <Icon.Info />
                                </div>
                                <h3>
                                    <Link href="/service-details">
                                        <a>Information Retrieval</a>
                                    </Link>
                                </h3>
                                <p>Lorem ipsum dolor amet, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="single-services-box">
                                <div className="icon bg-c679e3">
                                    <Icon.HardDrive />
                                </div>
                                <h3>
                                    <Link href="/service-details">
                                        <a>Deep Technical SEO</a>
                                    </Link>
                                </h3>
                                <p>Lorem ipsum dolor amet, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="single-services-box">
                                <div className="icon bg-eb6b3d">
                                    <Icon.MousePointer />
                                </div>
                                <h3>
                                    <Link href="/service-details">
                                        <a>Drag & Drop Functionality</a>
                                    </Link>
                                </h3>
                                <p>Lorem ipsum dolor amet, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="single-services-box">
                                <div className="icon bg-eb6b3d">
                                    <Icon.Bell />
                                </div> 
                                <h3>
                                    <Link href="/service-details">
                                        <a>Deadline Reminders</a>
                                    </Link>
                                </h3>
                                <p>Lorem ipsum dolor amet, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            </div>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                            <div className="single-services-box">
                                <div className="icon bg-eb6b3d">
                                    <Icon.Send />
                                </div>
                                <h3>
                                    <Link href="/service-details">
                                        <a>Modern Keyword Analysis</a>
                                    </Link>
                                </h3>
                                <p>Lorem ipsum dolor amet, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
 
            <Footer />
        </>
    )
}

export default Services1;