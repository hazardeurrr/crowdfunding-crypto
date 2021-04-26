import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import Link from 'next/link';
import HTMLEditor from '@/components/Common/HTMLEditor';
import * as Icon from 'react-feather';
import "react-dates/initialize";
import DatePicker from "./date-range";
import ImageUploading from 'react-images-uploading';

import "react-dates/lib/css/_datepicker.css";



const SetProfile = () => {
    const [images, setImages] = React.useState([]);
    const maxNumber = 1;
    const onChange = (imageList, addUpdateIndex) => {
        // data for submit
        // console.log(imageList, addUpdateIndex);
        setImages(imageList);
    };

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
                                    <ImageUploading
                                        multiple="false"
                                        value={images}
                                        onChange={onChange}
                                        maxNumber={maxNumber}
                                        dataURLKey="data_url"
                                    >
                                        {({
                                        imageList,
                                        onImageUpload,
                                        onImageUpdate,
                                        onImageRemove,
                                        isDragging,
                                        dragProps
                                        }) => (
                                        // write your building UI
                                        <div className="upload__image-wrapper">
                                            <button className="btn btn-light"
                                            style={isDragging ? { color: "red" } : null}
                                            onClick={onImageUpload}
                                            {...dragProps}
                                            >
                                            Click or Drop here
                                            </button>
                                            {/* &nbsp; */}
                                            {imageList.map((image, index) => (
                                            <div key={index} className="image-item">
                                                <img src={image.data_url} alt="" width="100" />
                                                <div className="image-item__btn-wrapper">
                                                <button className="btn btn-primary" onClick={() => onImageUpdate(index)}>Update</button>
                                                <button className="btn btn-primary" onClick={() => onImageRemove(index)}>Remove</button>
                                                </div>
                                            </div>
                                            ))}
                                        </div>
                                        )}
                                    </ImageUploading>
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
                                    <button className="btn btn-primary" type="submit" >Update Profile</button>
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