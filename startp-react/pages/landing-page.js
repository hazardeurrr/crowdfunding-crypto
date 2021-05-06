import React from 'react';
import Navbar from "@/components/_App/Navbar";
import MainBanner from "@/components/Landing/MainBanner";
import Features from "@/components/ITStartup/Features";
import OurFeatures from "@/components/Landing/OurFeatures";
import ServicesArea from "@/components/Landing/ServicesArea";
import Team from "@/components/Common/Team";
import FunFactsArea from "@/components/Common/FunFactsArea";
import RecentWorks from "@/components/Common/RecentWorks";
import PricingStyleOne from "@/components/PricingPlans/PricingStyleOne";
import Feedback from "@/components/Common/Feedback";
import BlogPost from "@/components/Common/BlogPost";
import Footer from "@/components/_App/Footer";
import CategoriesMainPage from "@/components/ITStartup/CategoriesMainPage";
import CategoriesLight from "@/components/ITStartup/CategoriesLight";
import ProjectGridMain from "@/components/ITStartup/ProjectGridMain";
import DiscoverArea from '@/components/ITStartup/DiscoverArea';
import FeaturedProjectCarrousel from '@/components/ITStartup/FeaturedProjectCarrousel';
import NavbarStyleTwo from '@/components/_App/NavbarStyleTwo';
import Partner from '@/components/Landing/Partner';
import Newsletter from '@/components/Common/Newsletter';
import Roadmap from '@/components/Common/Roadmap'

const LandingPage = () => {
    return (
        <>
            <NavbarStyleTwo />
            <MainBanner />
            <Partner />
            <OurFeatures />
            <ServicesArea />
            <Roadmap />
            <Team />
            <FunFactsArea />
            <RecentWorks />
            <Feedback />
            <Newsletter />
            <Footer />
        </>
    )
}

export default LandingPage;