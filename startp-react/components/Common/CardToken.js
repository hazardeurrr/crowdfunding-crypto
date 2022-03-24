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
import axios from 'axios';
import secrets from "../../../startp-react/secrets.json";
import {db} from '../../firebase-crowdfund/index'

const firebase = require("firebase");
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
  const [toBeClaimed, setToBeClaimed] = React.useState(0)
  const [rewardCtr, setRewardCtr] = React.useState(undefined)
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [creationState, setCreationState] = React.useState(0);
  const [Tx, setTx] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    if(web3Instance != undefined && connected && chainID == chain){
      var contract = new web3Instance.eth.Contract(rewardAbi, rewardAddr)
      setRewardCtr(contract);
      setToBeClaimed(0);
      getClaim(contract);
    }
  }, [web3Instance])

  const getClaim = async(contract) => {
    const userAddr = address;
    const rewardCtr = contract;

    rewardCtr.methods.getLastClaim(userAddr).call().then((res) => {
      rewardCtr.getPastEvents("Participate", ({fromBlock: parseInt(res)}))
        .then((events) => {
  
      let eventsFiltered = events.filter(e => e.returnValues.user.toLowerCase() == userAddr);

      if (eventsFiltered.length != 0) {
        rewardCtr.methods.getStartTimestamp().call().then(async(time) => {
    
          const promises = eventsFiltered.map(async(e) => {

            var week = parseInt(Math.floor((e.returnValues.timestamp - time) / 604800));
            var ratio;
      
            await db.collection('utils').doc('rates').get().then(async(resRate) => {
      
              
              var currentRate = 0
              
              if(e.returnValues.token == "0x0000000000000000000000000000000000000000")
              currentRate = resRate.data().eth[week] == undefined ? 1 : resRate.data().eth[week]
              if(e.returnValues.token == "0x67c0fd5c30C39d80A7Af17409eD8074734eDAE55")
              currentRate = resRate.data().bbst[week] == undefined ? 3000 : resRate.data().bbst[week]
              if(e.returnValues.token == "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b")
              currentRate = resRate.data().usdc[week] == undefined ? 3000 * 10**12 : resRate.data().usdc[week] * 10**12
              
              // console.log("Rate crypto :", currentRate);

              await db.collection('utils').doc('rewardData').get().then((data) => {
      
                // console.log("week :", week)
      
                if (data.data().totalPerWeek[week] == undefined) {
                  ratio = 0;
                } else {
                  ratio = (e.returnValues.amount * currentRate) / data.data().totalPerWeek[week]
                }
      
              }).catch((error) => {console.log(error)})
      
              }).catch((error) => {console.log(error)})

              return [ratio, week];
          })
    
          await Promise.all(promises).then(async(res) => {
            // claim += map.reduce(((a,b) => a + b), 0);

            await db.collection('utils').doc('rewardData').get().then((data) => {

              var weekTmp = res[0][1];
              var cpt = 0;
              var total = 0;
              var tmpTotalWeek = 0;
  
              res.forEach((elem) => {
                cpt++;

                if (elem[1] != weekTmp) {
                  var ratio = tmpTotalWeek > 0.03 ? 0.03 : tmpTotalWeek
                  total += ratio * data.data().weeklySupply[weekTmp];
                  tmpTotalWeek = 0;
                  weekTmp = elem[1];
                }

                if (cpt == res.length) {
                  var ratio = tmpTotalWeek > 0.03 ? 0.03 : tmpTotalWeek
                  total += ratio * data.data().weeklySupply[weekTmp];
                }

                tmpTotalWeek += elem[0];
              })

              setToBeClaimed(total);
            })

          })
        })
      }
    })

    }).catch((error) => {
      console.log(error);
    });

  }

  const claimTokens = async() => {
    // logic to claim the tokens
    var sig;
    var amount;

    axios({
      method: 'post',
      url: REACT_APP_LINK_TO_SIG + '?address=' + address
    }).then((res) => {

      sig = res.data.sig;
      amount = res.data.amount;

      rewardCtr.methods.claimTokens(address, amount, sig).send({from : address, value: 0})
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

    }).catch((error) => {
      console.error(error);
    });
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