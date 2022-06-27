import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import * as Icon from 'react-feather';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import VerifTooltip from '@/components/Common/VerifTooltip';
import { getOne } from 'firebase-crowdfund/queries'
import CreatedAndLiked from '@/components/Common/CreatedAndLiked'
import CircularProgress from '@material-ui/core/CircularProgress';


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
    marginTop: 30,
    width: theme.spacing(22),
    height: theme.spacing(22),
  },
}));




const User = (props, {data}) => {

  const classes = useStyles();
  
  // *************************************
  // PARTIE AVEC LA BDD FIREBASE
  // *************************************
  const [user, setUser] = React.useState(undefined)


  React.useEffect(() => {
    getOne('profile', props.address, function(doc) {
      if (doc.exists) {
        setUser(doc.data())
      } else {
          console.log("Document not found")
      }
    })
  }, [data] )
  // *************************************
  // FIN DE LA PARTIE AVEC LA BDD FIREBASE
  // *************************************

    // const user = usersListJson.users.find(e => e.eth_address == props.address)
    // console.log("User : " + user)

  const showTwitter = () => {
    if(user.twitter != ""){
        return  <li>
        <a href={`https://twitter.com/${user.twitter}`} target="_blank"><Icon.Twitter />   @{user.twitter}</a>  
        {/* <VerifTooltip toBeChecked={true} media={"Twitter"}/> */}
      </li>
    }
  }

  const showWebsite = () => {
      if(user.website != ""){
          return<li>
          <Icon.Globe /> <a href={user.website} target="_blank">{user.website}</a>
        </li>
      }
  }

  const showBio = () => {
    if(user.bio != ""){
      return <div><div className="bar"></div>
      <p>{user.bio}</p></div>
    }
  }

  const displayContent = () => {
    if(user != undefined){
      return <div>
        <div className={classes.root}>
                      <Avatar alt="user_avatar" src={user.image} className={classes.large}/>
                    </div>

                      <h2>{user.username}</h2>
                      <a href={`https://testnet.bscscan/address/${user.eth_address}`} target="_blank"><h6 className="user-address">{user.eth_address}</h6></a>
                      <div className="blog-details-desc">
                        <div className="article-content">
                           <div className="entry-meta">
                              <ul>
                                  {showTwitter()}
                                  {/* {showWebsite()} */}
                              </ul>
                           </div>              
                         </div>
                       </div>    
                      {showBio()}

                     

                      <CreatedAndLiked user = {user}/>
      </div>
    } else {
      return <CircularProgress style={{marginTop: 100}}/>
    }
  }


    return (
        <>
            <Navbar />
            
            {/* <PageBanner pageTitle={campaign.title}/> */}

            

            <div className="features-area pt-80 pb-50 bg-f9f6f6">
              <div className="container">
                  <div className="section-title">

                    {displayContent()}
                    


                  </div>
                </div>
              </div>

            <Footer />
        </>
    )
}

export default User



export async function getServerSideProps (context) {
  // console.log(context.query) 
  // returns { id: episode.itunes.episode, title: episode.title}
  

  //you can make DB queries using the data in context.query
  return {
      props: { 
         address: context.query.id.toLowerCase() //pass it to the page props
      }
  }
}