import React from 'react';
import campaignAbi from '@/components/ContractRelated/CampaignAbi';
import { useSelector, useDispatch } from 'react-redux';
import {chain} from '@/utils/chain'
import { updateDoc, getOne } from 'firebase-crowdfund/queries';
import {db, storage} from '../../firebase-crowdfund/index'
import Link from 'next/link';
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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const Refund = (props) => {

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

  const handleRefund = async() => {
    if(connected == true && chainID == chain){
        //connect to Metamask and check for a refund
        const campCtrInstance = new web3Instance.eth.Contract(campaignAbi.campaignAbi, campaign.contract_address)
            if(campaign.currency == "ETH") 
                await doRefund(campCtrInstance);
            else await doRefundERC20(campCtrInstance);
    } else {
        setErrorMsg("Error : You're not connected. Please connect to Metamask on the right network")
        openSnackbar()
        }
  }

  const doRefund = async(contractInstance) => {
    contractInstance.methods.refund()
        .send({from : userAddr, value: 0})
        .on('transactionHash', function(hash){
            openDialog()
            console.log("hash :" + hash)
            setTx(hash);

        })
        .on('confirmation', function(confirmationNumber, receipt){

            console.log("Confirmation number:" + confirmationNumber)
        })
        .on("error", function(error) {
            setErrorMsg(error.code + " : " + error.message)
            openSnackbar()
            console.log(error);

        })
        .then(() => {
            setCreationState(1)
            //alert("Refund successful");
        })
  }

  const doRefundERC20 = async(contractInstance) => {
    contractInstance.methods.refundERC20()
        .send({from : userAddr, value: 0})
        .on('transactionHash', function(hash){
            openDialog()
            console.log("hash :" + hash)
            setTx(hash);

        })
        .on('confirmation', function(confirmationNumber, receipt){

            console.log("Confirmation number:" + confirmationNumber)
        })
        .on("error", function(error) {
            setErrorMsg(error.code + " : " + error.message)
            openSnackbar()
            console.log(error);

        })
        .then(() => {
            setCreationState(1)
            //alert("Refund successful");
        })
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
              <DialogContentText id="alert-dialog-description"><a href={`https://etherscan.io/tx/${Tx}`} target="_blank">{Tx}</a></DialogContentText>
              </DialogContent></div>
          case 1:
              return <div style={{justifyContent:'center'}}>
              <DialogTitle id="alert-dialog-title">Refund successful ! <IconFeather.Smile/></DialogTitle>
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
              <DialogContentText id="alert-dialog-description"><a href={`https://etherscan.io/tx/${Tx}`} target="_blank">{Tx}</a></DialogContentText>
              </DialogContent></div>
          default:
              return <div style={{justifyContent:'center'}}>
              <DialogTitle id="alert-dialog-title">Waiting for confirmation...</DialogTitle>
              <DialogContent>
              
              <CircularProgress style={{marginTop: 20, marginBottom: 20}}/>
              </DialogContent></div>

      }
  }


  React.useEffect(() => {
  }, [web3Instance])

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
    <h6>Unfortunately, the goal of this campaign has not been reached. If you contributed to the campaign, you can ask for your refund below.</h6>
    <a className="btn btn-primary" onClick={handleRefund}>Get your refund</a>
  </div>
}

export default Refund;