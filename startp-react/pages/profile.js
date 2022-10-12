import React, { useState } from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import Link from 'next/link';
import ProfilePic from "@/components/ITStartup/ProfilePic";
import ProfileForm from "@/components/ITStartup/ProfileForm";
import { useSelector, useDispatch } from 'react-redux'
import {chain} from '@/utils/chain'
import {bnb_chain} from '@/utils/bnb_chain'


const SetProfile = (props) => {
    // const data = undefined;

    const addr = useSelector((state) => state.address)
    const connected = useSelector((state) => state.metamask_connected)
    const chainID = useSelector((state) => state.chainID)
    const currentUser = useSelector((state) => state.currentUser)

    const [open, setOpen] = React.useState(false);

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const showForm = (amount) => {
        if(connected == true && (chainID == chain || chainID == bnb_chain)){
            return <>
            <PageBanner pageTitle="User Profile" />
            <ProfileForm currentUser={currentUser}/>
            </>
        } else {
            return <div><PageBanner pageTitle="You are not connected"/>
             <div className="container">
                <div className="section-title">
                    <br/><br/>
                    <h2>Please connect your wallet</h2>
                    <br/>
                    <div className="bar"></div>
                    <br/>
                    <p>To access this feature, please connect your wallet and ensure you are connected to a supported network.</p>
                </div>
            </div>
            </div>
        }
    }

    return (
        <>
            {/* <Navbar /> */}
            {showForm()}
            <Footer />
        </>
    )
}

export default SetProfile;