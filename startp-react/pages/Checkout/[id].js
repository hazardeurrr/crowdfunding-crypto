import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import PricingTiers from '@/components/Common/PricingTiers';
import projectList from '@/utils/projectList';

 
const DonationCheckout = (props) => {

    const campaign = projectList.find(e => e.contract_address == props.address)
    console.log("Campaign : " + campaign)


    return (
        <>
            <Navbar />

            <PageBanner pageTitle = "You are supporting :"/>

            <PricingTiers project = {campaign} />

            <Footer />
        </>
    )
}

export default DonationCheckout;

export async function getServerSideProps (context) {
    console.log(context.query) 
    // returns { id: episode.itunes.episode, title: episode.title}
    
  
    //you can make DB queries using the data in context.query
    return {
        props: { 
           address: context.query.id //pass it to the page props
        }
    }
  }