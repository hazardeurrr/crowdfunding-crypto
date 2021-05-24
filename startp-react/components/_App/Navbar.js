import React from "react"
import Link from '@/utils/ActiveLink'
import * as Icon from 'react-feather'
import { useSelector, useDispatch } from 'react-redux'
const Web3 = require('web3');

import detectEthereumProvider from '@metamask/detect-provider';
import { postDoc, getOne } from 'firebase-crowdfund/queries'
import AutoCompleteSearchBar from "../Common/AutoCompleteSearchBar";
import SearchIcon from '@material-ui/icons/Search';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import bbstabi from '@/utils/bbstabi'

const Navbar = () => {
    const cart = useSelector((state) => state.cart)
    const [menu, setMenu] = React.useState(true)
    const [connected, setConnected] = React.useState(false)
    const dispatch = useDispatch()
    const userAddr = useSelector((state) => state.address)
    const currentUser = useSelector((state) => state.currentUser)
    const [providerDetected, setProviderDetected] = React.useState(false)

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
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
            console.log('Provider found')
        } else {
            setProviderDetected(false)
            console.log('Please install MetaMask!');
        }
    }

    async function startApp(provider) {
        // If the provider returned by detectEthereumProvider is not the same as
        // window.ethereum, something is overwriting it, perhaps another wallet.
        if (provider !== window.ethereum) {
            console.error('Do you have multiple wallets installed?');
        }
        // Access the decentralized web!
        const chainId = await ethereum.request({ method: 'eth_chainId' });
        dispatch({
            type: 'SET_CHAINID',
            id: chainId
        })
        if(chainId !== '0x1'){
            console.log("Please change your network to Ethereum Mainnet on Metamask")
        }
''
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
    const handleAccountsChanged = (accounts) => {
        if (accounts.length === 0) {
        // MetaMask is locked or the user has not connected any accounts
        console.log('Please connect to MetaMask.');
        dispatch({
            type: 'SET_CONNECTED',
            id: false
        })
        } else {
            console.log("in accounts changed")
            dispatch({
                type: 'SET_CONNECTED',
                id: true
            })
            dispatch({
                type: 'SET_ADDRESS',
                id: accounts[0]
            })

            var web3 = new Web3(window.ethereum)
            const bbst_contract = new web3.eth.Contract(bbstabi.abi, '0xDd1Ad9A21Ce722C151A836373baBe42c868cE9a4');
            bbst_contract.methods.balanceOf(accounts[0]).call().then(response => {
                console.log('response', response)
                dispatch({
                    type: 'SET_BBST_BALANCE',
                    id: response
                })
            }).catch(console.error)



            if (userAddr != undefined) {
                console.log('user address',userAddr)
                getOne('profile', userAddr, function(doc) {
                    if (doc.exists) {
                        // console.log('data', doc.data())     // afiche bien l'objet avec le bon user
                        // console.log("Connected");
                        if(currentUser == undefined){

                            dispatch({
                                type: 'SET_CURRENT_USER',
                                id: doc.data()
                            })
                        }
                    } else {
                        const user = { username: "", email: "", eth_address: userAddr, image: "", bio: "", twitter: "", verif_twitter: false, website: "", liked: new Array() }
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
        window.location.reload();
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
        //connectToMetamask()
    })

    const isConnected = () => {
        if (!useSelector((state) => state.metamask_connected)) {
            return (
                <>
                <button type="submit" className="btn btn-primary" onClick={() => connect()}>Connect Wallet</button>
                </>
            )
        }
    }

    const showProfile = () => {
        if(useSelector((state) => state.metamask_connected)){
            return (
                <>
                    <li className="nav-item">
                    <Link href="#">
                        <a onClick={e => e.preventDefault()} className="nav-link">
                            Profile <Icon.ChevronDown />
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

                </>
            )
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

    return (
        
        <header id="header" className="headroom">
            <div className="startp-nav">
                <div className="container">
                    <nav className="navbar navbar-expand-md navbar-light">
                        <Link href="/it-startup">
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