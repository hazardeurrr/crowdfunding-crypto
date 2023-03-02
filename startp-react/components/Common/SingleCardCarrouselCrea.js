import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import * as Icon from 'react-feather';
import ProgressBar from 'react-bootstrap/ProgressBar';
import RaisedChecker from './RaisedChecker';
import { useSelector, useDispatch } from 'react-redux';
import {chain} from '@/utils/chain'
import { prefixedAddress } from '@/utils/prefix';


const SingleCardCarrouselCrea = (props) => {

    const campaign = props.project;
    const objective = campaign.objective;
    var start_date = campaign.start_date;
    var end_date = campaign.end_date;
    var now = Date.now() / 1000;
    const [raised, setRaised] = React.useState(0)
    const [raisedRetrieve, setRaisedRetrieve] = React.useState(false)

    const metamask_connected = useSelector((state) => state.metamask_connected)
    const chainID = useSelector((state) => state.chainID)

    const cat = () => {
      if(campaign.categories.length > 1){
          return (<>
            <p className="read-more-btn" >{campaign.categories[0]}<br></br>{campaign.categories[1]}</p>
            </>)
      } else if(campaign.categories != 0) {
          return (
          <p className="read-more-btn">{campaign.categories[0]}</p>
          )
      }
  }

  const returnDecToShow = () => {
    if(campaign.currency == "USDC" || campaign.currency == "p_USDC"){
        return 2
    } else if(campaign.currency == "ETH" || campaign.currency == "p_MATIC"){
        return 4
    } else {
        return 3
    }
}

  const timeLeft = () => {
  
    let timeLeft = end_date - now;
    let days = Math.floor(timeLeft / 86400); 
    let hours = Math.floor((timeLeft - (days * 86400)) / 3600);
    let minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
    if(start_date > now){
        let timeTilStart = start_date - now;
        let daysTilStart = Math.floor(timeTilStart / 86400);
        return "Starts soon "
    } else {
        if(days > 0){
            return days.toString() + " " + dayS(days)
        }else if((minutes >= 0 && hours == 0 && days == 0) || (hours > 0 && days == 0)) {
            return "Last day !"
        } else {
            return "Ended"
        }
    }
}

const dayS = (nbDays) => {
    if(nbDays == 0 || nbDays == -1 || nbDays == 1){
        return "day"
    } else {
        return "days"
    }
}

const displayRaised = () => {
    // if(campaign.currency == 'ETH' || campaign.currency == 'BBST')
    //     return raised.toFixed(3)
    // else
    //     return Math.floor(raised)
    // if(metamask_connected && chainID == chain)
        return <RaisedChecker campaign={campaign} callback={setRaisedCallback} decToShow={returnDecToShow()}/>

}

const setRaisedCallback = (r) => {
    setRaisedRetrieve(true)
    setRaised(r)
}

const displayTitle = () => {
    if(campaign.name.length < 20){
        return <h5 className="carrousel-card-title-big" style={{marginBottom: 0, textAlign:'center'}}>
            <Link href={{
                pathname: "/Campaigns/[id]",
                query: {
                    id: campaign.contract_address
                }
            }}
            as={`/Campaigns/${campaign.contract_address}`}>
            <a>{campaign.name}</a>
        </Link>
    </h5>
    } else {
        return <h5 className="carrousel-card-title-small">
            <Link href={{
                pathname: "/Campaigns/[id]",
                query: {
                    id: campaign.contract_address
                }
            }}
            as={`/Campaigns/${campaign.contract_address}`}>
            <a>{campaign.name}</a>
        </Link>
    </h5>
    }
}

const displayCurrency = () => {
    if(raisedRetrieve){
            return showCurrencyWoPrefix()
    }
}

const showCurrencyWoPrefix = () => {
    if(campaign.currency.includes('_'))
        return campaign.currency.substring(campaign.currency.indexOf('_') + 1);
    else
        return campaign.currency
}

const displayProgressBar = () => {
    if(raisedRetrieve){
            let pct = Math.round((raised / objective) * 100 * 10) / 10;
            if(end_date > now && start_date < now){
                return <ProgressBar animated variant="red"  now={pct} label={`${pct}%`}/>
            } else {
                return <ProgressBar  variant="down"  now={pct} label={`${pct}%`}/>
            }
        }
}

const displayRaisedIcon = () => {
    if(raisedRetrieve){
            return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-activity"><polyline points="17 11 12 6 7 11"></polyline><polyline points="17 18 12 13 7 18"></polyline></svg>
        }
    }
    const displayContent = () => {

        return <div className="single-box box-crea">
                    <Link href={{
                        pathname: "/creators/[id]",
                        query: {
                            id: prefixedAddress(campaign.network, campaign.contract_address),
                        }
                    }}
                    as={`/creators/${prefixedAddress(campaign.network, campaign.contract_address)}`}>
                    <a style={{width: '100%'}}>
                          <img style={{borderRadius: '50%', top: -70, width: 125, height:125, objectFit:'cover', left:0, right:0, marginLeft: 'auto', marginRight: 'auto', position: 'absolute'}} src={campaign.main_img} alt="image" />
                    
                <div style={{marginTop: 50, justifyContent:'center', alignItems:'center'}}>
                    <h3 style={{textAlign:'center'}}>
                            {campaign.name}
                    </h3>
                {/* <p style={{fontSize: 12}}>{displayDesc()}</p> */}
                
                {/* <b style={{fontSize: 16.5, marginTop: 2}}><div style={{display:"flex"}}>{displayRaised()} {displayCurrency()}</div></b> */}
                {/* {displayProgressBar()}
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <p><svg style={{marginTop: -2}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>   {timeLeft()}</p>
                    <p>{showNetwork()}</p>
                </div> */}
                
                    <p className="read-more-btn" style={{textAlign:'center'}}>
                        Support this creator
                        <Icon.ArrowRight />
                    </p>
                </div>
                </a>
                </Link> 
            </div>           
    }

    
    return (
        displayContent()
    )
}

export default SingleCardCarrouselCrea;