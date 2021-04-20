import React from 'react';
import Navbar from "@/components/_App/Navbar";
import MainBanner from "@/components/ITStartup/MainBanner";
import Features from "@/components/ITStartup/Features";
import OurFeatures from "@/components/ITStartup/OurFeatures";
import ServicesArea from "@/components/ITStartup/ServicesArea";
import Team from "@/components/Common/Team";
import FunFactsArea from "@/components/Common/FunFactsArea";
import RecentWorks from "@/components/Common/RecentWorks";
import PricingStyleOne from "@/components/PricingPlans/PricingStyleOne";
import Feedback from "@/components/Common/Feedback";
import Partner from "@/components/Common/Partner";
import BlogPost from "@/components/Common/BlogPost";
import Footer from "@/components/_App/Footer";
import CategoriesMainPage from "@/components/ITStartup/CategoriesMainPage";
import CategoriesLight from "@/components/ITStartup/CategoriesLight";
import ProjectGridMain from "@/components/ITStartup/ProjectGridMain";
import DiscoverArea from '@/components/ITStartup/DiscoverArea';


const ITStartup = () => {
    return (
        <>
            <Navbar />
            <MainBanner />
            <Features />

            <CategoriesLight />
            <ProjectGridMain />
            <DiscoverArea />
            {/* <ServicesArea />
            <OurFeatures />
            <Team />
            <FunFactsArea />
            <RecentWorks />
            <PricingStyleOne />
            <Feedback />
            <Partner /> */}
            {/* <BlogPost /> */}
            {/* <CategoriesMainPage /> */}

            <Footer />
        </>
    )
}

export default ITStartup;