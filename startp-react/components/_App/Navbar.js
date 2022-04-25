import React from "react"
import Link from '@/utils/ActiveLink'
import * as Icon from 'react-feather'
import { useSelector, useDispatch } from 'react-redux'
const Web3 = require('web3');
import Avatar from '@material-ui/core/Avatar';

import detectEthereumProvider from '@metamask/detect-provider';
import { postDoc, getOne } from 'firebase-crowdfund/queries'
import AutoCompleteSearchBar from "../Common/AutoCompleteSearchBar";
import SearchIcon from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import bbstAbi from '@/components/ContractRelated/BbstAbi'
import bbstAddr from '@/components/ContractRelated/BbstAddr'
import {chain} from '@/utils/chain'
import {poly_chain} from '@/utils/poly_chain'
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ChipUser from "../Common/ChipUser";
import ProfileNav from "../Common/ProfileNav";
import Chip from '@material-ui/core/Chip';

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


const Navbar = () => {

    const classes = useStyles();

    const cart = useSelector((state) => state.cart)
    const [menu, setMenu] = React.useState(true)
    const [connected, setConnected] = React.useState(false)
    const dispatch = useDispatch()
    const userAddr = useSelector((state) => state.address)
    const currentUser = useSelector((state) => state.currentUser)
    const [providerDetected, setProviderDetected] = React.useState(false)
    const chainID = useSelector((state) => state.chainID)
    const [open, setOpen] = React.useState(false);
    const eth_web3Instance = useSelector((state) => state.eth_web3Instance)

    const handleClickOpen = () => {
      setOpen(true);
    };

    const componentWillUnmount = () => {
        ethereum.removeListener('accountsChanged', handleAccountsChanged);
        ethereum.removeListener('chainChanged', handleChainChanged);
    }
  
    const handleClose = () => {
      setOpen(false);
    };
  
 
    const toggleNavbar = () => {
        setMenu(!menu)
    }

    async function initProvider(){
        const provider = await detectEthereumProvider();

        if (provider) {
            setProviderDetected(true)
            startApp(provider); // Initialize your app
            // console.log('Provider found')
        } else {
            setProviderDetected(false)
            console.log('Please install MetaMask!');
        }
    }

    async function startApp(provider) {
        // If the provider returned by detectEthereumProvider is not the same as
        // window.ethereum, something is overwriting it, perhaps another wallet.

        var web3poly = new Web3(new Web3.providers.HttpProvider("https://rpc-mumbai.maticvigil.com/"))
            dispatch({
                type:'SET_WEB3POLY',
                id: web3poly
            })
            var web3eth = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/391e7c4cd5274ef8a269414b4833bade"))
            dispatch({
                type:'SET_WEB3ETH',
                id: web3eth
            })

            
        if (provider !== window.ethereum) {
            console.error('Do you have multiple wallets installed?');
        }
        // Access the decentralized web!
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        dispatch({
            type: 'SET_CHAINID',
            id: chainId
        })
        if(chainId !== chain && chainId !== poly_chain){
            console.log("Please change your network to a supported one.")
        }

        ethereum.on('chainChanged', handleChainChanged);

        ethereum
        .request({ method: 'eth_accounts' })
        .then((value) => {
            handleAccountsChanged(value)
            localStorage.setItem('current_address', value[0])
        })
        .catch((err) => {
            // Some unexpected error.
            // For backwards compatibility reasons, if no accounts are available,
            // eth_accounts will return an empty array.
            console.error(err);
        });

        // Note that this event is emitted on page load.
        // If the array of accounts is non-empty, you're already
        // connected.
        ethereum.on('accountsChanged', handleAccountsChanged);


    }

    // For now, 'eth_accounts' will continue to always return an array
    const handleAccountsChanged = async(accounts) => {
        if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log('Please connect to MetaMask.');
        dispatch({
            type: 'SET_CONNECTED',
            id: false
        })
        } else {
            // console.log("in accounts changed")
            dispatch({
                type: 'SET_CONNECTED',
                id: true
            })
            dispatch({
                type: 'SET_ADDRESS',
                id: accounts[0]
            })

            var web3 = new Web3(window.ethereum)
            dispatch({
                type: 'SET_WEB3',
                id: web3
            })
            
            const chainId = await ethereum.request({ method: 'eth_chainId' });
                // console.log("cheching BBST balance...")
                var web3eth = null
                if(eth_web3Instance != undefined){
                    web3eth = eth_web3Instance
                } else {
                    web3eth = new Web3(new Web3.providers.HttpProvider("https://rinkeby.infura.io/v3/391e7c4cd5274ef8a269414b4833bade"))
                }
                const bbst_contract = new web3eth.eth.Contract(bbstAbi.bbstAbi, bbstAddr.bbstAddr);
                bbst_contract.methods.balanceOf(accounts[0]).call().then(response => {
                    // console.log('response', response)
                    dispatch({
                        type: 'SET_BBST_BALANCE',
                        id: response
                    })
                    // console.log(response)
                }).catch(console.error)
            
            
            

            if (accounts[0] != undefined) {
                getOne('profile', accounts[0], function(doc) {
                    if (doc.exists) {
                            dispatch({
                                type: 'SET_CURRENT_USER',
                                id: doc.data()
                            })
                            // console.log(doc.data(), "doc.data navbar")
                    } else {
                        const user = { username: "", email: "", eth_address: accounts[0], image: "", bio: "", twitter: "", liked: new Array() }
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
    }

    const connect = () => {
        if(providerDetected){
            ethereum
            .request({ method: 'eth_requestAccounts' })
            .then((value) => {
                handleAccountsChanged(value);
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
        } else {
            console.log("Install Metamask.io")
            handleClickOpen()
        }

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
        initProvider();
            // componentWillUnmount
            return () => {
                ethereum.removeListener('accountsChanged', handleAccountsChanged);
                ethereum.removeListener('chainChanged', handleChainChanged);
            }
    }, [])

    const isConnected = () => {
        if (!useSelector((state) => state.metamask_connected)) {
            return (
                <>
                <button type="submit" className="btn btn-secondary" onClick={() => connect()}>Connect Wallet</button>
                </>
            )
        }
    }

    const showCurrentNetwork = () => {
        if(chainID == chain){   // ETH
            return <Link href="#">
            <a onClick={e => e.preventDefault()} className="nav-link">
                <div style={{display:"flex"}}><img style={{height: 20}} src="/images/cryptoicons/eth.svg" /> <span style={{marginLeft: 5}}>Ethereum</span> <Icon.ChevronDown /></div>
            </a>
            </Link>
        } else if(chainID == poly_chain) {      // POLYGON MAINNET
            return <Link href="#">
            <a onClick={e => e.preventDefault()} className="nav-link">
                <div style={{display:"flex"}}><img style={{height: 20}} src="/images/cryptoicons/matic.svg" /> <span style={{marginLeft: 5}}>Polygon</span> <Icon.ChevronDown /></div>
            </a>
            </Link>
        } else {
            return <Link href="#">
            <a onClick={e => e.preventDefault()} className="nav-link">
                <div style={{display:"flex"}}><Icon.AlertCircle/> <span style={{marginLeft: 5}}>Unknown</span> <Icon.ChevronDown /></div>
            </a>
            </Link>
        }
    }

    const switchToPolygon = async() => {
        if (window.ethereum.networkVersion !== "0x89") {
            try {
              await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: "0x89" }]
              });
            } catch (err) {
                // This error code indicates that the chain has not been added to MetaMask
              if (err.code === 4902) {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainName: 'Polygon Mainnet',
                      chainId: "0x89",
                      nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
                      rpcUrls: ['https://polygon-rpc.com/']
                    }
                  ]
                });
              }
            }
          }
    }

    const switchToMumbai = async() => {
        if (window.ethereum.networkVersion !== "0x13881") {
            try {
              await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: "0x13881" }]
              });
            } catch (err) {
                // This error code indicates that the chain has not been added to MetaMask
              if (err.code === 4902) {
                await window.ethereum.request({
                  method: 'wallet_addEthereumChain',
                  params: [
                    {
                      chainName: 'Polygon Mumbai',
                      chainId: "0x13881",
                      nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
                      rpcUrls: ["https://rpc-mumbai.maticvigil.com/"]
                    }
                  ]
                });
              }
            }
          }
    }

    const switchToRinkeby = async() => {
        if (window.ethereum.networkVersion !== "0x4") {
            {
              await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: "0x4" }]
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



    const showProfile = () => {
        if(useSelector((state) => state.metamask_connected && currentUser != undefined)){
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


                <li className="nav-item">
                    {/* <Chip variant="outlined" style={{marginTop: -8, height: 40, background:"none", border:"none"}} avatar={<Avatar sizes='medium' alt='avatar' src={"/images/cryptoicons/ethblack.svg"} />} label={<section style={{display:"flex"}}>
                       <div style={{}}>Ethereum</div> 
                       <Icon.ChevronDown />

                        </section>} /> */}
                        {showCurrentNetwork()}
                        <ul className="dropdown-menu">
                            <li className="nav-item">
                                <Link href="#">
                                <a onClick={e => {
                                    e.preventDefault();
                                    switchToRinkeby()                   // !!!!!!!!!!!!!!!!!!!!!!!! CHANGER TO SWITCH TO ETH !!!!!!!!!!!!!!!!!
                                    }} className="nav-link">
                                    <div style={{display:"flex"}}><img style={{height: 20}} src="/images/cryptoicons/eth.svg" /> <span style={{marginLeft: 5}}>Ethereum</span></div>
                                </a>
                                </Link>                           
                            </li>

                            <li className="nav-item">
                                <Link href="#">
                                <a onClick={e => {
                                    e.preventDefault();
                                    switchToMumbai()                   // !!!!!!!!!!!!!!!!!!!!!!!!!!! CHANGER TO SWITCH TO POLYGON !!!!!!!!!!!
                                    }} className="nav-link">
                                    <div style={{display:"flex"}}><img style={{height: 20}} src="/images/cryptoicons/matic.svg" /> <span style={{marginLeft: 5}}>Polygon</span></div>
                                </a>
                                </Link>
                            </li>                            
                        </ul>
                {/* <img style={{marginTop: -8, height: 40, border: "1.5px solid #c3c2c4", padding: 4, borderRadius: 12}} src={'/images/cryptoicons/ethblack.svg'}/> */}
                </li>
            </>



            )
                            
            }
        }
    }

    // async function connectToMetamask(){
    //     let c = await loadWeb3();
    //     setConnected(c);
    //     const addr = await web3.eth.getAccounts()
    //     setAddress(addr[0])

    //     dispatch({
    //         type: 'SET_ADDRESS',
    //         id: addr[0]
    //     })
    // }
 
    const classOne = menu ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = menu ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';


//#c679e3 purple
    return (
        
        <header id="header" className="headroom">
            {/* <div className={classes.root}>
                <AppBar position="static" style={{marginTop: -15, marginBottom:10, background:'#44cf6e', justifyContent:'center', alignItems:'center'}}> 
                    <Typography style={{color: 'white'}}>
                        This is an alpha version running on RINKEBY test network !
                    </Typography>
                </AppBar>
            </div> */}
            <div className="startp-nav">
                <div className="container">
                    <nav className="navbar navbar-expand-md navbar-light">
                        <Link href="/">
                            <a onClick={toggleNavbar} className="navbar-brand">
                                <img src="/images/bb_logo_full_2.png" alt="logo" />
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
                               

                                <Dialog
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"You don't have Metamask !"}</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        You need to have Metamask installed to access this feature. Metamask is a browser plugin that serves as an Ethereum Wallet.
                                        <br></br><br></br>Please install it at <b><a target="_blank" href="https://metamask.io/download.html">metamask.io</a></b>.
                                    </DialogContentText>
                                    </DialogContent>
                                </Dialog>

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

                        <div className="others-option">

                            {/* <Link href="/cart">
                                <a className="cart-wrapper-btn">
                                    <Icon.ShoppingCart /> 
                                    <span>{cart.length}</span>
                                </a>
                            </Link> */}

                            <Link href="/form-campaign">
							    <a className="btn btn-secondary">Create</a>
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