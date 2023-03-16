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
import AddNFT from '../FormCampain/AddNFT';
import Nftoptions from '../FormCampain/nftoptions';
import NFTTier from '../ITStartup/NFTTier';
const Web3 = require('web3');

const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDFiRDE0N2I1NjlGQTA3OEFhZGUyODJkZmY5NjVjMGMxMjJGZmY5QjAiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3ODEyMjgxODkxNiwibmFtZSI6IlRpcCJ9.flLUvAPGjJ1VLGSLA4l8nDQFng9CZOpqFC8YTaAhC84"

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
  const [nftName, setNftName] = React.useState(null)
  const [nftImage, setNftImage] = React.useState(null)
  const [nftPrice, setNftPrice] = React.useState(0)
  const [nftQuantity, setNftQuantity] = React.useState(0)
  const [nftDescription, setNftDescription] = React.useState("")


    const openDialog = () => {
        setDialogOpen(true)
    }

    const closeDialog = () => {
        setDialogOpen(false)
    }

    const closeDialogAndReset = () => {
        closeDialog()
        setNftImage(null)
        setNftName(null)
        setNftPrice(0)
        setNftQuantity(0)
        setNftDescription("")
    }

    const openSnackbar = () => {
        closeDialogAndReset()
        setSnackbarOpen(true)
    }

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false)
    }

    const handleAddNFTClick = () => {
        setShowNFTs(true)
        setCreationState(3)
        openDialog()
    }

    const handleNFTUpload = (image, index) => {
        setNftImage(image)
    }

    const handleNFTNameChange = (name) => {
        setNftName(name)
    }

    const handleNFTPriceChange = (price) => {
        setNftPrice(price)
    }

    const handleNFTQtyChange = (qty) => {
        setNftQuantity(qty)
    }

    const handleNFTDescChange = (desc) => {
        setNftDescription(desc)
    }

const uploadNFT = () => {

        import('nft.storage/dist/bundle.esm.min.js').then(async(obj) => {
            setCreationState(2)
            openDialog()
            const client = new obj.NFTStorage({ token: API_KEY })
            let data = await fetch(nftImage)
            .then(res => res.blob())
            .then(async(imageBlob) => {
                // console.log(imageBlob)
                const nft = {
                    image: imageBlob, // use image Blob as `image` field
                    name: nftName,
                    description: nftDescription
                }

                const metadata = await client.store(nft)
                return metadata
            })
            .catch(error => {
                setErrorMsg(error.code + " : " + error.message)
                openSnackbar()
            })

            ctrInstance.methods.uploadToken(data.url, nftPrice, nftQuantity)
            .send({from : userAddr, value: 0})
            .on('transactionHash', function(hash){
                setCreationState(0)
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
            })
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
            <DialogContentText id="alert-dialog-description">{showScan()}</DialogContentText>
            </DialogContent></div>
        case 1:
            return <div style={{justifyContent:'center'}}>
            <DialogTitle id="alert-dialog-title">Transaction confirmed ✔️</DialogTitle>
            <DialogContent style={{textAlign:'center', marginTop: 15}}>    
            <h5>NFT Uploaded</h5><p>It will soon be displayed on your creator page 💚</p>
                    <Button
                        style={{backgroundColor: 'black', color:'white'}}
                        variant="contained"
                        onClick={closeDialogAndReset}
                        >Back to your creator page
                        </Button>
            <DialogContentText id="alert-dialog-description" style={{marginTop: 35, textAlign:'left'}}>
            Transaction confirmed : </DialogContentText>
            <DialogContentText id="alert-dialog-description" style={{textAlign:'left'}}>{showScan()}</DialogContentText>
            </DialogContent>

            </div>
        case 2:
                return <div style={{justifyContent:'center'}}>
                <DialogTitle id="alert-dialog-title">Uploading data</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                Please wait while Your NFT Metadata is being uploaded to IPFS.</DialogContentText>

                <CircularProgress style={{marginTop: 20, marginBottom: 20}}/>
                
                </DialogContent>
                </div>
        case 3:
            return <div style={{justifyContent:'center'}}>
            <DialogTitle id="alert-dialog-title">Create your NFT</DialogTitle>
            <DialogContent>
                {displayNFTForm()}            
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


  const displayAddBtn = () => {
        return <button className='btn btn2' style={{border:"1px solid gray"}} onClick={handleAddNFTClick}>Add NFTs to sell</button>
  }

  const displayNFTForm = () => {
    if(showNFTs) return <div>
    <p style={{marginTop: 20, marginBottom: 0}}>Upload the artwork (JPG, PNG or GIF) for your custom NFT :</p><NFTTier tier={0} onImageChange={handleNFTUpload}/>

    <p style={{marginTop: 10, marginBottom: 0}}>Title :</p> <input type="text" id={`nftname`} placeholder={`NFT Title`} className="form-control"
        onChange={e => {
           handleNFTNameChange(e.target.value)
        }}
    />

    <p style={{marginTop: 10, marginBottom: 0}}>Description :</p> <textarea type="text" rows={2} id={`nftdesc`} placeholder={`Your NFT description here`} className="form-control"
        onChange={e => {
           handleNFTDescChange(e.target.value)
        }}
    />

     <p style={{marginTop: 10, marginBottom: 0}}>Price (in BNB) :</p> <input type="number" step={0.000001} min={0} id={`nftprice`} placeholder={`0`} className="form-control"
        onChange={e => {
           handleNFTPriceChange(e.target.value)
        }}
    />
     <p style={{marginTop: 10, marginBottom: 0}}>Quantity :</p> <input type="number" step={1} min={0} id={`nftqty`} placeholder={`0`} className="form-control"
        onChange={e => {
           handleNFTQtyChange(e.target.value)
        }}
    />
    <div style={{display:'flex', marginTop: 20, justifyContent:'space-evenly'}}>{showAddBtn()}<button className="btn btn2" onClick={closeDialogAndReset}>Cancel</button></div>
    </div>
  }

  const showAddBtn = () => {
    if(nftName && nftImage && nftPrice > 0 && nftQuantity > 0)
        return <button className="btn btn2 btn-primary-crea" onClick={uploadNFT}>Add NFT</button>
    else 
        return <button disabled className="btn btn2 btn-primary-crea">Add NFT</button>
  }

  const displayBtnsOrNot = () => {
    if(ctrInstance != undefined && ctrInstance != null && campaign.network == chainID && connected){
        return <div style={{marginTop:10, marginBottom: 15}}>{displayAddBtn()}</div>
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