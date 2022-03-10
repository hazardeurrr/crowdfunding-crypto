import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
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
import {chain} from '@/utils/chain'
import {rewardAbi} from '@/components/ContractRelated/RewardABI';
import {rewardAddr} from '@/components/ContractRelated/RewardAddr';
import * as IconFeather from 'react-feather';


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const CardToken = () => {

  const connected = useSelector((state) => state.metamask_connected)
  const chainID = useSelector((state) => state.chainID)
  const address = useSelector((state) => state.address)
  const bbstbal = useSelector((state) => state.bbstBalance)
  const web3Instance = useSelector((state) => state.web3Instance)
  const [toBeClaimed, setToBeClaimed] = React.useState(0)
  const [rewardCtr, setRewardCtr] = React.useState(undefined)
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [creationState, setCreationState] = React.useState(0);
  const [Tx, setTx] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    if(web3Instance != undefined && connected && chainID == chain){
      let contract = new web3Instance.eth.Contract(rewardAbi, rewardAddr)
      setRewardCtr(contract)
      contract.methods.getClaim().call().then(res => {console.log(res); setToBeClaimed(web3Instance.utils.fromWei(res))})
    }
  }, [web3Instance])

  const claimTokens = () => {
    // logic to claim the tokens
    rewardCtr.methods.claimTokens().send({from : address, value: 0})
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
            <DialogContentText id="alert-dialog-description"><a href={`https://rinkeby.etherscan.io/tx/${Tx}`} target="_blank">{Tx}</a></DialogContentText>
            </DialogContent></div>
        case 1:
            return <div style={{justifyContent:'center'}}>
            <DialogTitle id="alert-dialog-title">Claim successfull ! <IconFeather.Heart/></DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description" style={{marginTop: 15}}>
            Transaction confirmed : </DialogContentText>
            <DialogContentText id="alert-dialog-description"><a href={`https://rinkeby.etherscan.io/tx/${Tx}`} target="_blank">{Tx}</a></DialogContentText>
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
      return web3Instance.utils.fromWei(bbstbal.toString())
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
    if(connected && address != undefined && chainID == chain){
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
              <a className="btn btn-primary" onClick={() => claimTokens()}>Claim</a>
          </CardContent>
        </div>
      </div>
    </Card>
    </>     
    } else {
      return   <Card elevation={3} style={{marginTop: 50, height: 100, borderRadius: 10, alignItems:'center', justifyContent:'center'}}>
        <div>
          <CardContent>
          <Typography component="h5" variant="h5" color="textSecondary">
            Connect to Metamask <br></br>to claim your tokens
          </Typography>
          </CardContent>
          </div>

    </Card>
    }
  }

  return (
    displayCardContent()
  );
}

export default CardToken