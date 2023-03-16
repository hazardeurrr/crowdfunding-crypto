import React, {useEffect, useState} from 'react';
import {FaFacebook, FaInstagram, FaSoundcloud, FaTwitch, FaTwitter, FaYoutube, FaGlobe, FaDiscord} from 'react-icons/fa'
import {SiTiktok} from 'react-icons/si'
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import LanguageIcon from '@material-ui/icons/Language';

const SocialMediaList = (props) => {

  const campaign = props.campaign
  const socials = props.campaign ? props.campaign.social : props.socials
  const baseWidth = 35
  const baseHeight = 35

  const showSocial = () => {
    var rows = [];
    let keyList = Object.keys(socials).filter(e => e != "website")
    for (var i = 0; i < keyList.length; i++) {
        if(socials[keyList[i]]){
          rows.push(<div key={i} style={{marginLeft: 5, width:30 , marginRight: 5}}>{socialIcon(keyList[i])}</div>);
        }
    }
    return rows;
  }

  const socialIcon = (media) => {
    
    switch(media){
      case "facebook":
        return <a href={`https://www.facebook.com/${socials.facebook}`} target='_about'><FaFacebook size={'100%'} color="#426298"/></a>
      case "instagram":
        return <a href={`https://instagram.com/${socials.instagram}`} target='_about'><div style={{width: {baseWidth}, height: {baseHeight}}}>
          <svg width="0" height="0">
  <radialGradient id="rg" r="150%" cx="30%" cy="107%">
    <stop stopColor="#fdf497" offset="0" />
    {/* <stop stop-color="#fdf497" offset="0.05" /> */}
    <stop stopColor="#fd5949" offset="0.45" />
    <stop stopColor="#d6249f" offset="0.6" />
    <stop stopColor="#285AEB" offset="0.9" />
  </radialGradient>
</svg>

<FaInstagram size={"100%"} style={{ fill: "url(#rg)"}}/>
        </div></a>
        
        
      case "tiktok":
        return <a href={`https://tiktok.com/@${socials.tiktok}`} target='_about'><SiTiktok color="#000000" size={'100%'}/></a>
      case "soundcloud":
        return <a href={`https://soundcloud.com/${socials.soundcloud}`} target='_about'><FaSoundcloud size={'100%'} color="#e56e41"/></a>
      case "twitter":
        return <a href={`https://twitter.com/${socials.twitter}`} target='_about'><FaTwitter size={'100%'} color="#49aadd"/></a>
      case "discord":
        return <a href={`https://discord.gg/${socials.discord}`} target='_about'><FaDiscord size={'100%'} color="#7289da"/></a>
      case "twitch":
        return <a href={`https://twitch.com/${socials.twitch}`} target='_about'><FaTwitch size={'100%'} color="#604b94"/></a>
      case "youtube":
        return <a href={`https://youtube.com/@${socials.youtube}`} target='_about'><FaYoutube size={'100%'} color="#cd3b34"/></a>
      case "website":
        return <a href={socials.website} target='_about'><FaGlobe size={'100%'} color="gray"/></a>
    }
  }

  const displayWebsite = () => {
    if(socials.website){
      var regex = /\/\/([^\/,\s]+\.[^\/,\s]+?)(?=\/|,|\s|$|\?|#)/g;
      let res = regex.exec(socials.website)
      if(res){
        return <a href={socials.website} target='_about'><Chip variant="outlined" style={{cursor:'pointer', marginTop: 10}} label={<><b>{res[1]}</b></>} icon={<LanguageIcon />} /></a>
      }
            
    }
  }

    return (
      <>
      <div style={{display: 'flex', flexDirection: 'row', flexWrap:'wrap', justifyContent:"center", alignItems:'center'}}>
        {showSocial()}
      </div>
      {displayWebsite()}

      </>
    )
}

export default SocialMediaList