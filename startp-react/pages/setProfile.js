import React, { useState } from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import Link from 'next/link';
import ProfilePic from "@/components/ITStartup/ProfilePic";
import ProfileForm from "@/components/ITStartup/ProfileForm";
import { useSelector, useDispatch } from 'react-redux'


const SetProfile = (props) => {
    // const data = undefined;

    const addr = useSelector((state) => state.address)

    return (
        <>
            <Navbar />
            <PageBanner pageTitle="User Profile" />
            <ProfileForm address={addr}/>
            <Footer />
        </>
    )
}

export default SetProfile;