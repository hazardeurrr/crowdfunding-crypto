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
import CircularProgress from '@material-ui/core/CircularProgress';
import Skeleton from '@material-ui/lab/Skeleton';
import {chain} from '@/utils/chain'
import {bnb_chain} from '@/utils/bnb_chain'

import RaisedChecker from '@/components/Common/RaisedChecker';
import { MdSentimentVerySatisfied } from 'react-icons/md';
import campaignAbi from '@/components/ContractRelated/CampaignAbi';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Custom404 from 'pages/404';
import DOMPurify from 'isomorphic-dompurify';

import { prefixedAddress } from '@/utils/prefix';
import { NoBscProviderError } from '@binance-chain/bsc-connector';
import { Avatar, Chip } from '@material-ui/core';


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


const WidgetComponent = (props) => {
    
    var now = Date.now() / 1000;
    const [raised, setRaised] = React.useState(0)
    const [raisedRetrieve, setRaisedRetrieve] = React.useState(false)
    var campaign = props.campaign
    var widgetWidth = props.width ? props.width : 250
  

    const timeLeft = () => {
        let end_date = campaign.end_date
        let start_date = campaign.start_date
        let timeLeft = end_date - now;
        let days = Math.floor(timeLeft / 86400); 
        let hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        let minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
        if(start_date > now){
            let timeTilStart = start_date - now;
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

    const displayDesc = () => {
        if(campaign.small_description.length > 130){
            return campaign.small_description.substring(0, 130) + " [...]"
        } else {
            return campaign.small_description
        }
    }

    const SupportOrSee = () => {
        if(campaign.end_date < now || campaign.start_date > now){
            return "See this campaign"
        } else {
            return <div style={{border: "2px solid black"}}>Support on<br></br>BlockBoosted</div>
        }
    }

    const showCats = () => {
        if(campaign.categories.length > 1){
            return <div className='cats_small_div'> <span style={{display:'flex'}}>{getCatIcon(campaign.categories[0])}{campaign.categories[0]}</span><span className="cats_separator">&nbsp; | &nbsp;</span><span style={{display:'flex'}}>{getCatIcon(campaign.categories[1])}{campaign.categories[1]}</span></div>
        } else if(campaign.categories.length != 0){
            return <span style={{display:'flex'}}>{getCatIcon(campaign.categories[0])}{campaign.categories[0]}</span>
        }
    }

    const getCatIcon = (cat) => {
        if(cat == "Art"){
            return <div className="icon simpleCa">
                <i className='bx bx-paint'></i>
            </div>
        }
        if(cat == "Charity"){
            return <div className="icon simpleCa">
                <i className='bx bx-donate-heart'></i>
            </div>
        }
        if(cat == "Healthcare"){
            return <div className="icon simpleCa">
                <i className='bx bx-health'></i>
            </div>
        }
        if(cat == "Green"){
            return <div className="icon simpleCa">
                <i className='bx bx-world'></i>
            </div>           
        }
        if(cat == "Cryptocurrency"){
            return <div className="icon simpleCa">
                <i className='bx bx-bitcoin'></i>
            </div>        
        }
        if(cat == "Games"){
            return <div className="icon simpleCa">
                <i className='bx bx-game'></i>
            </div>    
        }
        if(cat == "Technology"){
            return <div className="icon simpleCa">
                <i className='bx bx-chip'></i>
            </div> 
        }
        if(cat == "Innovation"){
            return <div className="icon simpleCa">
                <i className='bx bx-bulb'></i>
            </div> 
        }
        if(cat == "Special Event"){
            return <div className="icon simpleCa">
                <i className='bx bx-star'></i>
            </div>
        }
        if(cat == "Diverse"){
            return <div className="icon simpleCa">
                <i className='bx bx-unite'></i>
            </div>
        }

    }

    const cat = () => {
            if(campaign.network == chain){
                if(campaign.categories.length > 0){

                    return (
                        <div className="date">
                            {/* <Icon.Bookmark/> */}
                            {/* {returnCurrencyIconWhite()} */}
                        {/* <img style={{height: 20}} src={'/images/cryptoicons/ethwhite.svg'}/>  */}
                        {showCats()}
                        </div>
                    )
                }
            } else if (campaign.network == bnb_chain){
                if(campaign.categories.length > 0){
                    return (
                        <div className="date">
                        
                            {/* {returnCurrencyIconWhite()} */}
                          {/* <img style={{height: 20}} src={'/images/cryptoicons/maticwhite.svg'}/>  */}
                          <span>{showCats()}</span>
                        </div>
                    )
                }
               
            }
    }

    const returnCurrencyIconWhite = () => {
        if(campaign.currency == "USDC"){
            return <img style={{height: 20}} src={'/images/cryptoicons/usdcwhite.svg'}/>
        }  else if(campaign.currency == "b_BUSD"){
            return <img style={{height: 20}} src={'/images/cryptoicons/busdwhite.svg'}/>
        }  else if(campaign.currency == "BBST" || campaign.currency == "b_BBST"){
            return <img style={{height: 20}} src={'/images/cryptoicons/bbstwhite.svg'}/>
        } else if(campaign.currency == "ETH") {
            return <img style={{height: 20}} src={'/images/cryptoicons/ethwhite.svg'}/>
        } else if(campaign.currency == "b_BNB"){
            return <img style={{height: 20}} src={'/images/cryptoicons/bnbwhite.svg'}/>
        }
    }

    const returnCurrencyIcon = () => {
        if(campaign.currency == "USDC"){
            return <img style={{height: 17, marginTop: -2}} src={'/images/cryptoicons/usdc.svg'}/>
        } else if(campaign.currency == "BBST" || campaign.currency == "b_BBST"){
            return <img style={{height: 17, marginTop: -2}} src={'/images/cryptoicons/bbst.png'}/>
        } else if(campaign.currency == "ETH") {
            return <img style={{height: 17, marginTop: -2}} src={'/images/cryptoicons/eth.svg'}/>
        } else if(campaign.currency == "b_BNB"){
            return <img style={{height: 17, marginTop: -2}} src={'/images/cryptoicons/bnb.svg'}/>
        } else if(campaign.currency == "b_BUSD"){
            return <img style={{height: 17, marginTop: -2}} src={'/images/cryptoicons/busd.png'}/>
        }
    }

    const returnDecToShow = () => {
        if(campaign.currency == "USDC" || campaign.currency == "b_BUSD"){
            return 4
        } else {
            return 8
        }
    }

    const displayRaised = () => {
        // if(metamask_connected){
        //     if(chainID == chain)
                return <RaisedChecker campaign={campaign} callback={setRaisedCallback} decToShow={returnDecToShow()}/>
        //     else
        //         return "Connect to the right network to see"
        // } else
        //     return "Connect to see"
    }

    const displayCurrency = () => {
        if(raisedRetrieve){
                return <div style={{marginLeft: 3}}>{showCurrencyWoPrefix()}
                {/* &nbsp;{returnCurrencyIcon()} */}
                </div>
        }
    }

    const showCurrencyWoPrefix = () => {
        if(campaign.currency.includes('_'))
            return campaign.currency.substring(campaign.currency.indexOf('_') + 1);
        else
            return campaign.currency
    }

    const setRaisedCallback = (r) => {
        setRaisedRetrieve(true)
        setRaised(r)
    }

    const displayProgressBar = () => {
        if(raisedRetrieve){
            if(campaign.end_date > now && campaign.start_date < now){
                
                return <ProgressBar variant="green" animated now={(raised / campaign.objective) * 100}/>
            } else {
                return <ProgressBar variant="down" now={(raised / campaign.objective) * 100}/>
            }
        }
    }

    const showNetwork = () => {
        if(campaign.network == chain){
            return <p>
                ETH<img style={{height: 12, marginTop: -1, marginLeft: 5}} src={'/images/cryptoicons/smallethgray.svg'}/> 
            </p>
        } else if(campaign.network == bnb_chain){
            return <p>
                BSC<img style={{height: 12, marginTop: -1,marginLeft: 5}} src={'/images/cryptoicons/smallbnbgray.svg'}/>  
            </p>
        }
    }

    const getLabel = () => {
        if(widgetWidth >= 250){
            return <p>Donate on BlockBoosted</p>
        } else {
            return <p>Donate</p>
        }
    }

    const returnTitle = () => {
    if(campaign.title.length < 25){
      return <h3 style={{}}>
      {campaign.title}
      </h3>
    } else {
        return <h3 style={{lineHeight:"20px", fontSize:16}}>
        {campaign.title}
        </h3>
      }
    }

    const displayContent = () => {
        if(campaign){
            return <div className="single-blog-post" style={{width: 250}}>
            <div className="blog-image">
              
                      <a target='_parent' href={`https://blockboosted.com/campaigns/${prefixedAddress(campaign.network, campaign.contract_address)}`}>
                          <img style={{width: '100%'}} src={campaign.main_img} alt="image" />
                      </a>
            </div>
            <div className="blog-post-content" style={{paddingTop: 5, paddingLeft: 15, paddingRight: 15, paddingBottom: 10, textAlign:'center'}}>
                    <a style={{height: 65, justifyContent:'center', alignItems: 'center', display:'flex'}} target='_parent' href={`https://blockboosted.com/campaigns/${prefixedAddress(campaign.network, campaign.contract_address)}`}>
                      {returnTitle()}
                    </a>
               
                {/* <p>{displayDesc()}</p> */}
                <b style={{fontSize: 16.5, marginTop: 2}}><div style={{display:"flex"}}>{displayRaised()} {displayCurrency()}</div></b>
                {displayProgressBar()}
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <p><svg style={{marginTop: -2}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>   {timeLeft()}</p>
                    {showNetwork()}
                </div>
                
                    <a target='_parent' href={`https://blockboosted.com/campaigns/${prefixedAddress(campaign.network, campaign.contract_address)}`} style={{maxWidth: '90%', marginLeft:'auto', marginRight:'auto', justifyContent:'center'}}>
                       <Chip style={{width: '100%', cursor:"pointer"}} variant='outlined' avatar={<Avatar alt='avatar' src={"/images/logobb.png"} />} label={getLabel()} />
                    </a>
            </div>
          </div>   
        } else {
            return <Skeleton variant="rect" style={{width: '100%', height:'100%'}} animation='pulse' />
               
        }
    }


    return (
        <div style={{width: '100%'}}>
        {displayContent()}
        </div>
    )
}

export default WidgetComponent
