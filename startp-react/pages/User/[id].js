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
import VerifTooltip from '@/components/Common/VerifTooltip';



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




const User = (props) => {

  const classes = useStyles();

    // const jsonUsers = JSON.parse(usersListJson)

    const user = usersListJson.users.find(e => e.eth_address == props.address)
    console.log("User : " + user)

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
                      <a href={`https://etherscan.io/address/${user.eth_address}`} target="_blank"><h5>{user.eth_address}</h5></a>
                      <div className="bar"></div>
                      <p>{user.bio}</p>
                      <div className="bar"></div>

                      <div className="blog-details-desc">
                        <div className="article-content">
                           <div className="entry-meta">
                              <ul>
                                 <li>
                                    <a href={`https://twitter.com/${user.twitter}`} target="_blank"><Icon.Twitter />   @{user.twitter}</a>  <VerifTooltip toBeChecked={user.verif_twitter} media={"Twitter"}/>
                                  </li>
                                  <li>
                                    <Icon.MousePointer /> <a href={user.website} target="_blank">{user.website}</a>
                                  </li>
                              </ul>
                           </div>              
                         </div>
                       </div>    


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