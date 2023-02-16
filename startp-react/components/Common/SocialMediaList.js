import React, {useEffect, useState} from 'react';
import {FaFacebook, FaInstagram, FaSpotify, FaSoundcloud, FaTwitch, FaTwitter, FaYoutube, FaGlobe} from 'react-icons/fa'
import {SiTiktok} from 'react-icons/si'
import Grid from '@material-ui/core/Grid';


const SocialMediaList = (props) => {

  const campaign = props.campaign
  const baseWidth = 35
  const baseHeight = 35

  const showSocial = () => {
    var rows = [];
    let keyList = Object.keys(campaign.social)
    for (var i = 0; i < keyList.length; i++) {
        rows.push(<div style={{marginLeft: 5, width:30 , marginRight: 5}}>{socialIcon(keyList[i])}</div>);
    }
    return rows;
  }

  const socialIcon = (media) => {
    
    console.log(media)
    switch(media){
      case "facebook":
        return <a href={`https://www.facebook.com/${campaign.social.facebook}`} target='_about'><FaFacebook size={'100%'} color="#426298"/></a>
      case "instagram":
        return <a href={`https://instagram.com/${campaign.social.instagram}`} target='_about'><div style={{width: {baseWidth}, height: {baseHeight}}}>
          <svg width="0" height="0">
  <radialGradient id="rg" r="150%" cx="30%" cy="107%">
    <stop stop-color="#fdf497" offset="0" />
    {/* <stop stop-color="#fdf497" offset="0.05" /> */}
    <stop stop-color="#fd5949" offset="0.45" />
    <stop stop-color="#d6249f" offset="0.6" />
    <stop stop-color="#285AEB" offset="0.9" />
  </radialGradient>
</svg>

<FaInstagram size={"100%"} style={{ fill: "url(#rg)"}}/>
        </div></a>
        
        
      case "tiktok":
        return <a href={`https://tiktok.com/@${campaign.social.tiktok}`} target='_about'><SiTiktok color="#000000" size={'100%'}/></a>
      case "spotify":
        return <a href={`https://open.spotify.com/artist/${campaign.social.spotify}`} target='_about'><FaSpotify size={'100%'} color="#1fd660"/></a>
      case "soundclound":
        return <a href={`https://soundclound.com/${campaign.social.soundclound}`} target='_about'><FaSoundcloud size={'100%'} color="#e56e41"/></a>
      case "twitter":
        return <a href={`https://twitter.com/${campaign.social.twitter}`} target='_about'><FaTwitter size={'100%'} color="#49aadd"/></a>
      case "twitch":
        return <a href={`https://twitch.com/${campaign.social.twitch}`} target='_about'><FaTwitch size={'100%'} color="#604b94"/></a>
      case "youtube":
        return <a href={`https://youtube.com/${campaign.social.youtube}`} target='_about'><FaYoutube size={'100%'} color="#cd3b34"/></a>
      case "website":
        return <a href={campaign.social.website} target='_about'><FaGlobe size={'100%'} color="gray"/></a>
    }
  }

    return (
      <div style={{display: 'flex', flexDirection: 'row', flexWrap:'wrap', justifyContent:"center", alignItems:'center'}}>
        {showSocial()}
      </div>
    )
}

export default SocialMediaList