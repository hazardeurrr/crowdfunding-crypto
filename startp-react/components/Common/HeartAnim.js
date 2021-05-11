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
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';



const HeartAnim = (props) => {

  const campaign = props.campaign

  const [checked, setChecked] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

    // const currentAdd = useSelector((state) => state.address)
    const currentUser = useSelector((state) => state.currentUser)


    var arrayLiked = []


    useEffect(() => {
      if(currentUser != undefined){
        arrayLiked = currentUser.liked
        console.log(arrayLiked)
        if(arrayLiked.includes(campaign.contract_address)){
          setChecked(true)
        }
      }
    }, [])


  const handleHeartClicked = () => {
    arrayLiked = currentUser.liked

    if(checked){
       setChecked(false)
       setShowModal(true)
       arrayLiked = arrayLiked.filter(e => e != campaign.contract_address)
       if(currentUser == undefined || currentUser == null){return}
        let u = currentUser;
        u.liked = arrayLiked;
        updateDoc(currentUser.eth_address, 'profile', u, console.log)
    } else {
      setChecked(true)
      setShowModal(true)
      arrayLiked.push(campaign.contract_address)
      if(currentUser == undefined || currentUser == null){return}
        let u = currentUser;
        u.liked = arrayLiked;
        updateDoc(currentUser.eth_address, 'profile', u, console.log)
    }
  }

  const showTextModal = () => {
    if(checked){
      return <div style={{marginTop: 20}}><h5>The campaign : <i><b>{campaign.title}</b></i> has been added to your favorites ! <Icon.Heart /></h5>
        <br></br><p>You can see your followed campaigns on your profile page.</p>
      </div>
    } else {
      return <div style={{marginTop:50}}><h5>The campaign : <i><b>{campaign.title}</b></i> has been withdrawn from your favorites. <Icon.Frown/></h5>
      </div>
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
                
                <Rodal visible={showModal} onClose={() => setShowModal(false)}>
                  {showTextModal()}
                </Rodal>
        </>
    )
}

export default HeartAnim