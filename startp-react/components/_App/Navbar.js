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
import bnb_bbstAddr from '@/components/ContractRelated/bnb_BbstAddr'
import {chain} from '@/utils/chain'
import {bnb_chain} from '@/utils/bnb_chain'
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import CancelIcon from '@material-ui/icons/Clear';
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

import WalletConnectProvider from '@walletconnect/web3-provider'
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import Portis from '@portis/web3';
import { BscConnector } from '@binance-chain/bsc-connector'

import { db } from '../../firebase-crowdfund/index'
import Badge from '@material-ui/core/Badge';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { withStyles } from '@material-ui/core/styles';
import SimpleNotifCard from "../Common/SimpleNotifCard";
import { useRouter } from "next/router";
import { isProd } from "@/utils/isProd";

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

  const StyledBadge = withStyles((theme) => ({
    badge: {
      right: 3,
      top: 5,
      backgroundColor:"#44cf6e",
      color: "white"
    },
  }))(Badge);

  const StyledBadgeDrop = withStyles((theme) => ({
    badge: {
      top: 17,
      backgroundColor:"#44cf6e",
      color:"white"
    },
  }))(Badge);

const Navbar = () => {

    const classes = useStyles();
    const router = useRouter()

    const [notifs, setNotifs] = React.useState([])
    const [menu, setMenu] = React.useState(true)
    const dispatch = useDispatch()
    const userAddr = useSelector((state) => state.address)
    const currentUser = useSelector((state) => state.currentUser)
    const chainID = useSelector((state) => state.chainID)
    const bnb_web3Instance = useSelector((state) => state.bnb_web3Instance)
    const [selectAddr, setSelectAddr] = React.useState(null)
    //-----------CONNECTION MODAL-------------//
    const [openConnect, setOpenConnect] = React.useState(false);
    const [modalState, setModalState] = React.useState(0);
    const [showSign, setShowSign] = React.useState(true);
    const connected = useSelector((state) => state.metamask_connected);
    const web3Instance = useSelector((state) => state.web3Instance);
    // const [showAppBar, setShowAppBar] = React.useState(true)
    const showAppBar = useSelector((state) => state.showWelcome)

    //--------------NOTIF MODAL---------------//
    // const [openNotifModal, setOpenNotifModal] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const openNotifModal = useSelector((state) => state.openNotif)

    const setOpenNotifModal = (bool) => {
        dispatch({
            type: 'SET_OPENNOTIF',
            id: bool
        })
    }

    const handleNotifModalClose = () => {
        setOpenNotifModal(false);

        if(notifs.filter(a => a.read == false).length > 0){
            let notifsUpdated = notifs
            notifsUpdated.forEach(a => a.read = true)
            setNotifs(notifsUpdated)
            db.collection('profile').doc(currentUser.eth_address).collection("privacy").doc(currentUser.eth_address).update({notifications: notifsUpdated})
        }
    }

    const handleNotifModalOpen = () => {
        setOpenNotifModal(true);
    }


    //---CONECTION MODAL--//
    const handleConnectOpen = () => {
        setOpenConnect(true);
    };

    const handleConnectClose = (value) => {
        setOpenConnect(false);
        // setModalState(0)
        setShowSign(true)
    };

    //------------------WALLET CONNECT----------------------//


  /**
   * Disconnect wallet button pressed.
   */
  async function onDisconnect() {
  
    console.log("Killing the wallet connection", web3Instance.currentProvider);
  
    // TODO: Which providers have close method?
    if(web3Instance.currentProvider.close) {
      await web3Instance.currentProvider.close();
    }

    dispatch({
        type: 'SET_PROVIDER',
        id: undefined
    })
   
    removeListeners()
    cancelConnection()
  }

  const setShowAppBar = (bool) => {
    dispatch({
        type: 'SET_SHOWWELCOME',
        id: bool
    })
  }

  const cancelConnection = () => {
    dispatch({
        type: 'SET_CONNECTED',
        id: false
    })
    dispatch({
        type: 'SET_CURRENT_USER',
        id: undefined
    })
    dispatch({
        type: 'SET_ADDRESS',
        id: undefined
    })
  }

  async function removeListeners(){
    if(web3Instance !== undefined){
        if(web3Instance.currentProvider != undefined){
            if(web3Instance.currentProvider.removeListener){
                web3Instance.currentProvider.removeListener('accountsChanged', handleAccountsChanged);
                web3Instance.currentProvider.removeListener('chainChanged', handleChainChanged);
            }
        }
    }
  }
  
    //----------------------------------------//

 
    const toggleNavbar = () => {
        setMenu(!menu)
    }

    
    React.useEffect(() => {
        if (connected && currentUser !== null) {
            auth(currentUser.eth_address)
        }
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
            removeListeners()
        }
    }, [])

    async function initApp(){
        var web3bnb = isProd ? new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org")) : new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s3.binance.org:8545/"))
            dispatch({
                type:'SET_WEB3BNB',
                id: web3bnb
            })
            var web3eth = isProd ? new Web3(new Web3.providers.HttpProvider("https://mainnet.infura.io/v3/391e7c4cd5274ef8a269414b4833bade")) : new Web3(new Web3.providers.HttpProvider("https://goerli.infura.io/v3/391e7c4cd5274ef8a269414b4833bade"))
            dispatch({
                type:'SET_WEB3ETH',
                id: web3eth
            })
    }

    async function initProvider(provider, legacy = false){

        dispatch({
            type: 'SET_PROVIDER',
            id: provider
        })

        // Subscribe to accounts change
        provider.on("accountsChanged", (accounts) => {
            handleAccountsChanged(accounts);
        });

    
        // Subscribe to chainId change
        provider.on("chainChanged", (chainId) => {
            handleChainChanged(chainId);
        });
        
        // Get a Web3 instance for the wallet
        const web3 = new Web3(provider);
        dispatch({
            type: 'SET_WEB3',
            id: web3
        })

        let chainId
        // Get connected chain id from Ethereum node
        if(!legacy){
            chainId = await provider.request({ method: 'eth_chainId' });
        } else {
            chainId = await web3.eth.getChainId()
        }
        
        dispatch({
            type: 'SET_CHAINID',
            id: chainId
        })
        // if(chainId !== chain && chainId !== bnb_chain){
        //     console.log("Please change your network to a supported one.")
        // }

        if(legacy){
            web3.eth.getAccounts()
            .then((value) => {
                handleAccountsChanged(value)
            })
            .catch((err) => {
                console.error(err);
            });    
        } else {
            provider.request({ method: "eth_requestAccounts" })
            .then((value) => {
                handleAccountsChanged(value)
            })
            .catch((err) => {
                console.error(err);
            });    
        }
    }

    ///----------------COINBASE WALLET-------------///
    async function initCoinbaseWalletProvider(){
        const coinbaseWallet = new CoinbaseWalletSDK({
            appName: "BLOCKBOOSTED",
            appLogoUrl: "https://blockboosted.com/images/logo_svg.svg",
            darkMode: false
          })

          let provider

          try {
            if(isProd){
                provider = await coinbaseWallet.makeWeb3Provider("https://bsc-dataseed.binance.org", 56)
            } else {
                provider = await coinbaseWallet.makeWeb3Provider("https://data-seed-prebsc-1-s3.binance.org:8545/", 97)
            }
          } catch(e) {
            console.log("Could not get a wallet connection", e);
            return;
          }
        
          await initProvider(provider);
    }

    //----------------PORTIS---------------//
    async function initPortisProvider(){
          const bscProvider = isProd ? {
            nodeUrl: "https://bsc-dataseed.binance.org",
            chainId: 56,
          } : {
            nodeUrl: "https://data-seed-prebsc-1-s3.binance.org:8545/",
            chainId: 97,
          };
          const portis = new Portis('e03ef7e1-2dad-4cb1-ae22-a400dd63143f', bscProvider);
        
          await initProvider(portis.provider, true);
    }

     //----------------BINANCE WALLET---------------//
     async function initBNBWalletProvider(){
        const bsc = isProd ? new BscConnector({
            supportedChainIds: [56]
            }) : new BscConnector({
            supportedChainIds: [97]
            })
            const bsc_provider = await bsc.getProvider()

            if(bsc_provider !== null && bsc_provider !== undefined){
                await initProvider(bsc_provider);
            } else {
                console.log("Please install Binance Wallet Extension")
                setModalState(3)
            }

  }

    //----------------WALLET CONNECT---------------//
    async function initWalletConnectProvider(){
        const provider = isProd ? new WalletConnectProvider({
            rpc: {
              56:"https://bsc-dataseed.binance.org"
            },
            chainId: 56
          }) : new WalletConnectProvider({
            rpc: {
              97: "https://data-seed-prebsc-1-s3.binance.org:8545/",
            },
            chainId: 97
          });
          
          try {
            //  Enable session (triggers QR Code modal)
            let pr = await provider.enable();
          } catch(e) {
            console.log("Could not get a wallet connection", e);
            return;
          }
        
          await initProvider(provider, true);
    }

    //---------------METAMASK------------------//
    async function initMetamaskProvider() {
        
        let provider
        let injectedResp

        try {
            injectedResp = await detectEthereumProvider();
          } catch(e) {
            console.log("Could not find provider", e);
            return;
          }

        if(injectedResp){
            if(injectedResp.providers){
                injectedResp.providers.forEach(async (p) => {
                    if (p.isMetaMask)
                        provider = p;
                  });
            } else {
                provider = injectedResp
            }
            
            await initProvider(provider);
        } else {
            setModalState(1)
            console.log('Please install MetaMask!');
        }        
    }

    const handleAccountsChanged = async(accounts) => {
        if (accounts.length === 0) {
            cancelConnection()
        } else {
            setSelectAddr(accounts[0].toLowerCase())
            auth(accounts[0].toLowerCase())
        }
    }

    const auth = (addr) => {
          //-------------------------REQUEST AUTHENTICATION-------------------------/
          if(firebase.auth().currentUser !== null && firebase.auth().currentUser.uid == addr){
            getDataOnceAuth(firebase.auth().currentUser.uid)
            handleConnectClose()
        } else {
            cancelConnection()
            setModalState(2)
            handleConnectOpen()
        }
        //------------------------------------------------------------------------/
    }


    const createProfile = (address) => {
        let ts = parseInt(Math.round(Date.now() / 1000))
        const user = { username: "", eth_address: address, image: "", bio: "", twitter: "", liked: new Array(), site: "", verified: false };
        const privacy = { email: "", notifications: [{date: ts, text: `Hi there 👋 Welcome to BlockBoosted ! <br>Feel free to <b><a target="_blank" href="https://discord.gg/G9CSA74aCV">join our fabulous Discord community</a></b>. If you have any question, we're here to help 😃`, read:false}] };
        setNotifs([{date: ts, text: `Hi there 👋 Welcome to BlockBoosted ! <br>Feel free to <b><a target="_blank" href="https://discord.gg/G9CSA74aCV">join our fabulous Discord community</a></b>. If you have any question, we're here to help 😃`, read:false}])
        // axios({
        //     method: 'post',
        //     url: 'https://europe-west1-crowdfunding-dev-5f802.cloudfunctions.net/assignProfile',
        //     data: {
        //         profile: user,
        //         privacy: privacy
        //     }
        // }).then(async(response) => {
        //     console.log(response.data);
            
        //     dispatch({
        //         type: 'SET_CURRENT_USER',
        //         id: user
        //     })
        // }).catch(console.log);

        db.collection('profile').doc(user.eth_address).set(user).then(() => {
            db.collection('profile').doc(user.eth_address).collection("privacy").doc(user.eth_address).set(privacy).then(() => {
                dispatch({
                    type: 'SET_CURRENT_USER',
                    id: user
                })
            }).catch((err) => {
                console.log(err);
            })
		}).catch((err) => {
			console.log(err);
		})

        return user;
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

            var web3b = null
            if(bnb_web3Instance != undefined){
                web3b = bnb_web3Instance
            } else {
                if(isProd){
                    web3b = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org"))
                } else {
                    web3b = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-1-s3.binance.org:8545/"))
                }
            }


            //--------------------------------BBST BALANCE CHECKER-------------------------------

            // const bbst_contract = new web3b.eth.Contract(bbstAbi.bbstAbi, bnb_bbstAddr.bnb_bbstAddr);
            // bbst_contract.methods.balanceOf(address).call().then(response => {
            //     console.log(address)
            //     console.log(response)
            //     dispatch({
            //         type: 'SET_BBST_BALANCE',
            //         id: response
            //     })
            // }).catch(console.error)

            

            dispatch({
                type: 'SET_BBST_BALANCE',
                id: 0
            })





        
        if (address != undefined) {

            // getOne('profile', address, function(doc) {
            //     if (doc.exists) {
            //             dispatch({
            //                 type: 'SET_CURRENT_USER',
            //                 id: doc.data()
            //             })
            //     } else {
            //         const user = { username: "", email: "", eth_address: address, image: "", bio: "", twitter: "", liked: new Array() }
            //         postDoc(user.eth_address, 'profile', user,
            //             console.log(user.username + " has been uploaded")
            //         )
            //          dispatch({
            //              type: 'SET_CURRENT_USER',
            //              id: user
            //          })
            //     }
            // })

            db.collection('profile').doc(address).get().then((doc) => {
                if (doc.exists) {
                    dispatch({
                        type: 'SET_CURRENT_USER',
                        id: doc.data()
                    })

                    //----------------GET NOTIFS-------------//
                    db.collection('profile').doc(address).collection("privacy").doc(address).get().then((doc) => {
                        setNotifs(doc.data().notifications)
                    })

                } else {
                    createProfile(address);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }


    const authenticate = async() => {
        let addr = selectAddr.toLowerCase()
        setShowSign(false)

        axios({
            method: 'post',
            url: 'https://europe-west1-crowdfunding-dev-5f802.cloudfunctions.net/getNonceToSign',
            data: {
              address: addr
            }
          })
          .then(async(response) => {
            //----------SIGN NONCE---------//
            web3Instance.eth.personal.sign(`0x${toHex(response.data.message)}`, addr)
            .then(async(sig) => {
                //--------------VERIFY SIG---------//
                axios({
                    method: 'post',
                    url: 'https://europe-west1-crowdfunding-dev-5f802.cloudfunctions.net/verifySignedMessage',
                    data: {
                      address: addr,
                      signature: sig
                    }
                })
                .then(async(tokenResp) => {
                    //---------SIGN WITH TOKEN-------//
                    firebase.auth().signInWithCustomToken(tokenResp.data.token)
                    .then((result) => {
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
    const connect = async() => {
        setModalState(0)
        handleConnectOpen()
    }

    const handleChainChanged = (_chainId) => {
        dispatch({
            type: 'SET_CHAINID',
            id: _chainId
        })
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
                      rpcUrls: ["https://bsc-dataseed.binance.org"],
                      blockExplorerUrls: ['https://bscscan.com']
                    }
                  ]
                });
              }
            }
          }
    }

    const switchToBNBTestnet = async() => {
        if (chainID != "0x61") {
            try {
              await web3Instance.currentProvider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: "0x61" }]
              });
            } catch (err) {
                console.log(err)
                // This error code indicates that the chain has not been added to MetaMask
              if (err.code === 4902) {
                await web3Instance.currentProvider.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainName: 'BNB Smart Chain Testnet',
                      chainId: "0x61",
                      nativeCurrency: { name: 'Binance Coin', decimals: 18, symbol: 'BNB' },
                      rpcUrls: ["https://data-seed-prebsc-1-s3.binance.org:8545/"],
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
            // return  <Button onClick={authenticateWithMetamask} color="primary">
            return  <Button onClick={authenticate} color="primary">
            Accept & sign
        </Button>
        } else {
            return <CircularProgress />
        }
    }

    const displayConnectModal = (x) => {
        switch(x) {
            case 0 : default:
                return <div style={{padding : 15}}>
                    {/* <DialogTitle id="simple-dialog-title">Connect your wallet</DialogTitle> */}
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <b style={{fontSize: 25, color: "#2d2d2d"}}>Connect your wallet</b><br></br>
                            Connect with one of our available wallet providers.
                            </DialogContentText>
                        <List>                            
                            <ListItem autoFocus button onClick={() => initMetamaskProvider()}>
                                <ListItemAvatar>
                                    <Avatar src="/images/wallets/metamask.png" />
                                </ListItemAvatar>
                                <ListItemText primary="Metamask" />
                            </ListItem>

                            <ListItem autoFocus button onClick={() => initWalletConnectProvider()}>
                                <ListItemAvatar>
                                    <Avatar src="/images/wallets/walletconnect.png" />
                                </ListItemAvatar>
                                <ListItemText primary="Wallet Connect" />
                            </ListItem>

                            <ListItem autoFocus button onClick={() => initCoinbaseWalletProvider()}>
                                <ListItemAvatar>
                                    <Avatar src="/images/wallets/coinbasewallet.png" />
                                </ListItemAvatar>
                                <ListItemText primary="Coinbase Wallet" />
                            </ListItem>

                            {/* <ListItem autoFocus button onClick={() => initPortisProvider()}>
                                <ListItemAvatar>
                                    <Avatar src="/images/wallets/portiswallet.png" />
                                </ListItemAvatar>
                                <ListItemText primary="Portis" />
                            </ListItem> */}

                            <ListItem autoFocus button onClick={() => initBNBWalletProvider()}>
                                <ListItemAvatar>
                                    <Avatar src="/images/wallets/binancewallet.png" />
                                </ListItemAvatar>
                                <ListItemText primary="Binance Wallet" />
                            </ListItem>

                        </List>
                        </DialogContent>

                    </div>
            case 1:
                return <div style={{paddingBottom: 15}}>
                <DialogTitle id="alert-dialog-title">{"You don't have Metamask !"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You need to have Metamask installed to access this feature. Metamask is a plugin that serves as your browser Wallet.
                        <br></br>Please install it at <b><a target="_blank" href="https://metamask.io/download.html">metamask.io</a></b>.
                    </DialogContentText>
                    </DialogContent>
                </div>
    
            case 2: //border:"4px solid #45ce6e", 
              return <div style={{justifyContent:'center', textAlign:'center', padding : 15}}>
              <DialogTitle id="alert-dialog-title"><b>{"Welcome to BlockBoosted !"}</b></DialogTitle>
                    <DialogContent>
                        <img style={{height: 65}} src="/images/bblogofull.png" />
                        <br></br><br></br>
                    <DialogContentText id="alert-dialog-description">
                        <i style={{fontSize: 12}}>Address : <br className="go_to_line_small"></br><span className="user-address3">{selectAddr}</span></i>
                    </DialogContentText>

                    <DialogContentText id="alert-dialog-description">
                        By connecting your wallet and using BlockBoosted, you agree to our <a target="_blank" href="https://blockboosted.com/terms">Terms of Service</a> and <a target="_blank" href="https://blockboosted.com/privacy">Privacy Policy</a>. Please sign this message to authenticate.
                    </DialogContentText>
                    
                    <DialogActions>
                        {showSignBtn()}
                        <Button onClick={() => {cancelConnection(); handleConnectClose()}} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                    </DialogContent>
              </div>
             case 3:
                return <div style={{paddingBottom: 15}}>
                <DialogTitle id="alert-dialog-title">{"You don't have Binance Wallet installed !"}</DialogTitle>
                    <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You need the Binance Wallet extension to access this feature.
                        <br></br>Please install it at <b><a target="_blank" href="https://www.bnbchain.org/en/binance-wallet">bnbchain.org/en/binance-wallet</a></b>.
                    </DialogContentText>
                    </DialogContent>
                </div>
        }
    }



    const showProfile = () => {
        if(connected && currentUser != undefined){
            if(currentUser.eth_address === userAddr){
                let nb = notifs.filter(a => a.read == false).length
            return (
                <>
                <div style={{marginLeft: 2, display:'flex', alignItems:'center'}}>
                    <li className="nav-item" style={{textAlign:"center"}}>
                    <Link href="#">
                        <a onClick={e => e.preventDefault()} className="nav-link">
                        <StyledBadge badgeContent={nb}>
                            <ProfileNav user={currentUser}/>                     
                        </StyledBadge>

                            {/* <Icon.ChevronDown /> */}
                        </a>
                    </Link>

                        <ul className="dropdown-menu">
                            <li className="nav-item">
                                <Link href={`/user/${userAddr}`} activeClassName="active">
                                    <a onClick={toggleNavbar} className="nav-link">View Profile</a>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <Link href="/profile" activeClassName="active">
                                    <a onClick={toggleNavbar} className="nav-link">Edit Profile</a>
                                </Link>
                            </li>

                            <li className="nav-item">
                                <StyledBadgeDrop badgeContent={nb}>
                                    <a onClick={handleNotifModalOpen} style={{cursor:'pointer'}} className="nav-link">Notifications</a>
                                </StyledBadgeDrop>
                            </li>

                            <li className="nav-item">
                                    <a style={{cursor:'pointer'}} onClick={() => {onDisconnect(); toggleNavbar()}} className="nav-link">Log out</a>
                            </li>
                        </ul>
                    </li>

                    {/* <li className="nav-item" style={{textAlign:"center"}}>
                        {showNotifNumber()}
                    </li> */}
                </div>
                {/* {showCurrNet()} */}
            </>
            )}
        }
    }

    const returnSwitch = () => {
        if(isProd){
            return switchToBNB()                   // !!!!!!!!!!!!!!!!!!!!!!!!!!! CHANGER TO SWITCH TO BNB !!!!!!!!!!!
        } else {
            return switchToBNBTestnet()
        }
    }

    const showCurrNet = () => {
        return <li className="nav-item">
        {/* <Chip variant="outlined" style={{height: 40, background:"none", border:"none"}} avatar={<Avatar sizes='medium' alt='avatar' src={"/images/cryptoicons/ethblack.svg"} />} label={<section style={{display:"flex"}}>
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
                        {returnSwitch()}
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
        if(switchBarShouldBeShown()){
            if(showAppBar){
                return <div>
                <AppBar position="static" style={{marginTop: -10, marginBottom:10, background:'#F3BA2F', justifyContent:'center', alignItems:'center'}}> 
                    <Typography style={{color: 'white', padding: "6px 3px", fontSize: 13, textAlign: 'center'}}>
                        You aren't connected to a supported network. Please <b><a style={{textDecoration: "underline", cursor: "pointer"}} onClick={() => returnSwitch()}>switch to BNB Smart Chain</a></b>.
                    </Typography>
                </AppBar>
            </div>
            } else {
                return <div>
                <AppBar position="static" style={{marginTop: -15, marginBottom:10, background:'#F3BA2F', justifyContent:'center', alignItems:'center'}}> 
                    <Typography style={{color: 'white', padding: "6px 3px", fontSize: 13, textAlign: 'center'}}>
                        You aren't connected to a supported network. Please <b><a style={{textDecoration: "underline", cursor: "pointer"}} onClick={() => returnSwitch()}>switch to BNB Smart Chain</a></b>.
                    </Typography>
                </AppBar>
            </div>
            }
            
        }
    }

    const switchBarShouldBeShown = () => {
        return (chainID != bnb_chain && connected)
    }

    const showAppBarFct = () => {
        if(showAppBar){
            return <div>
            <AppBar position="static" style={{marginTop: -15, marginBottom:10, background:'#d84b53', justifyContent:'center', alignItems:'center'}}> 
                
                <div style={{display:"flex", justifyContent:'center', alignItems:'center'}}>
                    <Typography style={{color: 'white', padding: "6px 3px", fontSize: 13, textAlign: 'center'}}>
                    <b>Welcome to <a target="_blank" href="https://medium.com/@blockboosted"style={{color:'white', textDecoration: "underline", cursor: "pointer"}}>BLOCKBOOSTED TIP</a></b> 🎉
                    </Typography>
                    <div style={{marginLeft: 10, width: 17}}>
                        <div style={{color:"white", cursor: 'pointer', height: '100%', width: '100%'}} onClick={() => setShowAppBar(false)}>✖</div>
                    </div>
                </div>
                
            </AppBar>
        </div>
        }
    }

    const addBottomMargin = () => {
        if(showAppBar && !switchBarShouldBeShown() || switchBarShouldBeShown() && !showAppBar){
            return <div style={{marginBottom: 31.5}}>
            </div>
        } else if(showAppBar && switchBarShouldBeShown()){
            return <div style={{marginBottom: 63}}>
            </div>
        }
    }

    const dialogNotifs = () => {
        return <Dialog
        style={{marginTop:85}}
        open={openNotifModal}
        onClose={handleNotifModalClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Notifications</DialogTitle>
        {showNotifContent()}
        
        <DialogActions>
          <Button onClick={handleNotifModalClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    }

    const showNotifContent = () => {
        if(notifs.length == 0){
            return <DialogContent>
            <DialogContentText>
                You have no notifications.
            </DialogContentText>
          </DialogContent>
        } else {
            return <DialogContent>
              {notifs.sort((a, b) => b.date - a.date).map(
                  (e) => <SimpleNotifCard onCloseModal={handleNotifModalClose} key={e.date} notif={e}/>
                )}
          </DialogContent>
        }
    }

    const displayNavbar = () => {
        if(router.pathname !='/campaigns/widget/[id]')  {
//#c679e3
        //#44ce6f
        return <>
        <header id="header" className="headroom" style={{marginBottom:50}}>
            {showAppBarFct()}
            {showSwitchNetworkBar()}
            <div className="startp-nav">
                <div className="container">
                    <nav className="navbar navbar-expand-md navbar-light">
                        <Link href="/">
                            <a onClick={toggleNavbar} className="navbar-brand">
                                {/* <img src="/images/logo_svg-cropped_crea.svg" className="main_logo_navbar" alt="logo" /> */}
                                <img src="/images/logo1png.png" className="main_logo_navbar" alt="logo" />

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
                        {/* <div className="autocomplete-container"><SearchIcon style={{marginTop: 10, marginLeft: 5, marginRight: 5}}/><AutoCompleteSearchBar/></div> */}

                            <ul className="navbar-nav ms-auto" style={{alignItems:'center'}}>

                                {/* //----------------CONNECT MODAL---------------// */}

                                <Dialog className="dialogResponsive" onClose={handleConnectClose} aria-labelledby="simple-dialog-title" open={openConnect}>
                                    {displayConnectModal(modalState)}
                                </Dialog>

                                {/* //----------------CONNECT MODAL END---------------// */}



                                {dialogNotifs()}

                                <li className="nav-item create-only-small">
                                    <Link href={"/create"} activeClassName="active">
                                        <a onClick={toggleNavbar} className="nav-link">Create</a>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link href={"https://blockboosted.com"} activeClassName="active">
                                        <a onClick={toggleNavbar} className="nav-link">Crowdfunding</a>
                                    </Link>
                                </li>

                                <li className="nav-item">
                                    <Link href={"https://blockboosted.com/token"} activeClassName="active">
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
                                        pathname: "/explore",
                                        // query: {
                                        //     id: "all",
                                        // }
                                    }} activeClassName="active">
                                        <a onClick={toggleNavbar} className="nav-link">Explore</a>
                                    </Link>
                                </li>
                                

                                {showProfile()}



                            </ul>
                        </div>

                        <div className="others-option" style={{alignItems:'center'}}>

                            <Link href="/create">
                                <a className="btn btn-secondary btn-not-displayed create-only-big">Create</a>
                            </Link>

                            {isConnected()}
                        </div>
                    </nav>
                </div>
            </div>
        </header>

        {addBottomMargin()}
        </>
        } else {
            return null
        }
    }

    return (
        displayNavbar()
    );
}

export default Navbar;