import React from 'react';
import campaignAbi from '@/components/ContractRelated/CampaignAbi';
import { useSelector, useDispatch } from 'react-redux';
import {chain} from '@/utils/chain'
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

  const withdrawMoney = async() => {
    if(connected == true && chainID == chain && ctrInstance != undefined){
        //connect to Metamask and check for a refund
        //const campCtrInstance = new web3Instance.eth.Contract(campaignAbi.campaignAbi, campaign.contract_address)
        
        await payCreator(ctrInstance);
    } else {
            setErrorMsg("You're not connected. Please connect to Metamask on the right network")
            openSnackbar()
        }
  }

  const downloadData = () => {

    if(campaign.tiers.length == 0) {
        //alert ("You didn't put any tiers in your campaign !")
        setErrorMsg("You didn't put any tiers in your campaign! Can't retrieve data.")
        openSnackbar()
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
                setErrorMsg("Error : " + error)
                openSnackbar()
            });
        }

        tiers.push(tabTier);

    });

    console.log(tiers)
    
    return tiers;
  }


  const payCreator = async(contractInstance) => {
    contractInstance.methods.payCreator()
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

        })
        .then(() => {
            setCreationState(1)
            //alert("Funds succesfully claimed! Thanks for using BlockBoosted!");
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
      if(web3Instance != undefined){
        if(connected == true && chainID == chain){
            //connect to Metamask and check for a refund
            const campCtrInstance = new web3Instance.eth.Contract(campaignAbi.campaignAbi, campaign.contract_address)
            setCtrInstance(campCtrInstance)
            campCtrInstance.methods.totalBalance.call().call().then(res => {setTotalBalance(res)})
      }
    }
  }, [web3Instance])


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