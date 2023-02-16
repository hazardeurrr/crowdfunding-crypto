import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';


const useStyles = makeStyles({
    root: {
      minWidth: 275,
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 18,
    },
    pos: {
      marginBottom: 12,
    },
    qty: {
        marginTop: 5,
        marginBottom: 10,
        fontSize: 13,
        fontStyle: 'italic'
    }
  });
  
  

const SocialFeed = (props) => {

    const campaign = props.project
    const classes = useStyles();
    const domain = "blockboosted.com"

    React.useEffect(() => {
    }, [])
    
    return (
        <div className="widget-area" id="secondary">
            <div className="widget widget_startp_posts_thumb">
                    <div className={classes.root}>
                      <h3 className="widget-title">Latest news</h3>
                      <TwitterTimelineEmbed
                        sourceType="profile"
                        screenName={campaign.social.twitter}
                        options={{height: 400}}
                      />

                     {/* <iframe width="100%" src="https://www.youtube.com/embed/rdWb5ogUZn0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> */}              
                    </div>
                     {/* <iframe src={`https://player.twitch.tv/?channel=${campaign.social.twitch}&parent=${domain}`} frameborder="0" allowfullscreen="true" scrolling="no" width="100%"></iframe> */}

            </div>
        </div>
    )
}



export default SocialFeed;  