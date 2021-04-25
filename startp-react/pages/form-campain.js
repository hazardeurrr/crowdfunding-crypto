import React from 'react';
import Navbar from "@/components/_App/Navbar";
import MainForm from "@/components/FormCampain/mainForm"
import BlogPost from '@/components/Common/BlogPost';
import Footer from "@/components/_App/Footer";

const FormCampain = () => {
    return (
        <>
            <Navbar />
            <MainForm/>
            <BlogPost/>
            <Footer />
        </>
    )
}

export default FormCampain;