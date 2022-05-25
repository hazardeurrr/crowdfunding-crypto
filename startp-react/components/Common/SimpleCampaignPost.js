import React, {useEffect, useRef} from 'react';
import * as Icon from 'react-feather';
import Link from 'next/link';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ChipUser from '@/components/Common/ChipUser'
import {getOne } from '../../firebase-crowdfund/queries' 
import RaisedChecker from './RaisedChecker';
import { useSelector, useDispatch } from 'react-redux';
import {chain} from '@/utils/chain'
import {poly_chain} from '@/utils/poly_chain'
import {db, firebase} from '../../firebase-crowdfund/index'
import { prefixedAddress } from '@/utils/prefix';


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
        //console.log("used with", creator)
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


    // const showCats = () => {
    //     if(campaign.categories.length > 1){
    //         return campaign.categories[0] + " | " + campaign.categories[1]
    //     } else if(campaign.categories.length != 0){
    //         return campaign.categories[0]
    //     }
    // }

    const showCats = () => {
        if(campaign.categories.length > 1){
            return <div style={{display:'flex'}}>{getCatIcon(campaign.categories[0])}{campaign.categories[0]} &ensp;|&ensp; {getCatIcon(campaign.categories[1])}{campaign.categories[1]}</div>
        } else if(campaign.categories.length != 0){
            return <span style={{display:'flex'}}>{getCatIcon(campaign.categories[0])}{campaign.categories[0]}</span>
        }
    }

    const getCatIcon = (cat) => {
        if(cat == "Art"){
            return <div className="icon simpleCa">
                <i className='bx bx-paint'></i>
            </div>
        }
        if(cat == "Charity"){
            return <div className="icon simpleCa">
                <i className='bx bx-donate-heart'></i>
            </div>
        }
        if(cat == "Healthcare"){
            return <div className="icon simpleCa">
                <i className='bx bx-health'></i>
            </div>
        }
        if(cat == "Green"){
            return <div className="icon simpleCa">
                <i className='bx bx-world'></i>
            </div>           
        }
        if(cat == "Cryptocurrency"){
            return <div className="icon simpleCa">
                <i className='bx bx-bitcoin'></i>
            </div>        
        }
        if(cat == "Games"){
            return <div className="icon simpleCa">
                <i className='bx bx-game'></i>
            </div>    
        }
        if(cat == "Technology"){
            return <div className="icon simpleCa">
                <i className='bx bx-chip'></i>
            </div> 
        }
        if(cat == "Innovation"){
            return <div className="icon simpleCa">
                <i className='bx bx-bulb'></i>
            </div> 
        }
        if(cat == "Special Event"){
            return <div className="icon simpleCa">
                <i className='bx bx-star'></i>
            </div>
        }
        if(cat == "Diverse"){
            return <div className="icon simpleCa">
                <i className='bx bx-unite'></i>
            </div>
        }

    }

    const cat = () => {
            if(campaign.network == chain){
                if(campaign.categories.length > 0){

                    return (
                        <div className="date">
                            {/* <Icon.Bookmark/> */}
                            {/* {returnCurrencyIconWhite()} */}
                        {/* <img style={{height: 20}} src={'/images/cryptoicons/ethwhite.svg'}/>  */}
                        <span>{showCats()}</span>
                        </div>
                    )
                }
            } else if (campaign.network == poly_chain){
                if(campaign.categories.length > 0){
                    return (
                        <div className="date">
                        
                            {/* {returnCurrencyIconWhite()} */}
                          {/* <img style={{height: 20}} src={'/images/cryptoicons/maticwhite.svg'}/>  */}
                          <span>{showCats()}</span>
                        </div>
                    )
                }
               
            }
    }

    const returnCurrencyIconWhite = () => {
        if(campaign.currency == "USDC" || campaign.currency == "p_USDC"){
            return <img style={{height: 20}} src={'/images/cryptoicons/usdcwhite.svg'}/>
        } else if(campaign.currency == "BBST" || campaign.currency == "p_BBST"){
            return <img style={{height: 20}} src={'/images/cryptoicons/bbstwhite.svg'}/>
        } else if(campaign.currency == "ETH") {
            return <img style={{height: 20}} src={'/images/cryptoicons/ethwhite.svg'}/>
        } else if(campaign.currency == "p_MATIC"){
            return <img style={{height: 20}} src={'/images/cryptoicons/maticwhite.svg'}/>
        }
    }

    const returnCurrencyIcon = () => {
        if(campaign.currency == "USDC" || campaign.currency == "p_USDC"){
            return <img style={{height: 17, marginTop: -2}} src={'/images/cryptoicons/usdc.svg'}/>
        } else if(campaign.currency == "BBST" || campaign.currency == "p_BBST"){
            return <img style={{height: 17, marginTop: -2}} src={'/images/cryptoicons/bbst.png'}/>
        } else if(campaign.currency == "ETH") {
            return <img style={{height: 17, marginTop: -2}} src={'/images/cryptoicons/eth.svg'}/>
        } else if(campaign.currency == "p_MATIC"){
            return <img style={{height: 17, marginTop: -2}} src={'/images/cryptoicons/matic.svg'}/>
        }
    }

    const returnDecToShow = () => {
        if(campaign.currency == "USDC" || campaign.currency == "p_USDC"){
            return 4
        } else {
            return 8
        }
    }

    const displayRaised = () => {
        // if(metamask_connected){
        //     if(chainID == chain)
                return <RaisedChecker campaign={campaign} callback={setRaisedCallback} decToShow={returnDecToShow()}/>
        //     else
        //         return "Connect to the right network to see"
        // } else
        //     return "Connect to see"
    }

    const displayCurrency = () => {
        if(raisedRetrieve){
                return <div style={{marginLeft: 3}}>{showCurrencyWoPrefix()}
                {/* &nbsp;{returnCurrencyIcon()} */}
                </div>
        }
    }

    const showCurrencyWoPrefix = () => {
        if(campaign.currency.includes('_'))
            return campaign.currency.substring(campaign.currency.indexOf('_') + 1);
        else
            return campaign.currency
    }

    const setRaisedCallback = (r) => {
        setRaisedRetrieve(true)
        setRaised(r)
    }

    const displayProgressBar = () => {
        if(raisedRetrieve){
            if(end_date > now && start_date < now){
                
                return <ProgressBar variant="green" animated now={(raised / objective) * 100}/>
            } else {
                return <ProgressBar variant="down" now={(raised / objective) * 100}/>
            }
        }
    }

    const showNetwork = () => {
        if(campaign.network == chain){
            return <>
                Ethereum<img style={{height: 12, marginTop: -1, marginLeft: 5}} src={'/images/cryptoicons/smallethgray.svg'}/> 
            </>
        } else if(campaign.network == poly_chain){
            return <>
                Polygon<img style={{height: 12, marginTop: -1,marginLeft: 5}} src={'/images/cryptoicons/smallpolygongray.svg'}/>  
            </>
        }
    }

    const displayContent = () => {
        if(user != undefined && user.eth_address.toLowerCase() == creator.toLowerCase()){
            return <div className="single-blog-post">
            <div className="blog-image">
              <Link href={{
                              pathname: "/Campaigns/[id]",
                              query: {
                                  id: prefixedAddress(campaign.network, campaign.contract_address),
                              }
                          }}
                        //   as={`/Campaigns/${campaign.contract_address}`}
                          >
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
                                id: prefixedAddress(campaign.network, campaign.contract_address),
                            }
                        }}
                        // as={`/Campaigns/${campaign.contract_address}`}
                        >
                            <a>{campaign.title}</a>
                        </Link>
                    </h3>
                <span width="10">By <ChipUser user={user}/></span>
                <p>{displayDesc()}</p>
                <b style={{fontSize: 16.5, marginTop: 2}}><div style={{display:"flex"}}>{displayRaised()} {displayCurrency()}</div></b>
                {displayProgressBar()}
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <p><svg style={{marginTop: -2}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>   {timeLeft()}</p>
                    <p>{showNetwork()}</p>
                </div>
                <Link href={{
                          pathname: "/Campaigns/[id]",
                          query: {
                              id: prefixedAddress(campaign.network, campaign.contract_address),
                          }
                      }}
                    //   as={`/Campaigns/${campaign.contract_address}`}
                      >
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