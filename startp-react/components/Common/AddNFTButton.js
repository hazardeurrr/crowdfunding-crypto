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
import { GiConsoleController } from 'react-icons/gi';
import axios from 'axios';
import { bsc_explorer_base, eth_explorer_base } from '@/utils/explorers';
import { isProd } from '@/utils/isProd';
const Web3 = require('web3');

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const AddNFTButton = (props) => {

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
  const [ctrInstance, setCtrInstance] = React.useState(undefined)
  const [showNFTs, setShowNFTs] = React.useState(false)


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

    const handleAddNFTClick = () => {
        setShowNFTs(true)
    }

const payCreator = (contractInstance) => {

    if(campaign.currency == "ETH" || campaign.currency == "b_BNB"){
        contractInstance.methods.payCreator()
        .send({from : userAddr, value: 0})
        .on('transactionHash', function(hash){
            openDialog()
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
            <DialogTitle id="alert-dialog-title">Transaction confirmed ✔️</DialogTitle>
            <DialogContent style={{textAlign:'center', marginTop: 15}}>    
            <h5>Withdrawal complete 🎉</h5><p>Thank you for choosing BlockBoosted 💚</p>
                    <Link style={{marginTop: 25}} href="/"><Button
                        style={{backgroundColor: 'black', color:'white'}}
                        variant="contained"
                        >Back to main page
                        </Button></Link>
            <DialogContentText id="alert-dialog-description" style={{marginTop: 35, textAlign:'left'}}>
            Transaction confirmed : </DialogContentText>
            <DialogContentText id="alert-dialog-description" style={{textAlign:'left'}}>{showScan()}</DialogContentText>
            </DialogContent>

            </div>
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
            return <a className="responsiveLinkTx" href={`https://${eth_explorer_base}/tx/${Tx}`} target="_blank">{Tx}</a>
        } else if(campaign.network == bnb_chain){
            return <a className="responsiveLinkTx" href={`https://${bsc_explorer_base}/tx/${Tx}`} target="_blank">{Tx}</a>
        }
    }
}



  React.useEffect(() => {
    // setDataState(0)

      if(web3Instance != undefined && campaign !== undefined){
        if(connected == true && chainID == campaign.network){
            //connect to Metamask and check for a refund
            const campCtrInstance = new web3Instance.eth.Contract(campaignAbi.campaignAbi, campaign.contract_address)
            setCtrInstance(campCtrInstance)
      }
    }
  }, [web3Instance, campaign])


  const displayWithdrawBtn = () => {
        return <button onClick={handleAddNFTClick}>Add NFTs to sell</button>
  }

  const displayBtnsOrNot = () => {
    if(ctrInstance != undefined && ctrInstance != null && campaign.network == chainID && connected){
        return <div style={{marginTop:10, marginBottom: 15}}>{displayWithdrawBtn()}</div>
    }
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
                className='dialogResponsive'
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

            {displayBtnsOrNot()}
        </div>
}

export default AddNFTButton;