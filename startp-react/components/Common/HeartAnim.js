import React, { useEffect } from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner'; 
import * as Icon from 'react-feather';
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
import {getOne, updateDoc} from '../../firebase-crowdfund/queries';



const HeartAnim = (props) => {

  const campaign = props.campaign

  const [checked, setChecked] = React.useState(false);

    // const currentAdd = useSelector((state) => state.address)
    const currentUser = useSelector((state) => state.currentUser)


    var arrayLiked = []


    useEffect(() => {
      console.log(currentUser)
      if(currentUser != undefined){
        arrayLiked = currentUser.liked
        console.log(arrayLiked)
        if(arrayLiked.includes(campaign.contract_address)){
          setChecked(true)
        }
      }
    }, [])


  const handleHeartClicked = () => {
    console.log('clicked in heart')
    if(checked){
       setChecked(false)
       arrayLiked = arrayLiked.filter(e => e != campaign.contract_address)
       if(currentUser == undefined || currentUser == null){return}
        let u = currentUser;
        u.liked = arrayLiked;
        updateDoc(currentUser.eth_address, 'profile', u, console.log)
    } else {
      setChecked(true)
      arrayLiked.push(campaign.contract_address)
      if(currentUser == undefined || currentUser == null){return}
        let u = currentUser;
        u.liked = arrayLiked;
        updateDoc(currentUser.eth_address, 'profile', u, console.log)
    }
  }


    return (
        <>
            <UseAnimations
              onClick={handleHeartClicked}
              reverse={checked}
              size={40}
              wrapperStyle={{ marginTop: '15px', marginLeft: '20px' }}
              animation={heart}
            />

        </>
    )
}

export default HeartAnim