import React from 'react';
import Navbar from "@/components/_App/Navbar";
import MainBannerCrea from "@/components/MachineLearning/MainBannerCrea";
import Footer from "@/components/_App/Footer";
import CategoriesLight from "@/components/ITStartup/CategoriesLight";
import ProjectGridMain from "@/components/ITStartup/ProjectGridMain";
import DiscoverArea from '@/components/ITStartup/DiscoverArea';
import Partner from '@/components/Common/Partner';
import CarouselCrea from '@/components/ITStartup/CarouselCrea';
import ProjectGridMainCrea from '@/components/ITStartup/ProjectGridMainCrea';


const ITStartup = () => {
    return (
        <>
            {/* <Navbar /> */}
            <MainBannerCrea />
            {/* <Features /> */}
            <CarouselCrea/>
            <CategoriesLight />
            <ProjectGridMainCrea />
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