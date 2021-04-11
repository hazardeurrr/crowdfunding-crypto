import React from 'react';
import NavbarStyleSix from "@/components/_App/NavbarStyleSix";
import MainBanner from '@/components/DigitalAgencyPortfolio/MainBanner';
import Projects from '@/components/DigitalAgencyPortfolio/Projects';
import AboutUsContent from '@/components/DigitalAgencyPortfolio/AboutUsContent';
import FeedbackStyleFive from '@/components/Common/FeedbackStyleFive';
import Partner from '@/components/DigitalAgencyPortfolio/Partner';
import BlogPostStyleThree from '@/components/Common/BlogPostStyleThree';
import CreativeArea from '@/components/DigitalAgencyPortfolio/CreativeArea';
import Footer from "@/components/_App/Footer";

const DigitalAgencyPortfolio = () => {
    return (
        <>
            <NavbarStyleSix />
            <MainBanner />
            <Projects />
            <AboutUsContent />
            <FeedbackStyleFive />
            <Partner />
            <BlogPostStyleThree />
            <CreativeArea />
            <Footer />
        </>
    )
}

export default DigitalAgencyPortfolio;