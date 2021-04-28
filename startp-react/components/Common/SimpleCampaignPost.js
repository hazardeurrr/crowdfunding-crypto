import React from 'react';
import * as Icon from 'react-feather';
import Link from 'next/link';
import ProgressBar from 'react-bootstrap/ProgressBar';
import usersListJson from '@/utils/usersListJson';
import ChipUser from '@/components/Common/ChipUser'



const SimpleCampaignPost = (props) => {
    const campaign = props.project
    const pct = (campaign.raised / campaign.objective) * 100

    //Changer pour mettre les heures et minutes si jamais days = 0...
    const timeLeft = () => {
        var start_date = campaign.start_date;
        var end_date = campaign.end_date;
        var now = Date.now() / 1000;
        let timeLeft = end_date - now;
        let days = Math.floor(timeLeft / 86400); 
        if(start_date > now){
            let timeTilStart = start_date - now;
            let daysTilStart = Math.floor(timeTilStart / 86400);
            return "Starts in " + daysTilStart.toString() + " " + dayS(daysTilStart)
        } else {
            if(days > 0){
                return days.toString() + " " + dayS(days) +" left"
            } else {
                return "Ended " + Math.abs(days.toString()) + " " + dayS(days) + " ago"
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

    const user = usersListJson.users.find(e => e.eth_address == campaign.creator)


    const cat = () => {
        if(campaign.categories.length == 2){
            return (
                <div className="date">
                  <Icon.Bookmark /> {campaign.categories[0]} | {campaign.categories[1]}
                </div>
            )
        } else {
            return (
                <div className="date">
                  <Icon.Bookmark /> {campaign.categories[0]}
                </div>
            )
        }
    }

    return (
        <>
        <div className="single-blog-post">
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
              <span>By <ChipUser user={user} /></span>
              <p>{campaign.small_description}</p>
              <b>{campaign.raised} {campaign.currency}</b>
              <ProgressBar animated now={pct} />
              <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>   {timeLeft()}</p>
              <Link href={{
                        pathname: "/Campaigns/[id]",
                        query: {
                            id: campaign.contract_address,
                        }
                    }}
                    as={`/Campaigns/${campaign.contract_address}`}>
                  <a className="read-more-btn">
                      Support this campagin <Icon.ArrowRight />
                  </a>
              </Link>
          </div>
        </div>            

        </>
    )
}

export default SimpleCampaignPost;