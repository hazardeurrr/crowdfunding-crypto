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

import { FacebookShareButton, FacebookMessengerShareButton, TwitterShareButton, WhatsappShareButton, LinkedinShareButton, EmailShareButton, TelegramShareButton, RedditShareButton } from "react-share";




const ShareIcons = (props) => {

  const [pageURL, setPageURL] = useState("");
  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    setPageURL(window.location.href);
  })

  const handleClick = () => {
    navigator.clipboard.writeText(pageURL);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

    return (
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <TwitterShareButton className="share-icon"
          title={`Boost the campaign "${props.campaign.title}" with crypto on @blockboosted`}
          url={pageURL}
          hashtags={["BlockBoosted", "Fundraise", "Crypto"]}
        >
          <TwitterIcon size={32} round={true} />
        </TwitterShareButton>

      <FacebookShareButton className="share-icon"
        url={pageURL}
        quote={`Boost the campaign "${props.campaign.title}" with crypto on BlockBoosted`}
        hashtag={"#crowdfunding"}
      >
        <FacebookIcon size={32} round={true} />
      </FacebookShareButton>

      <WhatsappShareButton className="share-icon"
          title={`Boost the campaign "${props.campaign.title}" with crypto on BlockBoosted`}
          separator=" "
          url={pageURL}
          >
        <WhatsappIcon size={32} round={true}/>
      </WhatsappShareButton>

      <LinkedinShareButton className="share-icon"
          title={`Support "${props.campaign.title}" !`}
          summary={`Boost the campaign "${props.campaign.title}" with crypto on BlockBoosted`}
          url={pageURL}
          >
        <LinkedinIcon size={32} round={true}/>
      </LinkedinShareButton>

      <EmailShareButton className="share-icon"
        subject={`Support "${props.campaign.title}" !`}
        body={`Boost the campaign "${props.campaign.title}" with crypto on BlockBoosted`}
        url={pageURL}
      >
        <EmailIcon size={32} round={true}/>
      </EmailShareButton>

      <RedditShareButton className="share-icon"
          title={`Boost the campaign "${props.campaign.title}" with crypto on BlockBoosted`}
          url={pageURL}
      >
        <RedditIcon size={32} round={true}/>
      </RedditShareButton>

      <TelegramShareButton className="share-icon"
          title={`Boost the campaign "${props.campaign.title}" with crypto on BlockBoosted`}
          url={pageURL}
      >
        <TelegramIcon size={32} round={true}/>
      </TelegramShareButton>

      <a className="share-icon" onClick={handleClick}><Icon.Link style={{marginTop:4, marginLeft:1}}/></a>

      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message="Link copied to the clipboard !"
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