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
import usersListJson from '@/utils/usersListJson';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    "& > *": {
      margin: theme.spacing(1)
    }
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(22),
    height: theme.spacing(22),
  },
}));

const HtmlTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);



const User = (props) => {

  const classes = useStyles();

    // const jsonUsers = JSON.parse(usersListJson)

    const user = usersListJson.users.find(e => e.eth_address == props.address)
    console.log("User : " + user)

    const certifTwitter = () => {
      if(user.verif_twitter){
        return  <HtmlTooltip
        title={
          <React.Fragment>
            <Typography gutterBottom color="inherit">This twitter account is verified</Typography>
            <i>{"The owner of this address also owns this Twitter account"}</i>
          </React.Fragment>
        }
      >
        <Icon.CheckCircle />
      </HtmlTooltip>
      } else {
        return  <HtmlTooltip
        title={
          <React.Fragment>
            <Typography gutterBottom color="inherit">This twitter account is not yet verified</Typography>
            <i>{"This Twitter account has not confirmed to be linked with this address. We can't ensure that the owner of this address also owns this Twitter account."}</i>
          </React.Fragment>
        }
      >
        <Icon.XCircle />
      </HtmlTooltip>
      }
    }

    return (
        <>
            <Navbar />
            
            {/* <PageBanner pageTitle={campaign.title}/> */}

            

            <div className="features-area pt-80 pb-50 bg-f9f6f6">
              <div className="container">
                  <div className="section-title">
                    <div className={classes.root}>
                      <Avatar alt="user_avatar" src={user.image} className={classes.large}/>
                    </div>

                      <h2>{user.username}</h2>
                      <h5>{user.eth_address}</h5>
                      <div className="bar"></div>
                      <p>{user.bio}</p>
                      <div className="bar"></div>
                      {/* <Link href={`https://twitter.com/${user.twitter}`} passHref> */}
                        <p><a href={`https://twitter.com/${user.twitter}`} target="_blank"><Icon.Twitter />   @{user.twitter}</a>  {certifTwitter()}</p>
                      {/* </Link> */}
                      <div className="separator"></div>
                      {/* <Link href={user.website} passHref> */}
                        <p><a href={user.website} target="_blank"><Icon.MousePointer />   {user.website}</a></p>
                      {/* </Link> */}

                  </div>
                </div>
              </div>

            <Footer />
        </>
    )
}

export default User



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