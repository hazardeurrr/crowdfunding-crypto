import React, { useEffect, useCallback, useState, useRef} from 'react';
import * as Icon from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';
import UseAnimations from 'react-useanimations';
import heart from 'react-useanimations/lib/heart'
import {getOne, updateDoc} from '../../firebase-crowdfund/queries';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { GiConsoleController } from 'react-icons/gi';
import CircularProgress from '@material-ui/core/CircularProgress';
import {chain} from '@/utils/chain'
import {bnb_chain} from '@/utils/bnb_chain'
import {db} from '../../firebase-crowdfund/index'
import firebase from 'firebase/app';
import { campaignsCollection } from '@/utils/collections';

const HeartAnim = (props) => {

  const campaign = props.campaign

  const [checked, setChecked] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

    // const currentAdd = useSelector((state) => state.address)
    const currentUser = useSelector((state) => state.currentUser)
    const bbstbal = useSelector((state) => state.bbstBalance)
    const web3Instance = useSelector((state) => state.web3Instance)
    const ethaddress = useSelector((state) => state.address)

    const dispatch = useDispatch()

    const getNetworkPrefix = () => {
      if(campaign.network == bnb_chain){
        return "bnb_"
      } else if (campaign.network == chain){
        return "eth_"
      }
    }

    let documentAddress = getNetworkPrefix() + campaign.contract_address


    var arrayLiked = []

    useEffect(() => {
      //setShowModal(false)
      if(currentUser != undefined){
        arrayLiked = currentUser.liked
        // console.log(arrayLiked)
        if(arrayLiked.includes(documentAddress)){
          setChecked(true);
          
        } else {
          setChecked(false);
        }
      }
    }, [currentUser])

  // const updateProfile = (usr) => {

  //   const user = usr;
  //   const privacy = undefined;

  //   axios({
  //       method: 'post',
  //       url: 'https://europe-west1-crowdfunding-dev-5f802.cloudfunctions.net/updateProfile',
  //       data: {
  //           profile: user,
  //           privacy: privacy
  //       }
  //   }).then(async(response) => {
  //       console.log(response.data);
  //   }).catch(console.log);
  // }

  const handleHeartClicked = () => {
    arrayLiked = currentUser.liked

    if(checked){
       setChecked(false)
       setShowModal(true)
       arrayLiked = arrayLiked.filter((e => e != documentAddress))
       let newUser = currentUser
       newUser.liked = arrayLiked
       dispatch({
        type: 'SET_CURRENT_USER',
        id: newUser
      })
       if(currentUser == undefined || currentUser == null){return}
        
        // updateDoc(currentUser.eth_address, 'profile', u)
        db.collection("profile").doc(currentUser.eth_address).update({"liked": firebase.firestore.FieldValue.arrayRemove(documentAddress)})


          // Change weight depending on BBST balance. Retrieve BBST balance.
          // let c = campaign;
          // delete c.likedTupleMap[currentUser.eth_address]
          // updateDoc(documentAddress, 'campaignsBNBTest', c)
          db.collection(campaignsCollection).doc(documentAddress).update("like_score", firebase.firestore.FieldValue.increment(-1))

  
    } else {
      setChecked(true)
      setShowModal(true)
      arrayLiked.push(documentAddress)
      let newUser = currentUser
      newUser.liked = arrayLiked
      dispatch({
       type: 'SET_CURRENT_USER',
       id: newUser
     })
      if(currentUser == undefined || currentUser == null){return}
        // let u = currentUser;
        // u.liked = arrayLiked;
        // updateDoc(currentUser.eth_address, 'profile', u)
        db.collection("profile").doc(currentUser.eth_address).update({ "liked": firebase.firestore.FieldValue.arrayUnion(documentAddress)})

        // Change weight depending on BBST balance. Retrieve BBST balance.
        // let c = campaign;
        // let bbstamount = bbstbal === undefined ? 0 : parseInt(web3Instance.utils.fromWei(bbstbal.toString()))
        // let baseLikeAmount = 10;
        // let totalLikeAmount = baseLikeAmount + bbstamount / 10;
        // c.likedTupleMap[currentUser.eth_address] = totalLikeAmount
        // updateDoc(documentAddress, 'campaignsBNBTest', c)

        db.collection(campaignsCollection).doc(documentAddress).update("like_score", firebase.firestore.FieldValue.increment(1))


        // CHANGER ARRAY PAR UNE MAP
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

  const displayHeart = () => {
    if(!checked){
      return <button style={{border: "none", background:"none", outline:"none"}} onClick={handleHeartClicked}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6.28 3c3.236.001 4.973 3.491 5.72 5.031.75-1.547 2.469-5.021 5.726-5.021 2.058 0 4.274 1.309 4.274 4.182 0 3.442-4.744 7.851-10 13-5.258-5.151-10-9.559-10-13 0-2.676 1.965-4.193 4.28-4.192zm.001-2c-3.183 0-6.281 2.187-6.281 6.192 0 4.661 5.57 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-4.011-3.097-6.182-6.274-6.182-2.204 0-4.446 1.042-5.726 3.238-1.285-2.206-3.522-3.248-5.719-3.248z"/></svg></button>
    } else {
      return <button style={{border: "none", background:"none", outline:"none"}} onClick={handleHeartClicked}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 4.435c-1.989-5.399-12-4.597-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.118-10-8.999-12-3.568z"/></svg></button>

    }
  }

  const displayAnim = () => {
    if(currentUser !== undefined){
      if(ethaddress === currentUser.eth_address){ 
        return <div style={{marginLeft: 25, marginTop: 20}}>
                  {displayHeart()}
                  <Rodal visible={showModal} onClose={() => setShowModal(false)}>
                    {showTextModal()}
                  </Rodal>
          </div>
      } else {
        if(showModal){
          setShowModal(false)
        }
        return <div style={{marginLeft: 25, marginTop: 15}}>
          <CircularProgress size={35} thickness={3} color="inherit" />
        </div>
        }
    } else {
      return <div style={{marginLeft: 25, marginTop: 15}}>
      <CircularProgress size={35} thickness={3} color="inherit" />
    </div>
    }
    // return null
  }

  const showProgress = () => {
    
  }

    return (
      displayAnim()
    )
}

export default HeartAnim