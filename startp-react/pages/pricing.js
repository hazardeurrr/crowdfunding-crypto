import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import PricingStyleOne from '@/components/PricingPlans/PricingStyleOne';
import PricingStyleTwo from '@/components/PricingPlans/PricingStyleTwo';
import PricingStyleFour from '@/components/PricingPlans/PricingStyleFour'; 
 
const Pricing = () => {
    return (
        <>
            <Navbar />

            <PageBanner pageTitle="Pricing" />

            <PricingStyleOne />

            <PricingStyleTwo />

            <div className="pt-80">
                <PricingStyleFour />
            </div> 

            <Footer />
        </>
    )
}

export default Pricing;