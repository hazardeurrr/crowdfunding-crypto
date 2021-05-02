import React from "react"
import Link from '@/utils/ActiveLink'
import * as Icon from 'react-feather'
import { useSelector, useDispatch } from 'react-redux'
const Web3 = require('web3');

import loadWeb3 from "@/components/ITStartup/MetaMaskConnection"
import detectEthereumProvider from '@metamask/detect-provider';
import { postDoc, getOne } from 'firebase-crowdfund/queries'


const Navbar = () => {
    const cart = useSelector((state) => state.cart)
    const [menu, setMenu] = React.useState(true)
    const [connected, setConnected] = React.useState(false)
    const dispatch = useDispatch()
    const userAddr = useSelector((state) => state.address)

 
    const toggleNavbar = () => {
        setMenu(!menu)
    }

    async function initProvider(){
        const provider = await detectEthereumProvider();

        if (provider) {
            startApp(provider); // Initialize your app
        } else {
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
            dispatch({
                type: 'SET_CONNECTED',
                id: true
            })
            dispatch({
                type: 'SET_ADDRESS',
                id: accounts[0]
            })
        }
    }

    const connect = () => {
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

        getOne('profile', userAddr, function(doc) {
            if (doc.exists) {
                console.log("Connected");
            } else {
                const user = { username: "", email: "", eth_address: userAddr, image: "", bio: "", twitter: "", verif_twitter: false, website: "" }
                postDoc(user.eth_address, 'profile', user,
                    console.log(user.username + " has been uploaded")
                )
            }
        })

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
        if (useSelector((state) => state.metamask_connected)) {
            return (
                <>
                
                <Link href="/setProfile">
                    <a className="btn btn-light">Profile</a>
                </Link>

                </>
            )
        }
        else {
            return (
                <>
                <button type="submit" className="btn btn-primary" onClick={() => connect()}>Connect with Metamask</button>
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
                                <img src="/images/logo.png" alt="logo" />
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
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link href="/#" activeClassName="active">
                                        <a onClick={e => e.preventDefault()} className="nav-link">
                                            Home <Icon.ChevronDown />
                                        </a>
                                    </Link>

                                    <ul className="dropdown-menu">
                                        <li className="nav-item">
                                            <Link href="/it-startup" activeClassName="active">
                                                <a onClick={toggleNavbar} className="nav-link">IT Startup</a>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link href="/it-startup-2" activeClassName="active">
                                                <a onClick={toggleNavbar} className="nav-link">IT Startup Two</a>
                                            </Link>
                                        </li>
 
                                        <li className="nav-item">
                                            <Link href="/iot" activeClassName="active">
                                                <a onClick={toggleNavbar} className="nav-link">IOT</a>
                                            </Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link href="/form-campaign" activeClassName="active">
                                                <a onClick={toggleNavbar} className="nav-link">Create a campain</a>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link href="/hosting" activeClassName="active">
                                                <a onClick={toggleNavbar} className="nav-link">Hosting</a>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link href="/machine-learning" activeClassName="active">
                                                <a onClick={toggleNavbar} className="nav-link">Machine Learning</a>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link href="/machine-learning-2" activeClassName="active">
                                                <a onClick={toggleNavbar} className="nav-link">Machine Learning 2</a>
                                            </Link>
                                        </li> 

                                        <li className="nav-item">
                                            <Link href="/bigdata-analytics" activeClassName="active">
                                                <a onClick={toggleNavbar} className="nav-link">Bigdata Analytics</a>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link href="/digital-agency" activeClassName="active">
                                                <a onClick={toggleNavbar} className="nav-link">Digital Agency</a>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link href="/digital-agency-portfolio" activeClassName="active">
                                                <a onClick={toggleNavbar} className="nav-link">Digital Agency Portfolio</a>
                                            </Link>
                                        </li>
  
                                        <li className="nav-item">
                                            <Link href="/pc-repair" activeClassName="active">
                                                <a onClick={toggleNavbar} className="nav-link">PC Repair</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>

                                <li className="nav-item">
                                    <Link href="/#">
                                        <a onClick={e => e.preventDefault()} className="nav-link">
                                            About <Icon.ChevronDown />
                                        </a>
                                    </Link> 

                                    <ul className="dropdown-menu">
                                        <li className="nav-item">
                                            <Link href="/about-1" activeClassName="active">
                                                <a onClick={toggleNavbar} className="nav-link">About Style 1</a>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link href="/about-2" activeClassName="active">
                                                <a onClick={toggleNavbar} className="nav-link">About Style 2</a>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link href="/about-3" activeClassName="active">
                                                <a onClick={toggleNavbar} className="nav-link">About Style 3</a>
                                            </Link>
                                        </li>
                                    </ul>
                                </li>

                                <li className="nav-item">
                                    <Link href="/#">
                                        <a onClick={e => e.preventDefault()} className="nav-link">
                                            Pages <Icon.ChevronDown />
                                        </a>
                                    </Link>

                                    <ul className="dropdown-menu">
                                        <li className="nav-item">
                                            <Link href="/#" activeClassName="active">
                                                <a onClick={e => e.preventDefault()} className="nav-link">
                                                    Features <Icon.ChevronDown />
                                                </a>
                                            </Link>

                                            <ul className="dropdown-menu">
                                                <li className="nav-item">
                                                    <Link href="/features" activeClassName="active">
                                                        <a onClick={toggleNavbar} className="nav-link">Features</a>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link href="/feature-details" activeClassName="active">
                                                        <a onClick={toggleNavbar} className="nav-link">Features Details</a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>

                                        <li className="nav-item">
                                            <Link href="/#" activeClassName="active">
                                                <a onClick={e => e.preventDefault()} className="nav-link">
                                                    Services <Icon.ChevronDown />
                                                </a>
                                            </Link>

                                            <ul className="dropdown-menu">
                                                <li className="nav-item">
                                                    <Link href="/services-1" activeClassName="active">
                                                        <a onClick={toggleNavbar} className="nav-link">Services Style 1</a>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link href="/services-2" activeClassName="active">
                                                        <a onClick={toggleNavbar} className="nav-link">Services Style 2</a>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link href="/services-3" activeClassName="active">
                                                        <a onClick={toggleNavbar} className="nav-link">Services Style 3</a>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link href="/services-4" activeClassName="active">
                                                        <a onClick={toggleNavbar} className="nav-link">Services Style 4</a>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link href="/services-5" activeClassName="active">
                                                        <a onClick={toggleNavbar} className="nav-link">Services Style 5</a>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link href="/service-details" activeClassName="active">
                                                        <a onClick={toggleNavbar} className="nav-link">Services Details</a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>

                                        <li className="nav-item">
                                            <Link href="/feedback" activeClassName="active">
                                                <a onClick={toggleNavbar} className="nav-link">Feedback</a>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link href="/#" activeClassName="active">
                                                <a onClick={e => e.preventDefault()} className="nav-link">
                                                    Projects <Icon.ChevronDown />
                                                </a>
                                            </Link>

                                            <ul className="dropdown-menu">
                                                <li className="nav-item">
                                                    <Link href="/projects-1" activeClassName="active">
                                                        <a onClick={toggleNavbar} className="nav-link">Project Style 1</a>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link href="/projects-2" activeClassName="active">
                                                        <a onClick={toggleNavbar} className="nav-link">Project Style 1</a>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link href="/project-details" activeClassName="active">
                                                        <a onClick={toggleNavbar} className="nav-link">Project Details</a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>

                                        <li className="nav-item">
                                            <Link href="/team" activeClassName="active">
                                                <a onClick={toggleNavbar} className="nav-link">Team</a>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link href="/pricing" activeClassName="active">
                                                <a onClick={toggleNavbar} className="nav-link">Pricing</a>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link href="/#" activeClassName="active">
                                                <a onClick={e => e.preventDefault()} className="nav-link">
                                                    User <Icon.ChevronDown />
                                                </a>
                                            </Link>

                                            <ul className="dropdown-menu">
                                                <li className="nav-item">
                                                    <Link href="/login" activeClassName="active">
                                                        <a onClick={toggleNavbar} className="nav-link">Login</a>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link href="/sign-up" activeClassName="active">
                                                        <a onClick={toggleNavbar} className="nav-link">Sign Up</a>
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link href="/forgot-password" activeClassName="active">
                                                        <a onClick={toggleNavbar} className="nav-link">Forgot Password</a>
                                                    </Link>
                                                </li>
                                            </ul>
                                        </li>
                                    
                                        <li className="nav-item">
                                            <Link href="/faq" activeClassName="active">
                                                <a onClick={toggleNavbar} className="nav-link">FAQ's</a>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link href="/coming-soon" activeClassName="active">
                                                <a onClick={toggleNavbar} className="nav-link">Coming Soon</a>
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link href="/404" activeClassName="active">
                                                <a onClick={toggleNavbar} className="nav-link">404 Error Page</a>
                                            </Link>
                                        </li>
                                    </ul>
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
							    <a className="btn btn-secondary">Create a campaign</a>
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