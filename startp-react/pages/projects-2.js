import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner'; 
import Link from 'next/link';
 
const Projects2 = () => {
    return (
        <>
            <Navbar />

            <PageBanner pageTitle="Projects Style Two" />

            <div className="ml-projects-area pt-80 pb-50">
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-ml-projects-box">
                                <img src="/images/projects-img1.jpg" alt="image" />
                            
                                <div className="plus-icon">
                                    <Link href="/project-details">
                                        <a><span></span></a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-ml-projects-box">
                                <img src="/images/projects-img2.jpg" alt="image" />
                            
                                <div className="plus-icon">
                                    <Link href="/project-details">
                                        <a><span></span></a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-ml-projects-box">
                                <img src="/images/projects-img3.jpg" alt="image" />
                            
                                <div className="plus-icon">
                                    <Link href="/project-details">
                                        <a><span></span></a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-ml-projects-box">
                                <img src="/images/projects-img4.jpg" alt="image" />
                            
                                <div className="plus-icon">
                                    <Link href="/project-details">
                                        <a><span></span></a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-ml-projects-box">
                                <img src="/images/projects-img5.jpg" alt="image" />
                            
                                <div className="plus-icon">
                                    <Link href="/project-details">
                                        <a><span></span></a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-ml-projects-box">
                                <img src="/images/projects-img6.jpg" alt="image" />
                            
                                <div className="plus-icon">
                                    <Link href="/project-details">
                                        <a><span></span></a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-ml-projects-box">
                                <img src="/images/projects-img7.jpg" alt="image" />
                            
                                <div className="plus-icon">
                                    <Link href="/project-details">
                                        <a><span></span></a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-ml-projects-box">
                                <img src="/images/projects-img8.jpg" alt="image" />
                            
                                <div className="plus-icon">
                                    <Link href="/project-details">
                                        <a><span></span></a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Projects2;