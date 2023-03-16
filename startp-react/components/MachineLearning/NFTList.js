import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import * as Icon from 'react-feather';
import SingleCardCarrousel from '../Common/SingleCardCarrousel';
import { useSelector, useDispatch } from 'react-redux'
import {getAll} from '../../firebase-crowdfund/queries';
import {db} from '../../firebase-crowdfund/index'
import SingleCardCarrouselCrea from '../Common/SingleCardCarrouselCrea';
import SimpleCampaignPostCrea from '../Common/SimpleCampaignPostCrea';
import SingleNFT from '../Common/SingleNFT';
import campaignAbi from '@/components/ContractRelated/CampaignAbi';
import {chain} from '@/utils/chain'
import {bnb_chain} from '@/utils/bnb_chain'
import CircularProgress from '@material-ui/core/CircularProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from "@material-ui/lab/Alert";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { bsc_explorer_base, eth_explorer_base } from '@/utils/explorers';

const OwlCarousel = dynamic(import('react-owl-carousel3'));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const NFTList = ( props ) => {
    const [display, setDisplay] = React.useState(false);
    
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
  const [nft, setNft] = React.useState(null)
  const [nftData, setNftData] = React.useState(null)
  const [nftId, setNftId] = React.useState(0)

    const dispatch = useDispatch()

    const projects = props.nfts
 
    React.useEffect(() => {

        setDisplay(true);

    }, [projects])

    const openDialog = () => {
        setDialogOpen(true)
    }

    const closeDialog = () => {
        setDialogOpen(false)
    }

    const openSnackbar = () => {
        closeDialogAndReset()
        setSnackbarOpen(true)
    }

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false)
    }

    const getPrice = (token) => {
        return web3Instance.utils.fromWei(token.price)
    }

    const buyNFT = (id) => {

        if(connected && web3Instance && chainID == campaign.network){
            //connect to Metamask and check for a refund
            const campCtrInstance = new web3Instance.eth.Contract(campaignAbi.campaignAbi, campaign.contract_address)
            campCtrInstance.methods.mintUploadedNFT(id)
            .send({from : userAddr, value: nft.price})
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
        } else {
            console.log("NOT CONNECTED")
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
                <h5>NFT Minted</h5><p>Thanks you for your support 💚</p>
                <p><i style={{fontSize: 11}}>You can see, sell or transfer your NFT on any platform supporting BEP721 NFT standard, like <a href="https://opensea.io">Opensea</a>.</i></p>
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
            case 2:
                let img = nftData.image
                let imgwoprefix = img.substring(7)
                let imgnewurl = "https://nftstorage.link/ipfs/" + imgwoprefix
                if(connected && web3Instance && chainID == campaign.network){
                    console.log(nftData)
                        return <div style={{justifyContent:'center'}}>
                        <DialogTitle id="alert-dialog-title">Buy this NFT to support {campaign.name}</DialogTitle>
                        <DialogContent>
                        <div style={{textAlign:'center'}}>
                            <h4>{nftData.name}</h4>
                            <img src={imgnewurl} style={{maxWidth:250, maxHeight:250}} />
                            <p style={{marginTop: 25}}><i>{nftData.description}</i></p>
                            <b style={{fontSize: 18}}>Price : {getPrice(nft)} BNB</b>
                            <p>Quantity left : {nft.quantity}</p>
                            <div style={{display:'flex', justifyContent:'space-evenly'}}>
                                <button className='btn btn-primary' onClick={() => buyNFT(nftId)}>Buy</button>
                                <button className='btn btn2' onClick={closeDialog}>Cancel</button>
                            </div>
                        </div>                    
                        </DialogContent>
                        </div>
                } else {
                    return <div style={{justifyContent:'center'}}>
                    <DialogTitle id="alert-dialog-title">Buy this NFT to support {campaign.name}</DialogTitle>
                        <DialogContent>
                        <div style={{textAlign:'center'}}>
                            <h4>{nftData.name}</h4>
                            <img src={imgnewurl} style={{maxWidth:250, maxHeight:250}}/>
                            <p style={{marginTop: 25}}><i>{nftData.description}</i></p>                    
                        <h4>Please connect your wallet</h4>
                        <p>Make sure you are connected to the right network to buy this NFT</p>
                        <button className='btn btn2' onClick={closeDialog}>Cancel</button>

                        </div>                    
                    </DialogContent>
                    </div>
                }
                
            default:
    
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

    const options = {
        loop: true,
        nav: false,
        dots: false,
        autoplay: false,
        smartSpeed: 1000,
        margin: 30,
        autoplayTimeout: 5000,
        responsive: {
            0:{
                items: 1,
            },
            576:{
                items: 2,
            },
            768:{
                items: 3,
            },
            1024:{
                items: 4,
            },
            1200:{
                items: 5,
            }
        },
    }

    const handleNFTClick = (nft_, metadata, i) => {
        if(nft_ && metadata){
            setNft(nft_)
            setNftData(metadata)
            setNftId(i+1)
            setCreationState(2)
            openDialog()
        }
    }

    const ShowProjects = () => {
        // const len = projects.length > 6 ? 6 : projects.length
        var rows = [];
        for (var i = 0; i < projects.length; i++) {
            rows.push(<div key={i} className="single-ml-projects-box" style={{maxWidth: 160, maxHeight: 160}}>
            <SingleNFT handleNFTClick={handleNFTClick} index={i} nft={projects[i]}/></div>)
        }
        return rows;
    }

    const displayContent = () => {
        if(projects != undefined && projects.length != 0){
            return <div className="container-fluid">
            {display ? <OwlCarousel 
                className="ml-projects-slides owl-carousel owl-theme" 
                {...options}
            >  
            {ShowProjects()}
            </OwlCarousel> : ''}
        </div>

        }
    }

    
    
    return (
        <div className="ml-projects-area pt-0 ptb-80" style={{overflow:'visible', paddingBottom: 0}}>
            {displayContent()}
            {/* Shape Images */}
            <div className="shape1">
                <img src="/images/shape1.png" alt="shape" />
            </div>
            <div className="shape2 rotateme">
                <img src="/images/shape2.svg" alt="shape" />
            </div>
            <div className="shape3">
                <img src="/images/shape3.svg" alt="shape" />
            </div>
            <div className="shape4">
                <img src="/images/shape4.svg" alt="shape" />
            </div>
            <div className="shape7">
                <img src="/images/shape4.svg" alt="shape" />
            </div>
            <div className="shape8 rotateme">
                <img src="/images/shape2.svg" alt="shape" />
            </div>

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

        </div>
    );
}

export default NFTList;