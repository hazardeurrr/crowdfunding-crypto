import React from 'react';
import campaignAbi from '@/components/ContractRelated/CampaignAbi';
import { useSelector, useDispatch } from 'react-redux';
import {chain} from '@/utils/chain'
import {bnb_chain} from '@/utils/bnb_chain'
import { updateDoc, getOne } from 'firebase-crowdfund/queries';
import {db, storage} from '../../firebase-crowdfund/index'

import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from "@material-ui/lab/Alert";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import * as IconFeather from 'react-feather';
import Link from 'next/link';
import {usdcAddr} from '@/components/ContractRelated/USDCAddr';
import {bbstAddr} from '@/components/ContractRelated/BbstAddr';
import { erc20standardAbi } from '@/components/ContractRelated/ERC20standardABI';
import { bbstAbi } from '@/components/ContractRelated/BbstAbi';
import {bnb_busdAddr} from '@/components/ContractRelated/bnb_busdAddr';
import {bnb_bbstAddr} from '@/components/ContractRelated/bnb_BbstAddr';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const Withdraw = (props) => {

  const web3Instance = useSelector((state) => state.web3Instance)
  const connected = useSelector((state) => state.metamask_connected)
  const chainID = useSelector((state) => state.chainID)
  const userAddr = useSelector((state) => state.address)
  
  const campaign = props.campaign

  const [errorMsg, setErrorMsg] = React.useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [creationState, setCreationState] = React.useState(0);
  const [Tx, setTx] = React.useState("");
  const [totalBalance, setTotalBalance] = React.useState(0)
  const [ctrInstance, setCtrInstance] = React.useState(undefined)
  const [subscribers, setSubscribers] = React.useState(undefined)

    const openDialog = () => {
        setDialogOpen(true)
    }

    const closeDialog = () => {
        setDialogOpen(false)
    }

    const openSnackbar = () => {
        closeDialog()
        setSnackbarOpen(true)
    }

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false)
    }

  const withdrawMoney = () => {
      if(campaign !== undefined){
        if(connected == true && chainID == campaign.network && ctrInstance != undefined){
            //connect to Metamask and check for a refund
            //const campCtrInstance = new web3Instance.eth.Contract(campaignAbi.campaignAbi, campaign.contract_address)
            
             payCreator(ctrInstance);
        } else {
                setErrorMsg("You're not connected. Please connect to Metamask on the right network")
                openSnackbar()
            }
      }
  }

  const downloadData = () => {

    // if(campaign.tiers.length == 0) {
    //     //alert ("You didn't put any tiers in your campaign !")
    //     setErrorMsg("You didn't put any tiers in your campaign! Can't retrieve data.")
    //     openSnackbar()
    // } else {

        // const result = getTiers()

        getTokens().then(res => {
            
            let finalString = "Address,Email,Participation\n"

            
            // console.log(res)
            for(let i = 0 ; i < res.length ; ++i){
                
                finalString += res[i]
            }
            // console.log(finalString)

            let csvContent = "data:text/csv;charset=utf-8," + finalString;
    
            var encodedUri = encodeURI(csvContent);

            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", campaign.title+"_subscribers.csv");
            document.body.appendChild(link); // Required for FF

            link.click(); // This will download the data file named "tiers_subscribers.csv".

        })
    // }
  }

  function getSubsEvent(ctrInstance) {
    if(connected == true && chainID == campaign.network){
        ctrInstance.methods.creationBlock.call().call().then((cblock) =>  {
            web3Instance.eth.getBlockNumber().then((currentBlock) => {

                let allEvents = []
                
                for(let i = cblock; i < currentBlock; i += 5000) {
                    const _startBlock = i;
                    const _endBlock = Math.min(currentBlock, i + 4999);
                    ctrInstance.getPastEvents("Participation", ({fromBlock: _startBlock, toBlock: _endBlock}))
                    .then(function(events){
                        // console.log(events) // same results as the optional callback above
                        let eventsMapped = events.map(e => [e.returnValues.user.toLowerCase(), e.returnValues.indexTier])
                        // console.log(eventsMapped)
                        allEvents = [...allEvents, ...eventsMapped]
                    });
                  }
                  console.log(eventsMapped)
                  setSubscribers(eventsMapped)
            })
        })
    }
  }

  async function getTokens() {

    const getUser = subscriber => db.collection('profile').doc(subscriber).get();
    let addressesArr = []
    
    let copySubs = [...subscribers];
    let subSorted = copySubs.sort((a,b) => a[1].localeCompare(b[1]));

    for(let i = 0 ; i < subSorted.length; ++i){
        addressesArr = addressesArr.concat(subSorted[i][0].toLowerCase())
    }

    const promises = addressesArr.map(getUser);
    const users = await Promise.all(promises);
    return users.map((user, index) => user.data().eth_address + "," + nullOrMail(user.data().email) + "," + showTierExcel(subSorted[index][1]) + "\n")
  }

  const showTierExcel = (index) => {
    if (index == 0) return "Free donation"
    else return "Tier " + index + " : " + campaign.tiers[index-1].title
  }

  const nullOrMail = (v) => {
    if(v == undefined || v == null || v == ""){
        return "undefined"
    } else {
        return v
    }
  }

  

  const payCreator = (contractInstance) => {

    if(campaign.currency == "ETH" || campaign.currency == "b_BNB"){
        contractInstance.methods.payCreator()
        .send({from : userAddr, value: 0})
        .on('transactionHash', function(hash){
            openDialog()
            console.log("hash :" + hash)
            setTx(hash);

        })
        .on('confirmation', function(confirmationNumber, receipt){

            // console.log("Confirmation number:" + confirmationNumber)
        })
        .on("error", function(error) {
            setErrorMsg(error.code + " : " + error.message)
            openSnackbar()

        })
        .then(() => {
            setCreationState(1)
            //alert("Funds succesfully claimed! Thanks for using BlockBoosted!");
        })
    } else {
        contractInstance.methods.payCreatorERC20()
        .send({from : userAddr, value: 0})
        .on('transactionHash', function(hash){
            openDialog()
            console.log("hash :" + hash)
            setTx(hash);

        })
        .on('confirmation', function(confirmationNumber, receipt){

            // console.log("Confirmation number:" + confirmationNumber)
        })
        .on("error", function(error) {
            setErrorMsg(error.code + " : " + error.message)
            openSnackbar()

        })
        .then(() => {
            setCreationState(1)
            //alert("Funds succesfully claimed! Thanks for using BlockBoosted!");
        })
    }

  }


  const displayConfirmModal = (x) => {
    switch(x) {
        case 0:
            return <div style={{justifyContent:'center'}}>
            <DialogTitle id="alert-dialog-title">Waiting for confirmation...</DialogTitle>
            <DialogContent>

                <CircularProgress style={{marginTop: 20, marginBottom: 20}}/>

            <DialogContentText id="alert-dialog-description">
            Transaction Hash : </DialogContentText>
            <DialogContentText id="alert-dialog-description">{showScan()}</DialogContentText>
            </DialogContent></div>
        case 1:
            return <div style={{justifyContent:'center'}}>
            <DialogTitle id="alert-dialog-title">Withdrawal successful ! <IconFeather.Smile/></DialogTitle>
            <DialogContent>    
                <DialogContentText id="alert-dialog-description">
                <Link href={{
                            pathname: "/",
                            }}
                            >
                <a className="btn btn-primary">Back to main page</a>
                </Link>  </DialogContentText>
            <DialogContentText id="alert-dialog-description" style={{marginTop: 15}}>
            Transaction confirmed : </DialogContentText>
            <DialogContentText id="alert-dialog-description">{showScan()}</DialogContentText>
            </DialogContent></div>
        default:
            return <div style={{justifyContent:'center'}}>
            <DialogTitle id="alert-dialog-title">Waiting for confirmation...</DialogTitle>
            <DialogContent>
            
            <CircularProgress style={{marginTop: 20, marginBottom: 20}}/>
            </DialogContent></div>

    }
}

const showScan = () => {
    if(campaign !== undefined){
        if(campaign.network == chain){
            return <a href={`https://goerli.etherscan.io/tx/${Tx}`} target="_blank">{Tx}</a>
        } else if(campaign.network == bnb_chain){
            return <a href={`https://testnet.bscscan.com/tx/${Tx}`} target="_blank">{Tx}</a>
        }
    }
}



  React.useEffect(() => {
      if(web3Instance != undefined && campaign !== undefined){
        if(connected == true && chainID == campaign.network){
            //connect to Metamask and check for a refund
            const campCtrInstance = new web3Instance.eth.Contract(campaignAbi.campaignAbi, campaign.contract_address)
            setCtrInstance(campCtrInstance)
            getSubsEvent(campCtrInstance)
      //      campCtrInstance.methods.totalBalance.call().call().then(res => {setTotalBalance(res)})
            if(campaign.currency == "ETH" || campaign.currency == "b_BNB"){
                web3Instance.eth.getBalance(campaign.contract_address).then(res => {
                        setTotalBalance(res)
                    }
                )
            } else {
                let erc20Ctr = undefined
                if(campaign.currency == "USDC")
                    erc20Ctr = new web3Instance.eth.Contract(erc20standardAbi, usdcAddr)
                else if(campaign.currency == "BBST")
                    erc20Ctr = new web3Instance.eth.Contract(bbstAbi, bbstAddr)
                else if(campaign.currency == "b_BUSD")
                    erc20Ctr = new web3Instance.eth.Contract(erc20standardAbi, bnb_busdAddr)
                else if(campaign.currency == "b_BBST")
                    erc20Ctr = new web3Instance.eth.Contract(bbstAbi, bnb_bbstAddr)

                erc20Ctr.methods.balanceOf(campaign.contract_address).call().then(res => {
                    setTotalBalance(res)
                })
            }
      }
    }
  }, [web3Instance, campaign])


  const displayWithdrawBtn = () => {
    if(totalBalance > 0)
        return <button className="btn btn-primary" onClick={withdrawMoney}>Withdraw</button>

  }

  return <div>

            <Snackbar
                open={snackbarOpen}
                onClose={() => handleCloseSnackbar()}
                autoHideDuration={9000}
            >
            <Alert onClose={() => handleCloseSnackbar()} severity="error" >
                Error : {errorMsg}
            </Alert>
            </Snackbar>

            <Dialog
                open={dialogOpen}
                onClose={(_, reason) => {
                    if (reason !== "backdropClick") {
                        closeDialog();
                    }
                    }}
                
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {displayConfirmModal(creationState)}
            </Dialog>

            <h4>Your campaign has ended successfully!</h4>
            {displayWithdrawBtn()}
            <button className="btn btn-light" onClick={downloadData}>Download data</button>
        </div>
}

export default Withdraw;