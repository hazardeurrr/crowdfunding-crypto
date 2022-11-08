import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import * as Icon from 'react-feather';
import Parser from 'html-react-parser';
import Link from '@/utils/ActiveLink'
import ProgressBar from 'react-bootstrap/ProgressBar';
import PreCampaignSidebar from '@/components/Blog/PreCampaignSidebar';
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
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import SendIcon from '@mui/icons-material/Send';

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


const PreCampaign = (props) => {

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

        getOne('preCampaignsTest', props.address, function(doc) {
          if (doc.exists) {
            setCampaign(doc.data())
            displayHTMLTxt(doc.data().long_desc)
            // console.log(campaign)
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


// reste les progress bar à update

    const showCurrencyWoPrefix = () => {
            return campaign.currency
    }

    const displayRaised = () => { 
      return  campaign.raised
    }

    const contactCreator = () => {

    }


    const BackButton = () => {
      return <>
      <h6 style={{marginBottom: 0}}><Icon.Frown /> This campaign is not available on BlockBoosted yet.</h6>
      <p onClick={contactCreator} style={{textDecoration:'underline', cursor:"pointer", fontWeight: 500}}>Ask the creator to activate it in two clicks !</p>
      {/* <div style={{display:'flex', justifyContent:'space-evenly'}}>
        <Button startIcon={<SendIcon />} size="big" style={{textTransform: 'inherit', color:'white', backgroundColor:'#c47be4'}} variant="contained">Contact creator</Button>
        <Button style={{textTransform: 'inherit'}} startIcon={<AssignmentIndIcon />} size="small" variant="contained">I'm the creator</Button>
      </div> */}
      </>
    }


    const displayProgressBar = () => {         
      return <ProgressBar variant="purple" now={(campaign.raised / campaign.objective) * 100}/>
    }

    const showCats = () => {
        if(campaign.categories.length == 1){
            return campaign.categories[0]
        } else if(campaign.categories.length != 0){
            return `${campaign.categories[0]} & ${campaign.categories[1]}`
        }
    }

    async function displayHTMLTxt(data){
        // console.log(data)
        let txt = await fetch('https://cors-serv.herokuapp.com/'+data).then(r => {
            let b = r.blob().then((a) => a.text().then(h => setHTMLTxt(h)))
    });
    }

    const displayOwnerButtons = () => {
       
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
        DOMPurify.addHook('afterSanitizeAttributes', function (node) {
            // set all elements owning target to target=_blank
            if (node.hasAttribute('target')){
              node.setAttribute('target', '_blank')
              node.setAttribute('rel', 'noopener');
            }
          });
          const cleanHtmlString = DOMPurify.sanitize(htmlString, { USE_PROFILES: { html: true }, ADD_ATTR: ['target', 'allow', 'allowfullscreen', 'frameborder', 'scrolling'], ADD_TAGS: ["iframe"] });
        const html = Parser(cleanHtmlString);
        return html;
}

    const displayCurrency = () => {
        return campaign.currency
    }

    const displayObjective = () => {
            return <p className="justandtextcenter" style={{marginTop: -10, marginBottom: 7}}>raised out of {parseFloat(campaign.objective)} {showCurrencyWoPrefix()}</p>
    }

    const showNetwork = () => {
       
    }

    const showCurrency = () => {
        
    }

    const showOrigin = () => {
      return <li><Icon.ExternalLink /> <a target="_blank" href={`${campaign.origin}`}>See original campaign</a></li>
    }

    const displayContent = () => {
        if(campaign != undefined){
          let us = {bio: "", eth_address: "", image:campaign.creator_img, liked:[], site:"", twitter:"", username:campaign.creator_name, verified: false}
            return <div>
            <div className="blog-details-area ptb-80">
                <div className="container">
                    <div className="about-area ptb-80">
                        <div className="container-fluid">
                            <div className="row align-items-center">

                              <div className="preBlock">
                                <div style={{flex: 1.5, textAlign:"center"}}><Icon.AlertCircle /> &nbsp; Unfortunately, the creator has not enabled crypto donations yet.</div>
                                <div className="preBtns" style={{display:'flex', justifyContent:'space-around', flex:1 }}>
                                    <Button onClick={contactCreator} startIcon={<SendIcon />} size="big" style={{marginRight: 7.5, textTransform: 'inherit', color:'white', backgroundColor:'#c47be4'}} variant="contained">Contact creator</Button>
                                    <Button style={{textTransform: 'inherit', marginLeft: 7.5}} startIcon={<AssignmentIndIcon />} size="small" variant="outlined">I'm the creator</Button>
                                </div>
                              </div>

                                <div className="col-lg-6 col-md-12">
                                    <div className="ml-about-img">
                                        <img src={campaign.main_img} alt="image" />
                                        
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-12">
                                    <div className="ml-about-content">

                                        <span className="sub-title" style={{marginBottom: 10}}>{showCats()}</span>
                                        {/* <ShareIcons campaign={campaign}/> */}

                                        

                                        <h2 style={{marginTop: 0, marginBottom: 10}}>{campaign.title}</h2>
                                         <div className="blog-details-desc">
                                            <div className="article-content">
                                                <div className="entry-meta">
                                                    <ul>
                                                        
                                                    <li style={{maxWidth: '85%'}}>
                                                        <span style={{display:'flex', alignItems:'center'}}> <Icon.User />
                                                        <Chip style={{maxWidth:'100%'}} avatar={<Avatar alt='avatar' src={campaign.creator_img} />} label={<div style={{
                                                          alignItems:'center',
                                                          width: '100%',
                                                          whiteSpace: 'nowrap',
                                                          overflow: 'hidden',
                                                          textOverflow: 'ellipsis',
                                                          fontSize : "14px",
                                                          fontStyle: 'italic'
                                                      }}>{campaign.creator_name} </div>}/>
                                                            </span>     
                                                           
                   
                                                        </li>
                                                        {/* <VerifTooltip toBeChecked={user.verified}/> */}

                                                        
                                                  
                                                        {/* {showTwitter()} */}

                                                    </ul>
                                                   
                                                </div>              
                                            </div>
                                        </div>
                                        <div className="bar"></div>
                                    
                                        <p style={{fontSize: 15, marginBottom: 30}}>{campaign.small_description}</p>
                                        <h5 className="justandtextcenter" style={{display:"flex"}}>{displayRaised()} {displayCurrency()}</h5> 
                                        {displayObjective()}
                                        {displayProgressBar()}
                                        <div className="blog-details-desc justandtextcenter">
                                            <div className="article-content">
                                                <div className="entry-meta">
                                                      
                                                    <ul>
                                                        {/* <li style={{color:'#6084a4'}}>
                                                            <Icon.AlertCircle /> Unfortunately, the creator has not enabled donations in crypto yet.
                                                        </li> */}
                                                        {/* <li>
                                                            <Icon.Globe /> Network : {showNetwork()}
                                                        </li> */}
                                                            {showOrigin()}
                                                        
                                                    </ul>                                                 


                                                </div>              
                                            </div>
                                        </div>

                                        <div className="justandtextcenter">
                                            {BackButton()}
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
                            <PreCampaignSidebar project = {campaign}/>
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
            {/* <Navbar /> */}
            
            {/* <PageBanner pageTitle={campaign.title}/> */}

            
            {displayContent()}

            <Footer />
        </>
    )
}

export default PreCampaign



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