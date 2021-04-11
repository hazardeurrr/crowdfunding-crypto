import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import OurFeatures from '@/components/Features/OurFeatures';
import SingleFeatures from '@/components/Features/SingleFeatures';
 
const Features = () => {
    return (
        <>
            <Navbar />

            <PageBanner pageTitle="Features" />

            <OurFeatures />

            <SingleFeatures />
 
            <Footer />
        </>
    )
}

export default Features;