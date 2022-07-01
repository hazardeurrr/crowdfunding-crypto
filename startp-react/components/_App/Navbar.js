 import React from "react"
import Link from '@/utils/ActiveLink'
import * as Icon from 'react-feather'
import { useSelector, useDispatch } from 'react-redux'
const Web3 = require('web3');
import Avatar from '@material-ui/core/Avatar';
import firebase from 'firebase-crowdfund/index';
import CircularProgress from '@material-ui/core/CircularProgress';

import detectEthereumProvider from '@metamask/detect-provider';
import { postDoc, getOne } from 'firebase-crowdfund/queries'
import AutoCompleteSearchBar from "../Common/AutoCompleteSearchBar";
import SearchIcon from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import bbstAbi from '@/components/ContractRelated/BbstAbi'
import bbstAddr from '@/components/ContractRelated/BbstAddr'
import {chain} from '@/utils/chain'
import {bnb_chain} from '@/utils/bnb_chain'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ChipUser from "../Common/ChipUser";
import ProfileNav from "../Common/ProfileNav";
import Chip from '@material-ui/core/Chip';
import axios from 'axios';
import { getSvgData } from "carbon-components-react";

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import MuiAlert from "@material-ui/lab/Alert";

const useStyles = makeStyles((theme) => ({
    root: {
        color: "green"
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      marginBottom:5,
      color:'white'
    },
  }));

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Navbar = () => {

    const classes = useStyles();

    const [menu, setMenu] = React.useState(true)
    const dispatch = useDispatch()
    const userAddr = useSelector((state) => state.address)
    const currentUser = useSelector((state) => state.currentUser)
    const [providerDetected, setProviderDetected] = React.useState(false)
    const chainID = useSelector((state) => state.chainID)
    const bnb_web3Instance = useSelector((state) => state.bnb_web3Instance)
    const [selectAddr, setSelectAddr] = React.useState(null)
    //-----------CONNECTION MODAL-------------//
    const [openConnect, setOpenConnect] = React.useState(false);
    const [modalState, setModalState] = React.useState(0);
    const [showSign, setShowSign] = React.useState(true);
    const connected = useSelector((state) => state.metamask_connected);

    const handleConnectOpen = () => {
        console.log("connect open")
        setOpenConnect(true);
    };

    const handleConnectClose = (value) => {
        setOpenConnect(false);
        setModalState(0)
        setShowSign(true)
    };

    //----------------------------------------//

 
    const toggleNavbar = () => {
        setMenu(!menu)
    }

    
    React.useEffect(() => {
        let elementId = document.getElementById("header");
        document.addEventListener("scroll", () => {
            if (window.scrollY > 170) {
                elementId.classList.add("is-sticky");
            } else {
                elementId.classList.remove("is-sticky");
            }
        });
        window.scrollTo(0, 0); 
        initApp();

        // componentWillUnmount
        return () => {
            ethereum.removeListener('accountsChanged', handleAccountsChanged);
            ethereum.removeListener('chainChanged', handleChainChanged);
        }
    }, [])

    async function initApp(){
        var web3bnb = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"))
            dispatch({
                type:'SET_WEB3BNB',
                id: web3bnb
            })
            var web3eth = new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/391e7c4cd5274ef8a269414b4833bade"))
            dispatch({
                type:'SET_WEB3ETH',
                id: web3eth
            })
    }

    async function initMetamaskProvider() {
        // If the provider returned by detectEthereumProvider is not the same as
        // window.ethereum, something is overwriting it, perhaps another wallet.

        const provider = await detectEthereumProvider();

        if (provider) {
            setProviderDetected(true)
            // console.log('Provider found')
            if (provider !== window.ethereum) {
                console.error('Do you have multiple wallets installed?');
            }
            // Access the decentralized web!
            const chainId = await ethereum.request({ method: 'eth_chainId' });
            dispatch({
                type: 'SET_CHAINID',
                id: chainId
            })
            if(chainId !== chain && chainId !== bnb_chain){
                console.log("Please change your network to a supported one.")
            }
    
            ethereum.on('chainChanged', handleChainChanged);
    
            ethereum
            .request({ method: 'eth_requestAccounts' })
            .then((value) => {
                console.log(value)
                handleAccountsChanged(value)
                // localStorage.setItem('current_address', value[0])
            })
            .catch((err) => {
                if (err.code === 4001) {
                // EIP-1193 userRejectedRequest error
                // If this happens, the user rejected the connection request.
                console.log('Please connect to MetaMask.');
                } else {
                console.error(err);
                }
            });    
            // Note that this event is emitted on page load.
            // If the array of accounts is non-empty, you're already
            // connected.
            ethereum.on('accountsChanged', handleAccountsChanged);
        } else {
            setProviderDetected(false)
            setModalState(1)
            console.log('Please install MetaMask!');
        }        
    }

    // For now, 'eth_accounts' will continue to always return an array
    const handleAccountsChanged = async(accounts) => {
        if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log('Please connect to MetaMask.');
        cancelConnection()
    
        } else {
            console.log("accounts changed")
            
            setSelectAddr(accounts[0])

            metamaskAuth()
        }
    }

    const metamaskAuth = () => {
        //-------------------------REQUEST AUTHENTICATION-------------------------/
        if(firebase.auth().currentUser.uid == ethereum.selectedAddress.toLowerCase()){
            getDataOnceAuth(firebase.auth().currentUser.uid)
            handleConnectClose()
        } else {
            dispatch({
                type: 'SET_CONNECTED',
                id: false
            })
            dispatch({
                type: 'SET_CURRENT_USER',
                id: undefined
            })
            setModalState(2)
            handleConnectOpen()
        }
        //------------------------------------------------------------------------/
    }

    const getDataOnceAuth = async(address) => {
        dispatch({
            type: 'SET_CONNECTED',
            id: true
        })
        dispatch({
            type: 'SET_ADDRESS',
            id: address
        })

        var web3 = new Web3(window.ethereum)
        dispatch({
            type: 'SET_WEB3',
            id: web3
        })
        
            // console.log("cheching BBST balance...")
            var web3b = null
            if(bnb_web3Instance != undefined){
                web3b = bnb_web3Instance
            } else {
                web3b = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s1.binance.org:8545/"))
            }
            const bbst_contract = new web3b.eth.Contract(bbstAbi.bbstAbi, bbstAddr.bbstAddr);
            bbst_contract.methods.balanceOf(address).call().then(response => {
                // console.log('response', response)
                dispatch({
                    type: 'SET_BBST_BALANCE',
                    id: response
                })
                // console.log(response)
            }).catch(console.error)
        
        
        

        if (address != undefined) {

            getOne('profile', address, function(doc) {
                if (doc.exists) {
                        dispatch({
                            type: 'SET_CURRENT_USER',
                            id: doc.data()
                        })
                } else {
                    const user = { username: "", email: "", eth_address: address, image: "", bio: "", twitter: "", liked: new Array() }
                    postDoc(user.eth_address, 'profile', user,
                        console.log(user.username + " has been uploaded")
                    )
                     dispatch({
                         type: 'SET_CURRENT_USER',
                         id: user
                     })
                }
            })
        }
    }

    const authenticateWithMetamask = async() => {
        setShowSign(false)

        axios({
            method: 'post',
            url: 'https://europe-west1-crowdfunding-dev-5f802.cloudfunctions.net/getNonceToSign',
            data: {
              address: ethereum.selectedAddress
            }
          })
          .then(async(response) => {
            console.log(response.data);
            //----------SIGN NONCE---------//
            ethereum.request({
                method: 'personal_sign',
                params: [
                  `0x${toHex(response.data.nonce)}`,
                  ethereum.selectedAddress,
                ],
            })
            .then(async(sig) => {
                //--------------VERIFY SIG---------//
                console.log(sig)
                axios({
                    method: 'post',
                    url: 'https://europe-west1-crowdfunding-dev-5f802.cloudfunctions.net/verifySignedMessage',
                    data: {
                      address: ethereum.selectedAddress,
                      signature: sig
                    }
                })
                .then(async(tokenResp) => {
                    //---------SIGN WITH TOKEN-------//
                    firebase.auth().signInWithCustomToken(tokenResp.data.token)
                    .then((result) => {
                        console.log(result)
                        getDataOnceAuth(result.user.uid)
                        handleConnectClose()

                    }).catch((error) => {
                        handleError(error)
                    });
                })
                .catch((error) => {
                    handleError(error)
                });
            })
            .catch((error) => {
                handleError(error)
            });
          })
          .catch((error) => {
            handleError(error)
          });
    }

    const handleError = (error) => {
        setShowSign(true)
        console.log(error)
    }

    const toHex = (str) => {
        //converting string into buffer
    let bufStr = Buffer.from(str, 'utf8');

    //with buffer, you can convert it into hex with following code
        return bufStr.toString('hex');
    }

    //Connect button handler
    const connect = () => {
        setModalState(0)
        handleConnectOpen()
    }

    const handleChainChanged = (_chainId) => {
        // We recommend reloading the page, unless you must do otherwise
        dispatch({
            type: 'SET_CHAINID',
            id: _chainId
        })
        // prompt CHANGE TO MAINNET ?!
        //window.location.reload();
    }

    const isConnected = () => {
        if (!connected) {
            return (
                <>
                <button type="submit" className="btn btn-secondary" onClick={() => connect()}>Connect Wallet</button>
                </>
            )
        }
    }

    const showCurrentNetwork = () => {
        // if(chainID == chain){   // ETH
        //     return <Link href="#">
        //     <a onClick={e => e.preventDefault()} className="nav-link">
        //         <div style={{display:"flex"}}><img style={{height: 20, marginTop: 1}} src="/images/cryptoicons/smallethgray.svg" /> <span style={{marginLeft: 5}}>Ethereum</span> <Icon.ChevronDown /></div>
        //     </a>
        //     </Link>
        // } else
             if(chainID == bnb_chain) {      // BSC
            return <Link href="#">
            <a onClick={e => e.preventDefault()} className="nav-link">
                <div style={{display:"flex"}}><img style={{height: 20, marginTop: 1}} src="/images/cryptoicons/smallbnbgray.svg" /> <span style={{marginLeft: 5, marginRight:2}}>BSC</span> 
                {/* <Icon.ChevronDown /> */}
                </div>
            </a>
            </Link>
        } else {
            return <Link href="#">
            <a onClick={e => e.preventDefault()} className="nav-link">
                <div style={{display:"flex"}}><Icon.AlertCircle/> <span style={{marginLeft: 5, marginTop: 1}}>Unknown</span> 
                {/* <Icon.ChevronDown /> */}
                </div>
            </a>
            </Link>
        }
    }

    const switchToBNB = async() => {
        if (window.ethereum.networkVersion !== "0x38") {
            try {
              await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: "0x38" }]
              });
            } catch (err) {
                // This error code indicates that the chain has not been added to MetaMask
              if (err.code === 4902) {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainName: 'BNB Smart Chain Mainnet',
                      chainId: "0x38",
                      nativeCurrency: { name: 'Binance Coin', decimals: 18, symbol: 'BNB' },
                      rpcUrls: ["https://bsc-dataseed.binance.org/"],
                      blockExplorerUrls: ['https://bscscan.com']
                    }
                  ]
                });
              }
            }
          }
    }

    const switchToBNBTestnet = async() => {
        if (window.ethereum.networkVersion !== "0x61") {
            try {
              await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: "0x61" }]
              });
            } catch (err) {
                // This error code indicates that the chain has not been added to MetaMask
              if (err.code === 4902) {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainName: 'BNB Smart Chain Testnet',
                      chainId: "0x61",
                      nativeCurrency: { name: 'Binance Coin', decimals: 18, symbol: 'BNB' },
                      rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545/"],
                      blockExplorerUrls: ['https://testnet.bscscan.com']
                    }
                  ]
                });
              }
            }
          }
    }

    const switchTogoerli = async() => {
        if (window.ethereum.networkVersion !== "0x5") {
            {
              await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: "0x5" }]
              });
            }
        } 
    }

    const switchToETH = async() => {
        if (window.ethereum.networkVersion !== "0x1") {
            {
              await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: "0x1" }]
              });
            }
        } 
    }

    const showSignBtn = () => {
        if(showSign){
            return  <Button onClick={authenticateWithMetamask} color="primary">
            Accept & sign
        </Button>
        } else {
            return <CircularProgress />
        }
    }

    const displayConnectModal = (x) => {
        switch(x) {
            case 0 : default:
                return <div>
                    <DialogTitle id="simple-dialog-title">Connect your wallet</DialogTitle>
                        <List>                            
                            <ListItem autoFocus button onClick={() => initMetamaskProvider()}>
                                <ListItemAvatar>
                                    <Avatar src="/images/wallets/metamask.png" />
                                </ListItemAvatar>
                                <ListItemText primary="Metamask" />
                            </ListItem>
                            
                        </List>
                    </div>
            case 1:
                return <div>
                <DialogTitle id="alert-dialog-title">{"You don't have Metamask !"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You need to have Metamask installed to access this feature. Metamask is a plugin that serves as your browser Wallet.
                        <br></br><br></br>Please install it at <b><a target="_blank" href="https://metamask.io/download.html">metamask.io</a></b>.
                    </DialogContentText>
                    </DialogContent>
                </div>
    
            case 2:
              return <div>
              <DialogTitle id="alert-dialog-title">{"Welcome to BlockBoosted !"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Address : {selectAddr}
                    </DialogContentText>
                    <DialogContentText id="alert-dialog-description">
                        By connecting your wallet and using BlockBoosted, you agree to our Terms of Service and Privacy Policy. Please sign this message on Metamask to authenticate.
                    </DialogContentText>
                    
                    <DialogActions>
                        {showSignBtn()}
                        <Button onClick={() => cancelConnection()} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                    </DialogContent>
              </div>
    
        }
    }

    const cancelConnection = () => {
        dispatch({
            type: 'SET_CONNECTED',
            id: false
        })
        handleConnectClose()
    }



    const showProfile = () => {
        if(connected && currentUser != undefined){
            if(currentUser.eth_address === userAddr){

            return (
                <>
                <div style={{marginTop: -8}}>
                    <li className="nav-item">
                    <Link href="#">
                        <a onClick={e => e.preventDefault()} className="nav-link">
                            <ProfileNav user={currentUser}/> 
                            {/* <Icon.ChevronDown /> */}
                        </a>
                    </Link>

                        <ul className="dropdown-menu">
                            <li className="nav-item">
                                <Link href={`/User/${userAddr}`} activeClassName="active">
                                    <a onClick={toggleNavbar} className="nav-link">View Profile</a>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link href="/setProfile" activeClassName="active">
                                    <a onClick={toggleNavbar} className="nav-link">Edit Profile</a>
                                </Link>
                            </li>
                        </ul>
                    </li>
                </div>


                {/* {showCurrNet()} */}
            </>



            )
                            
            }
        }
    }

    const showCurrNet = () => {
        return <li className="nav-item">
        {/* <Chip variant="outlined" style={{marginTop: -8, height: 40, background:"none", border:"none"}} avatar={<Avatar sizes='medium' alt='avatar' src={"/images/cryptoicons/ethblack.svg"} />} label={<section style={{display:"flex"}}>
           <div style={{}}>Ethereum</div> 
           <Icon.ChevronDown />

            </section>} /> */}
            {showCurrentNetwork()}
            <ul className="dropdown-menu">
                <p style={{marginLeft: 5, fontSize: 15, marginBottom: 0}}><i>Select network</i></p>
                <li className="nav-item">
                    <Link href="#">
                    <a onClick={e => {
                        e.preventDefault();
                        switchToBNBTestnet()                   // !!!!!!!!!!!!!!!!!!!!!!!!!!! CHANGER TO SWITCH TO BNB !!!!!!!!!!!
                        }} className="nav-link">
                        <div style={{display:"flex"}}><img style={{height: 18, marginTop: 1}} src="/images/cryptoicons/smallbnbgray.svg" /> <span style={{marginLeft: 5}}>BNB Smart Chain</span></div>
                    </a>
                    </Link>
                </li>  

                {/* <li className="nav-item">
                    <Link href="#">
                    <a onClick={e => {
                        e.preventDefault();
                        switchTogoerli()                   // !!!!!!!!!!!!!!!!!!!!!!!! CHANGER TO SWITCH TO ETH !!!!!!!!!!!!!!!!!
                        }} className="nav-link">
                        <div style={{display:"flex"}}><img style={{height: 18, marginTop: 1}} src="/images/cryptoicons/smallethgray.svg" /> <span style={{marginLeft: 5}}>Ethereum</span></div>
                    </a>
                    </Link>                           
                </li> */}

            </ul>
    </li>
    }

    const classOne = menu ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = menu ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

    const showSwitchNetworkBar = () => {
        if(chainID != bnb_chain && connected){
            return <div className={classes.root}>
            <AppBar position="static" style={{marginTop: -15, marginBottom:10, background:'#F3BA2F', justifyContent:'center', alignItems:'center'}}> 
                <Typography style={{color: 'white', fontSize: 14, marginTop: 3, marginBottom: 3}}>
                    You aren't connected to a supported network. Please <b><a style={{textDecoration: "underline", cursor: "pointer"}} onClick={() => switchToBNBTestnet()}>switch to BNB Smart Chain Testnet</a></b>.
                </Typography>
            </AppBar>
        </div>
        }
    }

//#c679e3 purple
    return (
        
        <header id="header" className="headroom">
            {showSwitchNetworkBar()}
            {/* <div className={classes.root}>
                <AppBar position="static" style={{marginTop: -15, marginBottom:10, background:'#F3BA2F', justifyContent:'center', alignItems:'center'}}> 
                    <Typography style={{color: 'white', fontSize: 14, marginTop: 3, marginBottom: 3}}>
                        Alpha v0.2 running on BNB Smart Chain testnet !
                    </Typography>
                </AppBar>
            </div> */}
            <div className="startp-nav">
                <div className="container">
                    <nav className="navbar navbar-expand-md navbar-light">
                        <Link href="/">
                            <a onClick={toggleNavbar} className="navbar-brand">
                                <img src="/images/logo_svg-cropped.svg" style={{width: 100}} alt="logo" />
                            </a>
                        </Link>

                        <button 
                            onClick={toggleNavbar} 
                            className={classTwo}
                            type="button" 
                            data-toggle="collapse" 
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                            aria-expanded="false" 
                            aria-label="Toggle navigation"
                        >
                            <span className="icon-bar top-bar"></span>
                            <span className="icon-bar middle-bar"></span>
                            <span className="icon-bar bottom-bar"></span>
                        </button>


                        
                                        

                        <div className={classOne} id="navbarSupportedContent">
                        <div className="autocomplete-container"><SearchIcon style={{marginTop: 10, marginLeft: 5, marginRight: 5}}/><AutoCompleteSearchBar/></div>

                            <ul className="navbar-nav ms-auto">

                                {/* //----------------CONNECT MODAL---------------// */}

                                <Dialog onClose={handleConnectClose} aria-labelledby="simple-dialog-title" open={openConnect}>
                                    {displayConnectModal(modalState)}
                                </Dialog>

                                {/* //----------------CONNECT MODAL END---------------// */}

                                <li className="nav-item">
                                <Link href={"/token"} activeClassName="active">
                                        <a onClick={toggleNavbar} className="nav-link">BBST Token</a>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                <Link href={"/how-it-works"} activeClassName="active">
                                        <a onClick={toggleNavbar} className="nav-link">How it works</a>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                <Link href={{
                                        pathname: "/SearchPage/",
                                        query: {
                                            id: "explore",
                                        }
                                    }} activeClassName="active">
                                        <a onClick={toggleNavbar} className="nav-link">Explore</a>
                                    </Link>
                                </li>

                                {showProfile()}



                            </ul>
                        </div>

                        <div className="others-option" style={{alignItems:'center'}}>

                            {/* <Link href="/cart">
                                <a className="cart-wrapper-btn">
                                    <Icon.ShoppingCart /> 
                                    <span>{cart.length}</span>
                                </a>
                            </Link> */}

                            <Link href="/form-campaign">
                                <a className="btn btn-secondary btn-not-displayed">Create</a>
                            </Link>

                            {isConnected()}
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Navbar;