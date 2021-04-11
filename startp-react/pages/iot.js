import React from 'react';
import Navbar from "@/components/_App/Navbar";
import MainBanner from '@/components/IOT/MainBanner';
import PartnerStyleTwo from '@/components/Common/PartnerStyleTwo';
import OurServices from '@/components/IOT/OurServices';
import Cta from '@/components/IOT/Cta';
import FunFactsArea from '@/components/Common/FunFactsArea';
import Features from '@/components/IOT/Features';
import TeamStyleTwo from '@/components/Common/TeamStyleTwo';
import Feedback from '@/components/Common/Feedback';
import WhyWeAreBest from '@/components/IOT/WhyWeAreBest';
import BlogPost from '@/components/Common/BlogPost';
import Footer from "@/components/_App/Footer";

const IOT = () => {
    return (
        <>
            <Navbar />
            <MainBanner />
            <PartnerStyleTwo />
            <OurServices />
            <Cta />
            <FunFactsArea />
            <Features />
            <TeamStyleTwo />
            <Feedback />
            <WhyWeAreBest />
            <BlogPost />
            <Footer />
        </>
    )
}

export default IOT;