import React from 'react';
import Navbar from "@/components/_App/Navbar";
import MainBanner from "@/components/MachineLearning/MainBanner";
import Footer from "@/components/_App/Footer";
import CategoriesLight from "@/components/ITStartup/CategoriesLight";
import ProjectGridMain from "@/components/ITStartup/ProjectGridMain";
import DiscoverArea from '@/components/ITStartup/DiscoverArea';
import FeaturedProjectCarrousel from '@/components/ITStartup/FeaturedProjectCarrousel';
import Partner from '@/components/Common/Partner';


const ITStartup = () => {
    return (
        <>
            {/* <Navbar /> */}
            <MainBanner />
            {/* <Features /> */}
            {/* <FeaturedProjectCarrousel/> */}
            <CategoriesLight />
            <ProjectGridMain />
            {/* <Partner /> */}

            <DiscoverArea />
            {/* <ServicesArea />
            <OurFeatures />
            <Team />
            <FunFactsArea />
            <RecentWorks />
            <PricingStyleOne />
            <Partner /> */}
            {/* <CategoriesMainPage /> */}

            <Footer />
        </>
    )
}

export default ITStartup;