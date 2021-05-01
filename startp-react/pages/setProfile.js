import React, { useState } from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import Link from 'next/link';
import ProfilePic from "@/components/ITStartup/ProfilePic";
import ProfileForm from "@/components/ITStartup/ProfileForm";


const SetProfile = (props) => {
    // const data = undefined;

    return (
        <>
            <Navbar />
            <PageBanner pageTitle="User Profile" />
            <ProfileForm />
            <Footer />
        </>
    )
}

export default SetProfile;