import React, {useEffect, useState} from 'react';
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon
} from "react-share";
import * as Icon from 'react-feather';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CodeIcon from '@material-ui/icons/Code';

import { FacebookShareButton, FacebookMessengerShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton, EmailShareButton, TelegramShareButton, RedditShareButton } from "react-share";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import WidgetComponent from './Widget';
import { TextField } from '@material-ui/core';
import { prefixedAddress } from '@/utils/prefix';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';


const ShareIcons = (props) => {

  const [pageURL, setPageURL] = useState("");
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [widthValue, setWidthValue] = React.useState(250)
  const [selectedValue, setSelectedValue] = React.useState('widget');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  useEffect(() => {
    if(props.campaign.shortURL){
      setPageURL(props.campaign.shortURL)
    } else {
      setPageURL(window.location.href)
    }
  })

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleClick = () => {
    navigator.clipboard.writeText(pageURL);
    setOpen(true);
  };

  const handleIntegrate = () => {
    setOpenDialog(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const returnWidget = () => {
    if(selectedValue == "button"){
      return <div style={{textAlign:"center"}}><TextField label="Simple <a> link"  style={{width: '100%', marginBottom: 10}}  multiline rowsMax={3} value={`<a href="https://blockboosted.com/campaigns/${prefixedAddress(props.campaign.network, props.campaign.contract_address)}" >Donate 💚</a>`}/>
      <a style={{fontSize: 15, marginBottom: 10}} href={`https://blockboosted.com/campaigns/${prefixedAddress(props.campaign.network, props.campaign.contract_address)}`}>Donate 💚</a>
      <TextField label="Button example"  style={{width: '100%', marginTop: 25, marginBottom: 10}}  multiline rowsMax={3} value={`<a href="https://blockboosted.com/campaigns/${prefixedAddress(props.campaign.network, props.campaign.contract_address)}"><div style="font-size: 17px; padding: 5px 15px; border: 2px solid black; border-radius: 25px; color: black;">Donate 💚</div></a>`}/>
      <a href={`https://blockboosted.com/campaigns/${prefixedAddress(props.campaign.network, props.campaign.contract_address)}`}><div style={{fontSize: 17, color:"black", padding:"5px 15px 5px 15px", border:"2px solid black", borderRadius:"25px"}}>Donate 💚</div></a>
      </div>
    } else if(selectedValue == "widget"){
      return  <div><TextField style={{width: '100%', marginBottom: 10}} variant="outlined" multiline rowsMax={3} value={`<iframe width="250" height="330" src="https://blockboosted.com/campaigns/widget/${prefixedAddress(props.campaign.network, props.campaign.contract_address)}" frameborder="0" scrolling="no"></iframe>`}/>
      <WidgetComponent campaign={props.campaign}/></div>
    }
  }

    return (
      <div style={{display: 'flex', flexDirection: 'row'}} className="shareicons">
        <TwitterShareButton className="share-icon"
          title={`Support "${props.campaign.title}" with crypto on @blockboosted`}
          url={pageURL}
          // hashtags={["Crowdfunding", "Web3"]}
        >
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>

      <FacebookShareButton className="share-icon"
        url={pageURL}
        quote={`Support "${props.campaign.title}" with crypto on BlockBoosted`}
        hashtag={"#crowdfunding"}
      >
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>

      {/* <WhatsappShareButton className="share-icon"
          title={`Support "${props.campaign.title}" with crypto on BlockBoosted`}
          separator=" "
          url={pageURL}
          >
        <WhatsappIcon size={32} round={true}/>
      </WhatsappShareButton> */}

      {/* <LinkedinShareButton className="share-icon"
          title={`Support "${props.campaign.title}" !`}
          summary={`Support the crowdfunding campaign "${props.campaign.title}" with crypto on BlockBoosted`}
          url={pageURL}
          >
        <LinkedinIcon size={32} round={true}/>
      </LinkedinShareButton> */}

      {/* <EmailShareButton className="share-icon"
        subject={`Support "${props.campaign.title}" !`}
        body={`Support the crowdfunding campaign "${props.campaign.title}" with crypto on BlockBoosted`}
        url={pageURL}
      >
        <EmailIcon size={32} round={true}/>
      </EmailShareButton> */}

      <RedditShareButton className="share-icon"
          title={`Support "${props.campaign.title}" with crypto on BlockBoosted`}
          url={pageURL}
      >
        <RedditIcon size={32} round={true}/>
      </RedditShareButton>

      <TelegramShareButton className="share-icon"
          title={`Support "${props.campaign.title}" with crypto on BlockBoosted`}
          url={pageURL}
      >
        <TelegramIcon size={32} round={true}/>
      </TelegramShareButton>

      <a className="share-icon" onClick={handleClick}><Icon.Link style={{marginTop:4, marginLeft:1}}/></a>
      <a className="share-icon" onClick={handleIntegrate}><CodeIcon style={{marginTop: 4, marginLeft: 1}}/></a>

      <Dialog
        className='dialogResponsive'
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
          <DialogTitle id="alert-dialog-title">{"HTML Integration"}</DialogTitle>
          <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Copy this code into your HTML</FormLabel>
            <RadioGroup row value={selectedValue} onChange={handleChange} defaultValue="widget">
              <FormControlLabel
                value="widget"
                control={<Radio color="primary" />}
                label="Widget"
                labelPlacement="end"
              />
              <FormControlLabel
                value="button"
                control={<Radio color="primary" />}
                label="Button"
                labelPlacement="end"
              />
              
            </RadioGroup>
          </FormControl>
          {returnWidget()}
         
          </DialogContent>
      </Dialog>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Short link copied to clipboard !"
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      
      </div>
    )
}

export default ShareIcons