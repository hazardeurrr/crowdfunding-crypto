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
import {chain} from '@/utils/chain'
import {rewardAbi} from '@/components/ContractRelated/RewardABI';
import {rewardAddr} from '@/components/ContractRelated/RewardAddr';
import {poly_rewardAbi} from '@/components/ContractRelated/poly_RewardABI';
import {poly_rewardAddr} from '@/components/ContractRelated/poly_RewardAddr';
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
  const poly_web3Instance = useSelector((state) => state.poly_web3Instance)

  const [toBeClaimed, setToBeClaimed] = React.useState(0)
  const [rewardCtr, setRewardCtr] = React.useState(undefined)
  // const [polyRewardCtr, setPolyRewardCtr] = React.useState(undefined)
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [snackbarOpen, setSnackbarOpen] = React.useState(false);
  const [creationState, setCreationState] = React.useState(0);
  const [Tx, setTx] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  React.useEffect(() => {
    if(web3Instance != undefined && connected && chainID == chain){
      var contract = new web3Instance.eth.Contract(rewardAbi, rewardAddr)
      var poly_contract = new poly_web3Instance.eth.Contract(poly_rewardAbi, poly_rewardAddr)

      // setPolyRewardCtr(poly_contract);
      setRewardCtr(contract);
      setToBeClaimed(0);
      getClaim(contract, poly_contract);
    }
  }, [web3Instance])

  const getClaim = async(contract, poly_contract) => {
    const weekTime = 300;
    
    const userAddr = address;
    const rewardCtr = contract;
    const polyRewardCtr = poly_contract;

    rewardCtr.methods.getLastClaim(userAddr).call().then((res) => {
      rewardCtr.getPastEvents("Participate", ({fromBlock: 10445766, toBlock: "latest"}))
        .then((events) => {
  
          let eventsFilteredETH = events.filter(e => e.returnValues.user.toLowerCase() == userAddr && e.returnValues.timestamp >= res).map(a => ({ ...a, chain: 'ethereum' }));
          
          polyRewardCtr.getPastEvents("Participate", ({fromBlock: 26539712, toBlock: "latest"}))
            .then((eventsPoly) => {
              let eventsFilteredPoly = eventsPoly.filter(e => e.returnValues.user.toLowerCase() == userAddr && e.returnValues.timestamp >= res).map(a => ({ ...a, chain: 'polygon' }));
              let eventsFiltered = eventsFilteredETH.concat(eventsFilteredPoly)
  
            if (eventsFiltered.length == 0) {
              console.error("Wrong Address or no participations registered yet !");
            }
  
            if (eventsFiltered.length != 0) {
              rewardCtr.methods.rewardStartTimestamp.call().call().then(async(time) => {
      
                  const promises = eventsFiltered.map(async(e) => {
        
                    var week = parseInt(Math.floor((e.returnValues.timestamp - time) / weekTime));
                    var ratio;
              
                    await db.collection('utils').doc('rates').get().then(async(resRate) => {
              
                      
                      var currentRate = 0
                      
                      if(e.returnValues.token == "0x0000000000000000000000000000000000000000" && e.chain == "ethereum")
                      currentRate = resRate.data().eth[week] == undefined ? 3200 : resRate.data().eth[week]
                      if(e.returnValues.token == "0x9AeC9767B0842d04dc0b831ADAA71342Ed8B8Ba1" && e.chain == "ethereum")
                      currentRate = resRate.data().bbst[week] == undefined ? 1.25 : resRate.data().bbst[week]
                      if(e.returnValues.token == "0xb465fbfe1678ff41cd3d749d54d2ee2cfabe06f3" && e.chain == "ethereum")
                      currentRate = resRate.data().usdc[week] == undefined ? 10**12 : resRate.data().usdc[week] * 10 ** 12
                      if(e.returnValues.token == "0x0000000000000000000000000000000000000000" && e.chain == "polygon")
                      currentRate = resRate.data().matic[week] == undefined ? 0.6 : resRate.data().matic[week]
                      if(e.returnValues.token == "0x8922Ab8ed4FE9E7C25D826171d91c3c8E98284b3" && e.chain == "polygon")
                      currentRate = resRate.data().bbst[week] == undefined ? 1.25 : resRate.data().bbst[week]
                      if(e.returnValues.token == "0x8f7116ca03aeb48547d0e2edd3faa73bfb232538" && e.chain == "polygon")
                      currentRate = resRate.data().usdc[week] == undefined ? 10**12 : resRate.data().usdc[week] * 10 ** 12
  
                      // console.log("Rate crypto :", currentRate);
        
                      await db.collection('utils').doc('rewardData').get().then((data) => {
              
                        // console.log("week :", week)
                        let totalETH = data.data().test_totalPerWeekETH[week] == undefined ? 0 : data.data().test_totalPerWeekETH[week]
                        let totalPolygon = data.data().test_totalPerWeekPolygon[week] == undefined ? 0 : data.data().test_totalPerWeekPolygon[week]
                        let totalThisWeek = totalETH + totalPolygon
              
                        if (totalThisWeek == 0 || totalThisWeek == undefined) {
                          ratio = 0;
                        } else {
                          ratio = (e.returnValues.amount * currentRate) / totalThisWeek
                          // console.log("ratio :", ratio)
                        }
              
                      }).catch((error) => { console.log(error) })
              
                      }).catch((error) => { console.log(error) })
        
                      return [ratio, week];
                  })
            
                  await Promise.all(promises).then(async(res) => {
                    // claim += map.reduce(((a,b) => a + b), 0);
                    // console.log(res)
        
                    await db.collection('utils').doc('rewardData').get().then((data) => {
        
                      var weekTmp = res[0][1];
                      var cpt = 0;
                      var tmpTotalWeek = 0;
                      var claim = 0;
          
                      res.forEach((elem) => {
                        ++cpt;
        
                        if (elem[1] != weekTmp) {
                          var ratio = tmpTotalWeek > 0.03 ? 0.03 : tmpTotalWeek
                          claim += ratio * data.data().weeklySupply[weekTmp];
                          tmpTotalWeek = 0;
                          weekTmp = elem[1];
                        }
        
                        tmpTotalWeek += elem[0];
        
                        if (cpt == res.length) {
                          var ratio = tmpTotalWeek > 0.03 ? 0.03 : tmpTotalWeek
                          claim += ratio * data.data().weeklySupply[weekTmp];
                        }
        
                      })

                      setToBeClaimed(claim)

                    })
                  }) 
              })
            }
          })
      })	

    }).catch((error) => {
      throw error;
    });

  }

  const claimTokens = async() => {

    setCreationState(2)
    openDialog()

    // logic to claim the tokens
    var sig;
    var amount;

    axios({
      method: 'post',
      url: REACT_APP_LINK_TO_SIG + '?address=' + address
    }).then((res) => {

      // console.log(res)

      sig = res.data.sig;
      amount = res.data.amount;

      rewardCtr.methods.claimTokens(amount, sig).send({from : address, value: 0})
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

    }).catch((error) => {
      throw "Error in the request";
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
            <DialogContentText id="alert-dialog-description"><a href={`https://goerli.etherscan.io/tx/${Tx}`} target="_blank">{Tx}</a></DialogContentText>
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
            <DialogContentText id="alert-dialog-description"><a href={`https://goerli.etherscan.io/tx/${Tx}`} target="_blank">{Tx}</a></DialogContentText>
            </DialogContent></div>

        case 2:
          return <div style={{justifyContent:'center'}}>
          <DialogTitle id="alert-dialog-title">Accessing Web3...</DialogTitle>
          <DialogContent>

            <CircularProgress style={{marginTop: 20, marginBottom: 20}}/>
            <DialogContentText id="alert-dialog-description" style={{marginTop: 15}}>
            Please confirm the transaction on Metamask to withdraw your BBST</DialogContentText>
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
              <button hidden={toBeClaimed <= 0} className="btn btn-primary" onClick={() => claimTokens()}>Claim</button>
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
            Connect to Ethereum <br></br>to claim your tokens
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