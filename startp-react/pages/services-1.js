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

            <PageBanner pageTitle="Create your campaign !" />

            <div className="services-area-two pt-80 pb-50 bg-f9f6f6">
                <div className="container">
                    <div className="section-title">
                        <h2>Campaign</h2>
                        <div className="bar"></div>
                        <p>Here is the place where you can create your campaign and start raising funds for your project.</p>
                    </div>

                    <div className="faq-contact">
                        <h3>Complete the information for your campaign</h3>
                        <form>
                            <div className="row">
                                <p><strong> Fundraiser Name </strong><br/>Give a name to your project to make it searchable for the users.</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <input type="text" placeholder="Title" className="form-control" />
                                    </div>
                                </div>

                                <p><strong> Project Description </strong><br/> Make a short description of your project to make it more attractive.</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <textarea name="message" cols="30" rows="6" placeholder="Description" className="form-control"></textarea>
                                    </div>
                                </div>

                                <p><strong> Project Category </strong><br/> Choose a category that describes your project.</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                    
                                        <div className="select-box">
                                            <select className="form-select">
                                                <option value="Book">Book</option>
                                                <option value="Crafts">Crafts</option>
                                                <option value="Design">Design and Art</option>
                                                <option value="Performances">Performances</option>
                                                <option value="Technology">Technology</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <p><strong> Fudraising Duration </strong><br/> Projects with shorter durations have higher success rates. You won’t be able to adjust your duration after you launch.</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                        <input
                                            id="date"
                                            label="Birthday"
                                            type="date"
                                            defaultValue='2021-04-15'
                                            className="form-control"
                                            InputLabelProps={{
                                            shrink: true,
                                            }}
                                        />
                                    </div>
                                </div>

                                <p><strong> Project Goal </strong><br/> Your goal should reflect the minimum amount of funds you need to complete your project and send out rewards, and include a buffer for payments processing fees.</p>
                                <div className="col-lg-12 col-md-12">
                                    <div className="form-group">
                                    <input type="number" placeholder="Goal" className="form-control" />
                                    </div>
                                </div>
                                
                                <div className="col-lg-12 col-md-12">
                                    <button className="btn btn-primary" type="submit">Create Fundraiser !</button>
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

export default Services1;