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
    const user = usersListJson.users.find(e => e.eth_address == campaign.creator)
    console.log("User : " + user)
    console.log("Campaign : " + campaign)
    const desc = campaign.long_desc
    const pct = (campaign.raised / campaign.objective) * 100

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
            <Icon.MousePointer /> <a href={user.website} target="_blank">{user.website}</a>
        </li>
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
                                        
                                        <h2>{campaign.title}</h2>
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

                                    
                                        <p>{campaign.small_description}</p>
                                        <h5>{campaign.raised} {campaign.currency} raised / {campaign.objective} {campaign.currency}</h5> 
                                        <ProgressBar animated now={pct}/>
                                        <div className="blog-details-desc">
                                            <div className="article-content">
                                                <div className="entry-meta">
                                                    <ul>
                                                        <li>
                                                            <Icon.Clock /> {campaign.time_left} left
                                                        </li>
                                                    </ul>
                                                </div>              
                                            </div>
                                        </div>

                                        <Link href={{
                                            pathname: "/Checkout/[id]",
                                            query: {
                                                id: campaign.contract_address,
                                            }
                                        }}
                                        as={`/Checkout/${campaign.contract_address}`}>
                                                <a className="btn btn-primary">Back this campaign</a>
                                            </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                    <div className="row">
                        <div className="col-lg-8 col-md-12">
                            <div className="blog-details-desc">

                                <div className="article-content">  
                                
                                   
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