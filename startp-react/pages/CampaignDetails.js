import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner'; 
import * as Icon from 'react-feather';
import projectList from '@/utils/projectList'
import Parser from 'html-react-parser';
import Link from '@/utils/ActiveLink'
import ProgressBar from 'react-bootstrap/ProgressBar';
import CampaignSidebar from '@/components/Blog/CampaignSidebar';


 
const CampaignDetails = () => {
    const campaign = projectList[0] // hardcoded, change
    const desc = campaign.long_desc
    const pct = (campaign.raised / campaign.objective) * 100

    return (
        <>
            <Navbar />
            
            {/* <PageBanner pageTitle={campaign.title}/> */}

            

            <div className="blog-details-area ptb-80">
                <div className="container">
                    <div className="about-area ptb-80">
                        <div className="container-fluid">
                            <div className="row align-items-center">
                                <div className="col-lg-6 col-md-12">
                                    <div className="ml-about-img">
                                        <img src={campaign.main_img} alt="image" />
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-12">
                                    <div className="ml-about-content">
                                        <span className="sub-title">{campaign.main_category}</span>
                                        <h2>{campaign.title}</h2>
                                        <div className="bar"></div>

                                        <p>{campaign.small_description}</p>
                                        <h5>{campaign.raised} {campaign.currency} raised / {campaign.objective} {campaign.currency}</h5> 
                                        <ProgressBar animated now={pct}/>
                                        <div className="blog-details-desc">
                                            <div className="article-content">
                                                <div className="entry-meta">
                                                    <ul>
                                                        <li>
                                                            <Icon.Clock /> {campaign.time_left} left
                                                        </li>
                                                        <li>
                                                            <Icon.User /> <a href="#">by {campaign.creator}</a>
                                                        </li>
                                                    </ul>
                                                </div>              
                                            </div>
                                        </div>

                                            <Link href="/login">
                                                <a className="btn btn-primary">Back this campaign</a>
                                            </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="blog-details-desc">

                                <div className="article-content">     
                                    {Parser(desc)}
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12">
                            <CampaignSidebar project = {campaign}/>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default CampaignDetails;