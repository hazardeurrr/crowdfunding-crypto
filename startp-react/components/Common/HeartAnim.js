import React, { useEffect } from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner'; 
import * as Icon from 'react-feather';
import projectList from '@/utils/projectList'
import Parser from 'html-react-parser';
import Link from '@/utils/ActiveLink'
import ProgressBar from 'react-bootstrap/ProgressBar';
import CampaignSidebar from '@/components/Blog/CampaignSidebar';
import categoryList from '@/utils/CategoryList';
import usersListJson from '@/utils/usersListJson';
import VerifTooltip from '@/components/Common/VerifTooltip';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import FlexibleTooltip from '@/components/Common/FlexibleTooltip';
import ShareIcons from '@/components/Common/ShareIcons';
import UseAnimations from 'react-useanimations';
import heart from 'react-useanimations/lib/heart'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';



const HeartAnim = (props) => {

  const campaign = props.campaign

  const [checked, setChecked] = React.useState(false);
  const [snackText, setSnackText] = React.useState("");
  const [openSnack, setOpenSnack] = React.useState(false);

    const currentAdd = useSelector((state) => state.address)

  const handleHeartClicked = () => {
   // if(checked){
     //   setSnackText(`The campaign has been withdrawn from your favorites !`)
//    } else {
      //  setSnackText(`The campaign has been added to your favorites !`)
  //  }
   // setOpenSnack(true)
    // ajouter à la lise des favoris dans la bdd
}

    const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

  //  setOpenSnack(false);
    };
  

    return (
        <>
            <UseAnimations
              onClick={handleHeartClicked}
              size={40}
              wrapperStyle={{ marginTop: '15px', marginLeft: '20px' }}
              animation={heart}
            />


                      <Snackbar
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                        }}
                        open={openSnack}
                        autoHideDuration={2000}
                        onClose={handleCloseSnack}
                        message={snackText}
                        action={
                        <React.Fragment>                
                            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnack}>
                            <CloseIcon fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                        }
                    />

        </>
    )
}

export default HeartAnim