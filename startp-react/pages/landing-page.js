import React from 'react';
import MainBanner from "@/components/Landing/MainBanner";
import OurFeatures from "@/components/Landing/OurFeatures";
import ServicesArea from "@/components/Landing/ServicesArea";
import Team from "@/components/Common/Team";
import Footer from "@/components/Landing/Footer";
import NavbarStyleTwo from '@/components/_App/NavbarStyleTwo';
import Newsletter from '@/components/Common/Newsletter';
import Roadmap from '@/components/Common/Roadmap'
import FunFactsArea from '@/components/Common/FunFactsArea';
import Partner from '@/components/Common/Partner';
import DiscoverArea from '@/components/ITStartup/DiscoverArea';
import RecentWorks from '@/components/Common/RecentWorks';
import CreateDeleteBtn from '@/components/Common/CreateDeleteBtn';
import ImgAndTxt from '@/components/Common/ImgAndTxt';
import ImgAndTxtDonate from '@/components/Common/ImgAndTxtDonate';
const LandingPage = () => {
    return (
        <>
            <NavbarStyleTwo />
            <MainBanner />
            <FunFactsArea />
            <ImgAndTxt />
            {/* <ImgAndTxtDonate /> */}
            <Partner />

            <OurFeatures />


            {/* <Partner /> */}
            {/* <ServicesArea /> */}
            <Roadmap />
            {/* <RecentWorks />
            <DiscoverArea /> */}
            {/* <Team /> */}
            {/* <FunFactsArea /> */}
            <Newsletter />
            <Footer />
        </>
    )
}

export default LandingPage;