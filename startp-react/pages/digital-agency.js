import React from 'react';
import NavbarStyleFive from "@/components/_App/NavbarStyleFive";
import MainBanner from "@/components/DigitalAgency/MainBanner";
import WhatWeOffer from '@/components/DigitalAgency/WhatWeOffer';
import AboutUsContent from '@/components/DigitalAgency/AboutUsContent';
import OurServices from '@/components/DigitalAgency/OurServices';
import DigitalAgencyFunFacts from '@/components/DigitalAgency/DigitalAgencyFunFacts';
import Projects from '@/components/DigitalAgency/Projects';
import PricingStyleThree from '@/components/PricingPlans/PricingStyleThree';
import FeedbackStyleThree from '@/components/Common/FeedbackStyleThree';
import BlogPostStyleTwo from '@/components/Common/BlogPostStyleTwo';
import CTAStyleTwo from '@/components/Common/CTAStyleTwo';
import Footer from "@/components/_App/Footer";

const DigitalAgency = () => {
    return (
        <>
            <NavbarStyleFive />
            <MainBanner />
            <WhatWeOffer />
            <AboutUsContent />
            <OurServices />
            <DigitalAgencyFunFacts />
            <Projects />
            <PricingStyleThree />
            <FeedbackStyleThree />
            <BlogPostStyleTwo />
            <CTAStyleTwo />
            <Footer />
        </>
    )
}

export default DigitalAgency;