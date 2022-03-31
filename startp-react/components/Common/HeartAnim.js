import React, { useEffect, useCallback, useState, useRef} from 'react';
import * as Icon from 'react-feather';
import { useSelector, useDispatch } from 'react-redux';
import UseAnimations from 'react-useanimations';
import heart from 'react-useanimations/lib/heart'
import {getOne, updateDoc} from '../../firebase-crowdfund/queries';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import { GiConsoleController } from 'react-icons/gi';



const HeartAnim = (props) => {

  const campaign = props.campaign
  const checked = props.checked

  // const [checked, setChecked] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

    // const currentAdd = useSelector((state) => state.address)
    const currentUser = useSelector((state) => state.currentUser)
    const bbstbal = useSelector((state) => state.bbstBalance)
    const web3Instance = useSelector((state) => state.web3Instance)

    var arrayLiked = []

    useEffect(() => {
      // console.log(currentUser.eth_address)
      // setChecked(false);
      // console.log(checked);-
      // if(currentUser != undefined){
      //   arrayLiked = currentUser.liked
      //   // console.log(arrayLiked)
      //   if(arrayLiked.includes(campaign.contract_address)){
      //     setChecked(true);
      //     console.log("should be black")
      //     console.log("checked", checked)
      //   } else {
      //     setChecked(false);
      //     console.log("should be white")
      //     console.log("checked", checked);
      //   }
      // }
    }, [])


  const handleHeartClicked = () => {
    arrayLiked = currentUser.liked

    if(checked){
       setChecked(false)
       setShowModal(true)
       arrayLiked = arrayLiked.filter((e => e != campaign.contract_address))
       if(currentUser == undefined || currentUser == null){return}
        let u = currentUser;
        u.liked = arrayLiked;
        updateDoc(currentUser.eth_address, 'profile', u)

          // Change weight depending on BBST balance. Retrieve BBST balance.
          let c = campaign;
          delete c.likedTupleMap[currentUser.eth_address]
          updateDoc(campaign.contract_address, 'campaign', c)
  
    } else {
      setChecked(true)
      setShowModal(true)
      arrayLiked.push(campaign.contract_address)
      if(currentUser == undefined || currentUser == null){return}
        let u = currentUser;
        u.liked = arrayLiked;
        updateDoc(currentUser.eth_address, 'profile', u)

        // Change weight depending on BBST balance. Retrieve BBST balance.
        let c = campaign;
        let bbstamount = bbstbal === undefined ? 0 : parseInt(web3Instance.utils.fromWei(bbstbal.toString()))
        let baseLikeAmount = 10;
        let totalLikeAmount = baseLikeAmount + bbstamount / 10;
        c.likedTupleMap[currentUser.eth_address] = totalLikeAmount
        updateDoc(campaign.contract_address, 'campaign', c)

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

  const displayAnim = () => {
    console.log("rendered check", checked);
      return <>
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
  }

    return (
      displayAnim()
        // <>
        //     <UseAnimations
        //       onClick={handleHeartClicked}
        //       reverse={checked}
        //       size={40}
        //       wrapperStyle={{ marginTop: '15px', marginLeft: '20px' }}
        //       animation={heart}
        //     />
                
        //         <Rodal visible={showModal} onClose={() => setShowModal(false)}>
        //           {showTextModal()}
        //         </Rodal>
        // </>
    )
}

export default HeartAnim