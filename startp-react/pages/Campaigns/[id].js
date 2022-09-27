import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import * as Icon from 'react-feather';
import Parser from 'html-react-parser';
import Link from '@/utils/ActiveLink'
import ProgressBar from 'react-bootstrap/ProgressBar';
import CampaignSidebar from '@/components/Blog/CampaignSidebar';
import VerifTooltip from '@/components/Common/VerifTooltip';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import ChipUser from '@/components/Common/ChipUser';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useSelector, useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import FlexibleTooltip from '@/components/Common/FlexibleTooltip';
import ShareIcons from '@/components/Common/ShareIcons';
import HeartAnim from '@/components/Common/HeartAnim';
import {getOne} from '../../firebase-crowdfund/queries';
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';
import {chain} from '@/utils/chain'
import {bnb_chain} from '@/utils/bnb_chain'

import RaisedChecker from '@/components/Common/RaisedChecker';
import { MdSentimentVerySatisfied } from 'react-icons/md';
import campaignAbi from '@/components/ContractRelated/CampaignAbi';
import Withdraw from '../../components/Common/withdraw';
import Refund from '../../components/Common/refund';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Custom404 from 'pages/404';
import DOMPurify from 'isomorphic-dompurify';

import { prefixedAddress } from '@/utils/prefix';
import { NoBscProviderError } from '@binance-chain/bsc-connector';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      }
  }));

  
const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
  }))(Tooltip);


const Campaign = (props) => {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [campaign, setCampaign] = React.useState(undefined)
    const [user, setUser] = React.useState(undefined)   // ATTENTION : USER = USER PROFILE OF THE CREATOR OF THE CAMPAIGN
    const [htmlTxt, setHTMLTxt] = React.useState("")
    const [raisedRetrieve, setRaisedRetrieve] = React.useState(false)


    // const campaign = projectList.find(e => e.contract_address == props.address)
    // const raised = Math.random()*100
    // const user = usersListJson.users.find(e => e.eth_address == campaign.creator)


    var now = Date.now() / 1000;
  
    const connected = useSelector((state) => state.metamask_connected)
    const chainID = useSelector((state) => state.chainID)
    const currentUser = useSelector((state) => state.currentUser)
    const metamask_connected = useSelector((state) => state.metamask_connected)
    const userAddr = useSelector((state) => state.address)


    React.useEffect(() => {

       // console.log(props.address)

        // console.log(props)

        getOne('campaignsTest', props.address, function(doc) {
          if (doc.exists) {
            setCampaign(doc.data())
            displayHTMLTxt(doc.data().long_desc)
            // console.log(campaign)
            var addr = doc.data().creator
            getOne('profileTest', addr.toLowerCase(), function(docs) {
                if (docs.exists) {
                    setUser(docs.data())
                } else {
                    // console.log("Document not found")
                }
            })
          } else {
              console.log("Document not found")
          }
        })
    }, [])


    


    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const showTwitter = () => {
        if(user.twitter != ""){
            return <li>
            <a href={`https://twitter.com/${user.twitter}`} target="_blank"><Icon.Twitter />   @{user.twitter}</a>  
            {/* <VerifTooltip toBeChecked={true} media={"Twitter"}/> */}
        </li>
        }
    }

    const showWebsite = () => {
        if(user.site != ""){
            return <li>
            <Icon.Globe /> <a href={user.site} target="_blank">{user.site}</a>
        </li>
        }
    }


    const setRaised = (r) => {
        let c = campaign
        c.raised = r
        setCampaign(c)
        setRaisedRetrieve(true)
    }

    const returnDecToShow = () => {
        if(campaign.currency == "USDC" || campaign.currency == "b_BUSD"){
            return 4
        } else {
            return 8
        }
    }
// reste les progress bar à update

    const showCurrencyWoPrefix = () => {
        if(campaign.currency.includes('_'))
            return campaign.currency.substring(campaign.currency.indexOf('_') + 1);
        else
            return campaign.currency
    }

    const displayRaised = () => {
        // if(metamask_connected){
            // if(chainID == chain){
                return  <RaisedChecker campaign={campaign} callback={setRaised} decToShow={returnDecToShow()}/>
                // <HtmlTooltip
                //     placement="top"
                //     title={
                //     <React.Fragment>
                //         <i>Exact amount : {campaign.raised} {showCurrencyWoPrefix()}</i>
                //     </React.Fragment>
                //     }
                // >
                //      <div><RaisedChecker campaign={campaign} callback={setRaised} decToShow={returnDecToShow()}/></div>
                // </HtmlTooltip>
            
            
            // }
            // else
            //     return "Connect to the right network to see more"
        // }
        // else
        //     return "Connect to see more"
    }

    const timeLeft = () => {

        var timeLeft = campaign.end_date - now;
        var days = Math.floor(timeLeft / 86400); 
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
        // console.log(campaign.title + " => Now : " + now + " / end : " + campaign.end_date + " / timeLeft : " + timeLeft + " / days : " + days + " / hours : " + hours + " / minutes : " + minutes)
        if(campaign.start_date > now){
            let timeTilStart = campaign.start_date - now;
            let daysTilStart = Math.floor(timeTilStart / 86400);
            if(daysTilStart > 0)
                return "Starts in " + daysTilStart.toString() + " day" + SorNot(daysTilStart)
            else
                return "Starts soon !"
        } else if(days > 0){
                return days.toString() + " day" + SorNot(days) +" left"
            } else if(days == 0 && hours > 0){                
                return hours.toString() + " hour" + SorNot(hours) + " left"
            } else if(days == 0 && hours == 0 && minutes >= 0){
                return minutes.toString() + " minute" + SorNot(minutes) + " left"
            } else {
                return "Ended " + Math.abs(days.toString()) + " day" + SorNot(days) + " ago"
            }
        }

    const SorNot = (nb) => {
        if(nb != 0 && nb != -1 && nb != 1){
            return "s"
        } else {
            return ""
        }
    }

    

    const BackButton = () => {
        if(metamask_connected){
            if(campaign.network == chainID){
                if(campaign.end_date > now && campaign.start_date < now){
                    return <Link href={{
                                pathname: "/checkout/[id]",
                                query: {
                                    id: prefixedAddress(campaign.network, campaign.contract_address),
                                    }
                                }}
                                    // as={`/checkout/${campaign.contract_address}`}
                                    >
                            <a className="btn btn-primary">Back this campaign</a>
                            </Link>
                }
            } else {
                return <>
                    <p><Icon.AlertTriangle /> You are not connected to the right network.<br></br>Please switch to {showNetwork()} to back this campaign.</p>
                </>
            }
            
        } else {
            return <>
            <p><Icon.AlertTriangle /> Connect your wallet to donate to this campaign !</p>
            </>
        }
    }

    // const RefundButton = () => {
    //     //on n'affiche pas les boutons de refund au createur de la campagne
    //     if(raisedRetrieve && metamask_connected && chainID == chain){
    //         if(userAddr.toLowerCase() != campaign.creator.toLowerCase()){
    //             if(campaign.end_date < now && campaign.raised < campaign.objective && !campaign.flexible){
    //                 return <Refund campaign={campaign}/>
    //             }
    //         }
    //     }
        
    // }

    const displayProgressBar = () => {
            if(raisedRetrieve){
                if(campaign.end_date > now && campaign.start_date < now){
                  
                    return <ProgressBar variant="green" animated now={(campaign.raised / campaign.objective) * 100}/>

                } else {
                    return <ProgressBar variant="down" now={(campaign.raised / campaign.objective) * 100}/>
                }
            }
        
    }

    // const handleRefund = () => {
    //     if(connected == true && chainID == chain){
    //         //connect to Metamask and check for a refund
    //         console.log("refund logic here")        
    //     } else {
    //             handleDialogOpen()
    //         }
    // }

    const showCats = () => {
        if(campaign.categories.length == 1){
            return campaign.categories[0]
        } else if(campaign.categories.length != 0){
            return `${campaign.categories[0]} & ${campaign.categories[1]}`
        }
    }

    const showHeart = () => {
        if(connected)
            return <HeartAnim key={currentUser} campaign={campaign}/>
    }

    async function displayHTMLTxt(data){
        // console.log(data)
        let txt = await fetch('https://cors-serv.herokuapp.com/'+data).then(r => {
            let b = r.blob().then((a) => a.text().then(h => setHTMLTxt(h)))
    });
    }

    const displayOwnerButtons = () => {
        if(currentUser !== undefined && campaign !== undefined && metamask_connected && chainID == campaign.network){
            if(userAddr.toLowerCase() === campaign.creator.toLowerCase()){
                if(raisedRetrieve){
                    if(campaign.end_date < now){
                         return <Withdraw campaign={campaign}/>
                    } 
                    // else if(campaign.end_date < now) {
                    //     return <div>
                    //     <h4>Unfortunately, your campaign hasn't reached its goal.</h4>
                    //     {/* <button className="btn btn-light" onClick={downloadData}>Download data</button> */}
                    //     </div>
                    // } 
                }
                
            }
        }
    }


    const ShowTxt = () => {
        if(htmlTxt === "" || htmlTxt === undefined){
            return <div>
                    <Skeleton variant="rect" animation='pulse' height={550}/>
                </div>
        } else {
            return sanitizeAndParseHtml(htmlTxt)
        }
    }

    const sanitizeAndParseHtml = (htmlString) => {
        const cleanHtmlString = DOMPurify.sanitize(htmlString, { ADD_TAGS: ["iframe"]}, { ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling'] },
          { USE_PROFILES: { html: true } });
        const html = Parser(cleanHtmlString);
        return html;
}

    const displayCurrency = () => {
        if(raisedRetrieve)
            // return <div style={{marginLeft : 5}}>{showCurrencyWoPrefix()} raised / {parseFloat(campaign.objective)} {showCurrencyWoPrefix()}</div>
            return <div>&nbsp;{showCurrencyWoPrefix()}</div>
    }

    const displayObjective = () => {
        if(raisedRetrieve)
            // return <div style={{marginLeft : 5}}>{showCurrencyWoPrefix()} raised / {parseFloat(campaign.objective)} {showCurrencyWoPrefix()}</div>
            return <p className="justandtextcenter" style={{marginTop: -10, marginBottom: 7}}>raised out of {parseFloat(campaign.objective)} {showCurrencyWoPrefix()}</p>
    }

    const showNetwork = () => {
        if(campaign.network == chain){
            return <>
                <img style={{height: 15, marginTop: -2,marginLeft: 2, marginRight: 0}} src={'/images/cryptoicons/smallethgray.svg'}/> Ethereum
            </>
        } else if(campaign.network == bnb_chain){
            return <>
                <img style={{height: 15, marginTop: -2, marginLeft: 2,marginRight: 1}} src={'/images/cryptoicons/smallbnbgray.svg'}/> BNB Smart Chain
            </>
        }
    }

    const showCurrency = () => {
        if(campaign.currency == "ETH"){
            return <>
                <img style={{height: 18, marginTop: -2, marginLeft: 2,marginRight: 1}} src={'/images/cryptoicons/eth.svg'}/> ETH
            </>
        }  else if(campaign.currency == "b_BUSD"){
            return <>
                <img style={{height: 18, marginTop: -2, marginLeft: 2,marginRight: 1}} src={'/images/cryptoicons/busd.svg'}/> BUSD
            </>
        } else if(campaign.currency == "USDC"){
            return <>
                <img style={{height: 18, marginTop: -2, marginLeft: 2,marginRight: 1}} src={'/images/cryptoicons/usdc.svg'}/> USDC
            </>
        } else if(campaign.currency == "BBST" || campaign.currency == "b_BBST"){
            return <>
                <img style={{height: 18, marginTop: -2, marginLeft: 2,marginRight: 1}} src={'/images/cryptoicons/bbstgrad.png'}/> BBST
            </>
        } else if(campaign.currency == "b_BNB"){
            return <>
                <img style={{height: 18, marginTop: -2, marginLeft: 2, marginRight: 1}} src={'/images/cryptoicons/bnb.svg'}/> BNB
            </>
        }
    }

    const showScan = () => {
        if(campaign.network == chain){
            return <li>
            <Icon.ExternalLink /> <a target="_blank" href={`https://goerli.etherscan.io/address/${campaign.contract_address}`}>See on Etherscan</a>
            </li>
        } else if(campaign.network == bnb_chain){
            return <li>
            <Icon.ExternalLink /> <a target="_blank" href={`https://testnet.bscscan.com/address/${campaign.contract_address}`}>See on BscScan</a>
            </li>
        }
    }

    const displayContent = () => {
        if(campaign != undefined && user != undefined){
            if(!campaign.confirmed){
                return <Custom404 />
            } else {
            return <div>
            <div className="blog-details-area ptb-80">
                <div className="container">
                    <div className="about-area ptb-80">
                        <div className="container-fluid">
                            <div className="row align-items-center">
                            {displayOwnerButtons()}                                   

                                <div className="col-lg-6 col-md-12">
                                    <div className="ml-about-img">
                                        <img src={campaign.main_img} alt="image" />
                                        
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-12">
                                    <div className="ml-about-content">

                                        <span className="sub-title">{showCats()}</span>
                                        <ShareIcons campaign={campaign}/>

                                        

                                        <h2 style={{marginTop: 20, marginBottom: 10}}>{campaign.title}</h2>
                                         <div className="blog-details-desc">
                                            <div className="article-content">
                                                <div className="entry-meta">
                                                    <ul>
                                                        
                                                        <li>     
                                                            <Icon.User />
                                                            <ChipUser style={{marginRight: 0}}user={user}/>
                   
                                                        </li>
                                                        {/* <VerifTooltip toBeChecked={user.verified}/> */}

                                                        
                                                  
                                                        {/* {showTwitter()} */}

                                                    </ul>
                                                   
                                                </div>              
                                            </div>
                                        </div>
                                        <div className="bar"></div>
                                        <div className="blog-details-desc">
                                            <div className="article-content">
                                                <div className="entry-meta">
                                                    <ul>
                                                        
                                                        <li>
                                                           <Icon.DollarSign /> Currency : {showCurrency()}
                                                       </li>
                                                       <li>
                                                           <Icon.Globe /> Network : {showNetwork()}
                                                       </li>
                                                        
                                                        {/* <li><FlexibleTooltip campaign={campaign}/></li> */}
                                                    </ul>      
                                                </div>              
                                            </div>
                                        </div>

                                    
                                        <p style={{fontSize: 15, marginBottom: 30}}>{campaign.small_description}</p>
                                        <h5 className="justandtextcenter" style={{display:"flex"}}>{displayRaised()} {displayCurrency()}</h5> 
                                        {displayObjective()}
                                        {displayProgressBar()}
                                        <div className="blog-details-desc justandtextcenter">
                                            <div className="article-content">
                                                <div className="entry-meta">
                                                      
                                                    <ul>
                                                        <li style={{color:'#6084a4'}}>
                                                            <Icon.Clock /> {timeLeft()}
                                                        </li>
                                                        {/* <li>
                                                            <Icon.Globe /> Network : {showNetwork()}
                                                        </li> */}
                                                            {showScan()}
                                                        
                                                    </ul>                                                 


                                                </div>              
                                            </div>
                                        </div>

                                        <div className="justandtextcenter" style={{display: "flex"}}>
                                            {BackButton()}
                                            {/* {RefundButton()} */}

                                            
                                            {showHeart()}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Dialog
                        className='dialogResponsive'
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"You are not connected to a supported network"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please connect your wallet. If you are already connected, be sure to select a supported network.
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Close
                        </Button>
                        </DialogActions>
                    </Dialog>

                   

                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="blog-details-desc">

                                <div className="article-content">  

                                
                                <div className="separator"></div>
                                    <div id="htmlDisplay">
                                        {ShowTxt()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12">
                            <CampaignSidebar project = {campaign}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        }
    } else {
                // return <CircularProgress style={{marginTop: 100}}/>
                return <div>
            <div className="blog-details-area ptb-80">
                <div className="container">
                    <div className="about-area ptb-80">
                        <div className="container-fluid">
                            <div className="row align-items-center">
                                <div className="col-lg-6 col-md-12">
                                    <div className="ml-about-img">
                                        <Skeleton animation='pulse' variant="rect" height={350} />

                                        
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-12">
                                    <div className="ml-about-content">

                                        <span className="sub-title">
                                            <Skeleton animation='pulse' variant="text" width={100}/>
                                        </span>
                                        {/* <ShareIcons campaign={campaign}/> */}

                                        <h2 style={{marginTop: 20, marginBottom: 10}}><Skeleton animation='pulse' variant="text"/></h2>
                                         <div className="blog-details-desc">
                                            <div className="article-content">
                                                <div className="entry-meta">
                                                    <ul>
                                                        
                                                        {/* <li>     
                                                            <Icon.User />
                                                            <ChipUser user={user}/>
                                                                                             
                                                        </li> */}
                                                        
                                                  
                                                        <Skeleton animation='pulse' variant="text" />
                                                        <Skeleton animation='pulse' variant="text" />
                                                    </ul>
                                                </div>              
                                            </div>
                                        </div>
                                        <div className="bar"></div>

                                    
                                        <p style={{fontSize: 15, marginBottom: 30}}><Skeleton animation='pulse' variant="text" /><Skeleton animation='pulse' variant="text" /><Skeleton animation='pulse' variant="text" /></p>
                                        <h5><Skeleton animation='pulse' variant="text" /></h5> 
                                        <ProgressBar animated now={0}/>
                                        <div className="blog-details-desc">
                                            <div className="article-content">
                                                <div className="entry-meta">
                                                    <ul>
                                                        <li>
                                                            <Skeleton animation='pulse' variant="text" width={50}/>
                                                        </li>
                                                    </ul>
                                                </div>              
                                            </div>
                                        </div>

                                        <div style={{display: "flex"}}>
                                            {/* {BackButton()}
                                            {RefundButton()}

                                            
                                            {showHeart()}          */}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>                   

                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="blog-details-desc">

                                <div className="article-content">  

                                
                                <div className="separator"></div>
                                    <Skeleton variant="rect" animation='pulse' height={550}/>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12">
                            <div className="widget-area" id="secondary">
                                <div className="widget widget_startp_posts_thumb">
                                    <div>

                                        <h3 className="widget-title"><Skeleton variant="text" animation='pulse'/></h3>
                                        <Skeleton variant="rect" animation='pulse' height={150}/>
                                        <br></br>
                                        <Skeleton variant="rect" animation='pulse' height={150}/>
                                        <br></br>
                                        <Skeleton variant="rect" animation='pulse' height={150}/>
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    }



    return (
        <>
            <Navbar />
            
            {/* <PageBanner pageTitle={campaign.title}/> */}

            
            {displayContent()}

            <Footer />
        </>
    )
}

export default Campaign



export async function getServerSideProps (context) {
//   console.log(context.query) 
  // returns { id: episode.itunes.episode, title: episode.title}
  

  //you can make DB queries using the data in context.query
  return {
      props: { 
         address: context.query.id.toLowerCase() //pass it to the page props
      }
  }
}