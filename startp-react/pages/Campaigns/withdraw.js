import React from 'react';
import campaignAbi from '@/components/ContractRelated/CampaignAbi';
import { useSelector, useDispatch } from 'react-redux';
import {chain} from '@/utils/chain'
import { updateDoc, getOne } from 'firebase-crowdfund/queries';
import {db, storage} from '../../firebase-crowdfund/index'


const Withdraw = (props) => {

  const web3Instance = useSelector((state) => state.web3Instance)
  const connected = useSelector((state) => state.metamask_connected)
  const chainID = useSelector((state) => state.chainID)
  const currentUser = useSelector((state) => state.currentUser)
  
  const campaign = props.campaign

  const withdrawMoney = async() => {
    if(connected == true && chainID == chain){
        //connect to Metamask and check for a refund
        const campCtrInstance = new web3Instance.eth.Contract(campaignAbi.campaignAbi, campaign.contract_address)
        
        await payCreator(campCtrInstance);
    } else {
            handleDialogOpen()
        }
  }

  const downloadData = () => {

    if(camapign.tiers.length == 0) {
        alert ("You didn't put any tiers in your campaign !")

    } else {

        const result = getTiers();

        let csvContent = "data:text/csv;charset=utf-8," + result.map(e => e.join(",")).join("\n");

        var encodedUri = encodeURI(csvContent);
        window.open(encodedUri);
    }
  }

  const getTiers = () => {
    var tiers = new Array();

    campaign.tiers.forEach(tier => {
        var tabTier = new Array();

        for (var sub of tier.subscribers) {
            var docRef = db.collection("profile").doc(sub);

            docRef.get().then((doc) => {
                if (doc.exists) {
                    tabTier.push([doc.data().address, doc.data().email]);
                } else {
                    // doc.data() will be undefined in this case
                    console.log("No such document!");
                }
            }).catch((error) => {
                console.log("Error getting document:", error);
            });
        }

        tiers.push(tabTier);

    });

    console.log(tiers)
    
    return tiers;
  }


  const payCreator = async(contractInstance) => {
    contractInstance.methods.payCreator()
        .send({from : currentUser.eth_address, value: 0})
        .on('transactionHash', function(hash){
          //  context.openDialog()
            console.log("hash :" + hash)
         //   context.setState({ Tx: hash });

        })
        .on('confirmation', function(confirmationNumber, receipt){

            console.log("Confirmation number:" + confirmationNumber)
        })
        .on("error", function(error) {
            //     context.setState({ errorMsg: error.code + " : " + error.message})
            //     context.openSnackbar()
            console.log(error);

        })
        .then(() => {
            alert("Funds succesfully claimed! Thanks for using BlockBoosted!");
        })
  }




  React.useEffect(() => {
  }, [web3Instance])

  return <div>
            <h4>Your campaign has ended successfully!</h4>
            <button className="btn btn-primary" onClick={withdrawMoney}>Withdraw</button>
            <button className="btn btn-light" onClick={downloadData}>Download data</button>
        </div>
}

export default Withdraw;