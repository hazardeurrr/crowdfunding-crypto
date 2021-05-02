import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import * as Icon from 'react-feather';
import ProgressBar from 'react-bootstrap/ProgressBar';


const SingleCardCarrousel = (props) => {

    const campaign = props.project;
    const raised = campaign.raised;
    const objective = campaign.objective;
    var start_date = campaign.start_date;
    var end_date = campaign.end_date;
    var now = Date.now() / 1000;
    const pct = Math.round((raised / objective) * 100 * 10) / 10;
    

    const cat = () => {
      if(campaign.categories.length == 2){
          return (
            <p className="read-more-btn">{campaign.categories[0]} | {campaign.categories[1]}</p>
          )
      } else {
          return (
          <p className="read-more-btn">{campaign.categories[0]}</p>
          )
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
        }else if((minutes > 0 && hours == 0 && days == 0) || (hours > 0 && days == 0)) {
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
    if(campaign.currency == 'ETH')
        return raised.toFixed(3)
    else
        return Math.floor(raised)
}

const displayTitle = () => {
    if(campaign.title.length < 30){
        return <h5 className="carrousel-card-title-big">
            <Link href={{
                pathname: "/Campaigns/[id]",
                query: {
                    id: campaign.contract_address,
                }
            }}
            as={`/Campaigns/${campaign.contract_address}`}>
            <a>{campaign.title}</a>
        </Link>
    </h5>
    } else {
        return <h5 className="carrousel-card-title-small">
            <Link href={{
                pathname: "/Campaigns/[id]",
                query: {
                    id: campaign.contract_address,
                }
            }}
            as={`/Campaigns/${campaign.contract_address}`}>
            <a>{campaign.title}</a>
        </Link>
    </h5>
    }
}

const displayProgressBar = () => {
    if(end_date > now && start_date < now){
        return <ProgressBar animated variant="success"  now={pct} label={`${pct}%`}/>
    } else {
        return <ProgressBar  variant="down"  now={pct} label={`${pct}%`}/>
    }

}
    
    return (
      <div className="single-blog-post-item">
        <div className="post-image">
            <Link href={{
                        pathname: "/Campaigns/[id]",
                        query: {
                            id: campaign.contract_address,
                        }
                    }}
                    as={`/Campaigns/${campaign.contract_address}`}>
                    <a>
                        {displayProgressBar()}
                        <img src={campaign.main_img} alt="image" />
                    </a>               
            </Link>
        </div>

        <div className="post-content">
            
            <ul className="post-meta">
                <li><p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> {timeLeft()}</p></li>
                <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-activity"><polyline points="17 11 12 6 7 11"></polyline><polyline points="17 18 12 13 7 18"></polyline></svg>
 {displayRaised()} {campaign.currency}</li>
            </ul>
                    {displayTitle()}

                    {cat()}
        </div>
      </div>
    );
}

export default SingleCardCarrousel;