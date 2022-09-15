import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Link from 'next/link';
import CardActionArea from '@material-ui/core/CardActionArea';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from "@material-ui/lab/Alert";
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux'
import {bnb_chain} from '@/utils/bnb_chain'
import {rewardAbi} from '@/components/ContractRelated/RewardABI';
import {rewardAddr} from '@/components/ContractRelated/RewardAddr';
import {bnb_rewardAbi} from '@/components/ContractRelated/bnb_RewardABI';
import {bnb_rewardAddr} from '@/components/ContractRelated/bnb_RewardAddr';
import * as IconFeather from 'react-feather';
import axios from 'axios';
import secrets from "../../../startp-react/secrets.json";
import {db, firebase} from '../../firebase-crowdfund/index'
import { GiConsoleController } from 'react-icons/gi';

// Required for side-effects
require("firebase/functions");

// import dotenv from 'dotenv';
// dotenv.config();

const REACT_APP_LINK_TO_SIG = secrets.link_to_sig;

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CardToken = () => {

  const connected = useSelector((state) => state.metamask_connected)
  const chainID = useSelector((state) => state.chainID)
  const address = useSelector((state) => state.address)
  const bbstbal = useSelector((state) => state.bbstBalance)
  const web3Instance = useSelector((state) => state.web3Instance)
  const bnb_web3Instance = useSelector((state) => state.bnb_web3Instance)
  const eth_web3Instance = useSelector((state) => state.eth_web3Instance)

  const [toBeClaimed, setToBeClaimed] = React.useState(0)
  const [bnb_contract, setBnbContract] = React.useState(undefined)
  // const [polyRewardCtr, setPolyRewardCtr] = React.useState(undefined)
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [creationState, setCreationState] = React.useState(0);
  const [Tx, setTx] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    if(web3Instance != undefined && connected && chainID == bnb_chain){
      var bnb_ctr = new web3Instance.eth.Contract(bnb_rewardAbi, bnb_rewardAddr);
      setBnbContract(bnb_ctr);
      setToBeClaimed(0);
      getClaim(bnb_ctr);
    }
  }, [web3Instance])

  const getClaim = async(ctr) => {
    ctr.methods.getClaim(address).call().then((nb) => setToBeClaimed(parseFloat(web3Instance.utils.fromWei(nb))))
  }

  const claimTokens = async() => {
    bnb_contract.methods.claimTokens().send({from : address, value: 0})
    .on('transactionHash', function(hash){
      setCreationState(0)

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
        
    }).catch(() => {
        console.log("error in the transac")
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
            <DialogContentText id="alert-dialog-description"><a className="responsiveLinkTx" href={`https://testnet.bscscan.com/tx/${Tx}`} target="_blank">{Tx}</a></DialogContentText>
            </DialogContent></div>
        case 1:
            return <div style={{justifyContent:'center'}}>
            <DialogTitle id="alert-dialog-title">Claim successfull ! <IconFeather.Heart/></DialogTitle>
            <DialogContent>
            <div style={{display: 'flex', justifyContent:'center', flexDirection:'column'}}>
                    <div style={{justifyContent:'center'}}>
                        <Link href={{
                            pathname: "/",
                            }}
                            >
                        <a className="btn btn-primary">Back to Main page</a>
                        </Link>  
                    </div>
                </div> 
            <DialogContentText id="alert-dialog-description" style={{marginTop: 15}}>
            Transaction confirmed : </DialogContentText>
            <DialogContentText id="alert-dialog-description"><a className="responsiveLinkTx" href={`https://testnet.bscscan.com/tx/${Tx}`} target="_blank">{Tx}</a></DialogContentText>
            </DialogContent></div>

        case 2:
          return <div style={{justifyContent:'center'}}>
          <DialogTitle id="alert-dialog-title">Accessing Web3...</DialogTitle>
          <DialogContent>

            <CircularProgress style={{marginTop: 20, marginBottom: 20}}/>
            <DialogContentText id="alert-dialog-description" style={{marginTop: 15}}>
            Please confirm the transaction on your wallet to withdraw your BBST</DialogContentText>
          </DialogContent></div>
       
        default:
            return <div style={{justifyContent:'center'}}>
            <DialogTitle id="alert-dialog-title">Waiting for confirmation...</DialogTitle>
            <DialogContent>
            
            <CircularProgress style={{marginTop: 20, marginBottom: 20}}/>
            </DialogContent></div>

    }
}

const showBalance = () => {
    if(web3Instance != undefined)
      return parseFloat(parseFloat(web3Instance.utils.fromWei(bbstbal.toString())).toFixed(6))
  }

  const openSnackbar = () => {
    closeDialog()
    setSnackbarOpen(true)
}

const handleCloseSnackbar = () => {
    setSnackbarOpen(false)
}


const openDialog = () => {
    setDialogOpen(true)
}

const closeDialog = () => {
    setDialogOpen(false)
}

  const displayCardContent = () => {
    if(connected && address != undefined && chainID == bnb_chain){
      return <>
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

        <Card elevation={3} style={{marginTop: 50, borderRadius: 10}}>
      <div style={{display:'flex', alignItems:'center'}}>
        <div style={{flex : 2}}>
          <CardContent>

            <Typography  variant='subtitle1' color="textSecondary" gutterBottom>
               Current balance
            </Typography>
            
              <Typography display="inline" component="h5" variant="h5" >
              {showBalance()} BBST
              </Typography>
          </CardContent>
        </div>

        <div style={{flex : 2}}>
          <CardContent>

          <Typography variant='subtitle1' color="textSecondary" gutterBottom>
              Available for claim
            </Typography>
            
            <Typography display="inline" component="h5" variant="h5">
                {toBeClaimed} BBST
              </Typography>
          </CardContent>
        </div>

        <div style={{flex : 2}}>
          <CardContent>
              <button hidden={toBeClaimed <= 0} className="btn btn-primary" onClick={() => claimTokens()}>Claim</button>
          </CardContent>
        </div>
      </div>
    </Card>
    </>     
    } else {
      return   <Card elevation={3} style={{marginTop: 50, borderRadius: 10, alignItems:'center', justifyContent:'center'}}>
        <div style={{alignItems:"center"}}>
          <CardContent>
          <Typography component="h5" variant="h5" color="textSecondary">
            Connect to <img style={{marginLeft: 1, marginRight: 5, marginTop: -3, height: 25}} src="/images/cryptoicons/smallbnbgray.svg"/>BNB Smart Chain<br></br>to claim your tokens.
          </Typography>
          </CardContent>
          </div>

    </Card>
    }
  }

  const displayCardContentV1 = () => {
    return   <Card elevation={3} style={{marginTop: 30, borderRadius: 10, alignItems:'center', justifyContent:'center'}}>
        <div style={{alignItems:"center"}}>
          <CardContent>
            <Typography component="h6" variant="h6" color="textSecondary">
              <IconFeather.AlertTriangle /> Claim will be available in V2<br></br><i style={{fontSize: 15}}>Note that rewards will be retroactive</i>
            </Typography>
          </CardContent>
          </div>

    </Card>
  }

  return (
    displayCardContentV1()
  );
}

export default CardToken