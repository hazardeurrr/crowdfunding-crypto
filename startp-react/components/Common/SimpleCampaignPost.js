import React, {useEffect, useRef} from 'react';
import * as Icon from 'react-feather';
import Link from 'next/link';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ChipUser from '@/components/Common/ChipUser'
import {getOne } from '../../firebase-crowdfund/queries' 
import RaisedChecker from './RaisedChecker';
import { useSelector, useDispatch } from 'react-redux';
import {chain} from '@/utils/chain'
import {db, firebase} from '../../firebase-crowdfund/index'



const SimpleCampaignPost = (props) => {
    const campaign = props.project
    const creator = campaign.creator
    const objective = campaign.objective
    
    var start_date = campaign.start_date;
    var end_date = campaign.end_date;
    var now = Date.now() / 1000;
    const [raised, setRaised] = React.useState(0)
    const [raisedRetrieve, setRaisedRetrieve] = React.useState(false)
    const metamask_connected = useSelector((state) => state.metamask_connected)
    const chainID = useSelector((state) => state.chainID)

  
    // const creators = useSelector((state) => state.allCreators)

    // const u = useSelector((state) => selectCreatorByAdd(state, campaign.creator)));

    
    const [state, updateState] = React.useState();
    // const forceUpdate = React.useCallback(() => updateState({state}), []);

    const [user, setUser] = React.useState()

    // const user = props.creator;


    useEffect(() => {

        // console.log(campaign.title, " creator :", creator)
        // getOne('profile', creator.toLowerCase(), (docs) => {
        //     setUser(docs.data())
        // })
        // setCreaProf(creator)
        // console.log(user)
        console.log("used with", creator)
      }, [creator])
    
    const setCreaProf = (creator) => {
        db.collection('profile').doc(creator.toLowerCase()).get().then((crea) => {

            setUser(crea.data());
        }).catch((error) => {
            console.log(error)
        })
    }

    const timeLeft = () => {
        
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
        if(end_date < now || start_date > now){
            return "See this campaign"
        } else {
            return "Support this campaign"
        }
    }



    const cat = () => {
        if(campaign.categories.length > 1){
            return (
                <div className="date">
                  <Icon.Bookmark /> {campaign.categories[0]} | {campaign.categories[1]}
                </div>
            )
        } else if(campaign.categories.length != 0){
            return (
                <div className="date">
                  <Icon.Bookmark /> {campaign.categories[0]}
                </div>
            )
        }
    }

    const returnDecToShow = () => {
        if(campaign.currency == "USDC"){
            return 4
        } else {
            return 8
        }
    }

    const displayRaised = () => {
        if(metamask_connected){
            if(chainID == chain)
                return <RaisedChecker end_date={campaign.end_date} address={campaign.contract_address} currency={campaign.currency} callback={setRaisedCallback} decToShow={returnDecToShow()}/>
            else
                return "Connect to the right network to see"
        } else
            return "Connect to see"
    }

    const displayCurrency = () => {
        if(raisedRetrieve && metamask_connected && chainID == chain){
                return campaign.currency
        }
    }

    const setRaisedCallback = (r) => {
        setRaisedRetrieve(true)
        setRaised(r)
    }

    const displayProgressBar = () => {
        if(metamask_connected && raisedRetrieve && chainID == chain){
            if(end_date > now && start_date < now){
                return <ProgressBar variant="green" animated now={(raised / objective) * 100}/>
            } else {
                return <ProgressBar variant="down" now={(raised / objective) * 100}/>
            }
        }
    }

    const displayContent = () => {
        if(user != undefined && user.eth_address.toLowerCase() == creator.toLowerCase()){
            return <div className="single-blog-post">
            <div className="blog-image">
              <Link href={{
                              pathname: "/Campaigns/[id]",
                              query: {
                                  id: campaign.contract_address,
                              }
                          }}
                          as={`/Campaigns/${campaign.contract_address}`}>
                      <a>
                          <img src={campaign.main_img} alt="image" />
                      </a>
                  </Link>
                {cat()}
            </div>
            <div className="blog-post-content">
                <h3>
                    <Link href={{
                          pathname: "/Campaigns/[id]",
                          query: {
                              id: campaign.contract_address,
                          }
                      }}
                      as={`/Campaigns/${campaign.contract_address}`}>
                        <a>{campaign.title}</a>
                    </Link>
                </h3>
                <span width="10">By <ChipUser user={user}/></span>
                <p>{displayDesc()}</p>
                <b>{displayRaised()} {displayCurrency()}</b>
                {displayProgressBar()}
                <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>   {timeLeft()}</p>
                <Link href={{
                          pathname: "/Campaigns/[id]",
                          query: {
                              id: campaign.contract_address,
                          }
                      }}
                      as={`/Campaigns/${campaign.contract_address}`}>
                    <a className="read-more-btn">
                        {SupportOrSee()} <Icon.ArrowRight />
                    </a>
                </Link>
            </div>
          </div>            
  
        } else {
            setCreaProf(creator);
        }
    }


    return (
        <>
        {displayContent()}
        </>
    )
}

export default SimpleCampaignPost;