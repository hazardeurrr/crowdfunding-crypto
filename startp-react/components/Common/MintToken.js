import React, { useEffect, useRef }  from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import { useSelector, useDispatch } from 'react-redux'
import {chain} from '@/utils/chain'
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from "@material-ui/lab/Alert";
import {bbstAbi} from '@/components/ContractRelated/BbstAbi';
import {bbstAddr} from '@/components/ContractRelated/BbstAddr';
import * as IconFeather from 'react-feather';
import Link from 'next/link';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


const MintToken = () => {

  const connected = useSelector((state) => state.metamask_connected)
  const chainID = useSelector((state) => state.chainID)
  const bbstbal = useSelector((state) => state.bbstBalance)
  const userAddr = useSelector((state) => state.address)
  const valueRef = useRef('')
  const web3Instance = useSelector((state) => state.web3Instance)
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [creationState, setCreationState] = React.useState(0);
  const [Tx, setTx] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

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

  React.useEffect(() => {
      
  }, [web3Instance])

  const mintTokens = () => {
    if(web3Instance != undefined){
        let amount = web3Instance.utils.toWei(valueRef.current.value.toString())
        let erc20Ctr = new web3Instance.eth.Contract(bbstAbi, bbstAddr)
        
        erc20Ctr.methods.mint(amount)
        .send({ from : userAddr, value: 0 })
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
            
        }).catch(() => {
            console.log("error in the transac")
        })
        
    }
  }
    
  const showBalance = () => {
    if(web3Instance != undefined)
    return parseFloat(parseFloat(web3Instance.utils.fromWei(bbstbal.toString())).toFixed(6))
  }

  const displayCardContent = () => {
    if(connected && chainID == chain){
      return  <>
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
            <TextField
                id="standard-number"
                type="number"
                size="small"
                inputRef={valueRef}   //connecting inputRef property of TextField to the valueRef

                InputLabelProps={{
                    shrink: true,
                }}
                inputProps={{ min: 0}}
                />
          </div>

          <div style={{flex : 2}}>
            <CardContent>
                <a className="btn btn-primary" onClick={() => mintTokens()}>Mint</a>
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
            Connect to Metamask <br></br>to mint your tokens.
          </Typography>
          </CardContent>
          </div>

    </Card>
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
            <DialogContentText id="alert-dialog-description"><a href={`https://goerli.etherscan.io/tx/${Tx}`} target="_blank">{Tx}</a></DialogContentText>
            </DialogContent></div>
        case 1:
            return <div style={{justifyContent:'center'}}>
            <DialogTitle id="alert-dialog-title">Thanks for your token mint ! <IconFeather.Heart/></DialogTitle>
            <DialogContent>
            <DialogContentText id="alert-dialog-description" style={{marginTop: 15}}>
            Transaction confirmed : </DialogContentText>
            <DialogContentText id="alert-dialog-description"><a href={`https://goerli.etherscan.io/tx/${Tx}`} target="_blank">{Tx}</a></DialogContentText>
            <div style={{justifyContent:'center'}}>
                        <Link href={{
                            pathname: "/"
                            }}
                            >
                        <a style={{marginTop: 15}} className="btn btn-primary">Back to Main page</a>
                        </Link>  
                    </div>
            </DialogContent></div>
       
        default:
            return <div style={{justifyContent:'center'}}>
            <DialogTitle id="alert-dialog-title">Waiting for confirmation...</DialogTitle>
            <DialogContent>
            
            <CircularProgress style={{marginTop: 20, marginBottom: 20}}/>
            </DialogContent></div>

    }
}

  return (
    displayCardContent()
  );
}

export default MintToken