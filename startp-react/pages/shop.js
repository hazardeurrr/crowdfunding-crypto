import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import ProductCard from '@/components/Shop/ProductCard';
 
const Shop = () => {
    return (
        <>
            <Navbar />

            <PageBanner pageTitle="Products" /> 

            <ProductCard />
 
            <Footer />
        </>
    )
}

export default Shop;