import React, { useEffect } from 'react';
import Navbar from "@/components/_App/Navbar";
import MainForm from "@/components/FormCampain/mainForm"
import BlogPost from '@/components/Common/BlogPost';
import Footer from "@/components/_App/Footer";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import PageBanner from '@/components/Common/PageBanner';

const FormCampaign = () => {

    const connected = useSelector((state) => state.metamask_connected)
    const chainID = useSelector((state) => state.chainID)

    const [open, setOpen] = React.useState(false);

    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const ethadress = useSelector((state) => state.address)

    const showForm = (amount) => {
        if(connected == true && chainID == '0x1'){
            return <MainForm address = {ethadress}/>
        } else {
            return <div><PageBanner pageTitle="You are not connected"/>
             <div className="container">
                <div className="section-title">
                    <h2>Please connect to Metamask</h2>
                    <div className="bar"></div>
                    <p>To access this feature, please connect to Metamask and ensure you are connected to Ethereum Mainnet network on the Metamask tab.</p>
                </div>
            </div>
            </div>
        }
    }

    return (
        <>
            <Navbar />
            {showForm()}
            <Footer />
        </>
    )
}

export default FormCampaign;