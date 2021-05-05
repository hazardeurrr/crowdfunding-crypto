import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner'; 
import * as Icon from 'react-feather';
import projectList from '@/utils/projectList'
import Parser from 'html-react-parser';
import Link from '@/utils/ActiveLink'
import ProgressBar from 'react-bootstrap/ProgressBar';
import CampaignSidebar from '@/components/Blog/CampaignSidebar';
import categoryList from '@/utils/CategoryList';
import usersListJson from '@/utils/usersListJson';
import VerifTooltip from '@/components/Common/VerifTooltip';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
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
import UseAnimations from 'react-useanimations';
import heart from 'react-useanimations/lib/heart'
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import HeartAnim from '@/components/Common/HeartAnim';


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



const Campaign = (props) => {

    const classes = useStyles();

    const campaign = projectList.find(e => e.contract_address == props.address)
    const raised = campaign.raised
    const objective = campaign.objective
    const user = usersListJson.users.find(e => e.eth_address == campaign.creator)

    const desc = campaign.long_desc
    const pct = (raised / objective) * 100
    var start_date = campaign.start_date;
    var end_date = campaign.end_date;
    var now = Date.now() / 1000;
  
    const connected = useSelector((state) => state.metamask_connected)
    const chainID = useSelector((state) => state.chainID)



    const [open, setOpen] = React.useState(false);



    const handleDialogOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    const showTwitter = () => {
        if(user.twitter != ""){
            return <li>
            <a href={`https://twitter.com/${user.twitter}`} target="_blank"><Icon.Twitter />   @{user.twitter}</a>  <VerifTooltip toBeChecked={user.verif_twitter} media={"Twitter"}/>
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



    


    const displayRaised = () => {
        if(campaign.currency == 'USDT'){
            return raised.toFixed(2)
        } else {
            return raised
        }
    }

    const timeLeft = () => {

        var timeLeft = end_date - now;
        var days = Math.floor(timeLeft / 86400); 
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
        // console.log(campaign.title + " => Now : " + now + " / end : " + end_date + " / timeLeft : " + timeLeft + " / days : " + days + " / hours : " + hours + " / minutes : " + minutes)
        if(start_date > now){
            let timeTilStart = start_date - now;
            let daysTilStart = Math.floor(timeTilStart / 86400);
            if(daysTilStart > 0)
                return "Starts in " + daysTilStart.toString() + " day" + SorNot(daysTilStart)
            else
                return "Starts tomorrow !"
        } else if(days > 0){
                return days.toString() + " day" + SorNot(days) +" left"
            } else if(days == 0 && hours > 0){                
                return hours.toString() + " hour" + SorNot(hours) + " left"
            } else if(days == 0 && hours == 0 && minutes > 0){
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
        if(end_date > now && start_date < now){
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

    const RefundButton = () => {
        if(end_date < now && raised < objective && !campaign.flexible){
            return  <div>
                        <h6>Unfortunately, the goal of this campaign has not been reached. If you contributed to the campaign, you can ask for your refund below.</h6>
                        <a className="btn btn-primary" onClick={handleRefund}>Get your refund</a>
                    </div>
        }
    }

    const displayProgressBar = () => {
        if(end_date > now && start_date < now){
            return <ProgressBar animated now={pct}/>
        } else {
            return <ProgressBar variant="down" now={pct}/>
        }
    }

    const handleRefund = () => {
        if(connected == true && chainID == '0x1'){
            //connect to Metamask and check for a refund
            console.log("refund logic here")        
        } else {
                handleDialogOpen()
            }
    }




    return (
        <>
            <Navbar />
            
            {/* <PageBanner pageTitle={campaign.title}/> */}

            

            <div className="blog-details-area ptb-80">
                <div className="container">
                    <div className="about-area ptb-80">
                        <div className="container-fluid">
                            <div className="row align-items-center">
                                <div className="col-lg-6 col-md-12">
                                    <div className="ml-about-img">
                                        <img src={campaign.main_img} alt="image" />
                                        
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-12">
                                    <div className="ml-about-content">

                                        <span className="sub-title">{campaign.main_category}</span>
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
                                        <h5>{displayRaised()} {campaign.currency} raised / {objective} {campaign.currency}</h5> 
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

                                         
                                                <HeartAnim campaign={campaign}/>
                                            

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
                                    {Parser(desc)}
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-12">
                            <CampaignSidebar project = {campaign}/>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Campaign



export async function getServerSideProps (context) {
  console.log(context.query) 
  // returns { id: episode.itunes.episode, title: episode.title}
  

  //you can make DB queries using the data in context.query
  return {
      props: { 
         address: context.query.id //pass it to the page props
      }
  }
}