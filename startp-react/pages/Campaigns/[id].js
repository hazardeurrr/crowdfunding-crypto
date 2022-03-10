import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import * as Icon from 'react-feather';
import Parser from 'html-react-parser';
import Link from '@/utils/ActiveLink'
import ProgressBar from 'react-bootstrap/ProgressBar';
import CampaignSidebar from '@/components/Blog/CampaignSidebar';
import VerifTooltip from '@/components/Common/VerifTooltip';
import { makeStyles } from '@material-ui/core/styles';
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
import RaisedChecker from '@/components/Common/RaisedChecker';
import { MdSentimentVerySatisfied } from 'react-icons/md';
import campaignAbi from '@/components/ContractRelated/CampaignAbi';
import Withdraw from './withdraw';
import Refund from './refund';

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



const Campaign = (props, {c, u}) => {

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

        getOne('campaign', props.address, function(doc) {
          if (doc.exists) {
            setCampaign(doc.data())
            displayHTMLTxt(doc.data().long_desc)
            // console.log(campaign)
            var addr = doc.data().creator
            getOne('profile', addr.toLowerCase(), function(docs) {
                if (docs.exists) {
                    setUser(docs.data())
                } else {
                    console.log("Document not found")
                }
            })
          } else {
              console.log("Document not found")
          }
        })
    }, [c, u] )


    


    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const showTwitter = () => {
        if(user.twitter != ""){
            return <li>
            <a href={`https://twitter.com/${user.twitter}`} target="_blank"><Icon.Twitter />   @{user.twitter}</a>  <VerifTooltip toBeChecked={true} media={"Twitter"}/>
        </li>
        }
    }

    const showWebsite = () => {
        if(user.website != ""){
            return <li>
            <Icon.Globe /> <a href={user.website} target="_blank">{user.website}</a>
        </li>
        }
    }


    const setRaised = (r) => {
        let c = campaign
        c.raised = r
        console.log("changed raised")
        setCampaign(c)
        setRaisedRetrieve(true)
    }
    
// reste les progress bar à update

    const displayRaised = () => {
        if(metamask_connected){
            if(chainID == chain)
                return <RaisedChecker address={campaign.contract_address} currency={campaign.currency} callback={setRaised}/>
            else
                return "Connect to the right network to see more"
        }
        else
            return "Connect to see more"
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
        if(metamask_connected && chainID == chain){
            if(campaign.end_date > now && campaign.start_date < now){
                return <Link href={{
                            pathname: "/Checkout/[id]",
                            query: {
                                id: campaign.contract_address,
                                }
                            }}
                                as={`/Checkout/${campaign.contract_address}`}>
                        <a className="btn btn-primary">Back this campaign</a>
                        </Link>
            }
        }
    }

    const RefundButton = () => {
        //on n'affiche pas les boutons de refund au createur de la campagne
        if(raisedRetrieve && metamask_connected && chainID == chain){
            if(userAddr.toLowerCase() != campaign.creator.toLowerCase()){
                if(campaign.end_date < now && campaign.raised < campaign.objective && !campaign.flexible){
                    return <Refund campaign={campaign}/>
                }
            }
        }
        
    }

    const displayProgressBar = () => {
        if(metamask_connected && chainID == chain){
            if(raisedRetrieve){
                if(campaign.end_date > now && campaign.start_date < now){
                    return <ProgressBar animated now={(campaign.raised / campaign.objective) * 100}/>
                } else {
                    return <ProgressBar variant="down" now={(campaign.raised / campaign.objective) * 100}/>
                }
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
        if(connected && chainID == chain)
            return <HeartAnim campaign={campaign}/>
    }

    async function displayHTMLTxt(data){
        console.log(data)
        let txt = await fetch('https://cors-serv.herokuapp.com/'+data).then(r => {
            let b = r.blob().then((a) => a.text().then(h => setHTMLTxt(h)))
    });
    }

    const displayOwnerButtons = () => {
        if(currentUser !== undefined && campaign !== undefined && metamask_connected && chainID == chain){
            if(userAddr.toLowerCase() === campaign.creator.toLowerCase()){
                if(raisedRetrieve){
                    if(campaign.end_date < now && (campaign.flexible || (campaign.raised >= campaign.objective))){
                        return <Withdraw campaign={campaign}/>
                    } else if(campaign.end_date < now) {
                        return <div>
                        <h4>Unfortunately, your campaign hasn't reached its goal.</h4>
                        {/* <button className="btn btn-light" onClick={downloadData}>Download data</button> */}
                        </div>
                    } 
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
            return Parser(htmlTxt)
        }
    }

    const displayCurrency = () => {
        if(metamask_connected && chainID == chain && raisedRetrieve)
            return <>{campaign.currency} raised / {parseFloat(campaign.objective)} {campaign.currency}</>
    }

    const displayContent = () => {
        if(campaign != undefined && user != undefined){
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
                                                            <ChipUser user={user}/>
                                                                                             
                                                        </li>
                                                        
                                                  
                                                        {showTwitter()}
                                                        {showWebsite()}
                                                    </ul>
                                                </div>              
                                            </div>
                                        </div>
                                        <div className="bar"></div>

                                    
                                        <p style={{fontSize: 15, marginBottom: 30}}>{campaign.small_description}</p>
                                        <h5>{displayRaised()} {displayCurrency()}</h5> 
                                        {displayProgressBar()}
                                        <div className="blog-details-desc">
                                            <div className="article-content">
                                                <div className="entry-meta">
                                                    <ul>
                                                        <li>
                                                            <Icon.Clock /> {timeLeft()}
                                                        </li>
                                                        <li><FlexibleTooltip campaign={campaign}/></li>
                                                    </ul>
                                                </div>              
                                            </div>
                                        </div>

                                        <div style={{display: "flex"}}>
                                            {BackButton()}
                                            {RefundButton()}

                                            
                                            {showHeart()}

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"You are not connected to the Ethereum Network with Metamask"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Please connect to Metamask. If you are already connected, be sure to select Ethereum Mainnet as network on the Metamask tab.
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
                                    {ShowTxt()}
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
                                    <div style={{minWidth: 270}}>

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