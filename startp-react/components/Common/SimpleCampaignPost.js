import React from 'react';
import * as Icon from 'react-feather';
import Link from 'next/link';
import ProgressBar from 'react-bootstrap/ProgressBar';


const SimpleCampaignPost = (props) => {
    const campaign = props.project
    const pct = (campaign.raised / campaign.objective) * 100

    const cat = () => {
        if(campaign.categories.length == 2){
            return (
                <div className="date">
                  <Icon.Bookmark /> {campaign.categories[0]}, {campaign.categories[1]}
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
              <Link href="/CampaignDetails">
                  <a>
                      <img src={campaign.main_img} alt="image" />
                  </a>
              </Link>
              {cat()}
          </div>
          <div className="blog-post-content">
              <h3>
                  <Link href="/CampaignDetails">
                      <a>{campaign.title}</a>
                  </Link>
              </h3>
              <span>By <a href="#">{campaign.creator}</a></span>
              <p>{campaign.small_description}</p>
              <b>{campaign.raised} {campaign.currency}</b>
              <ProgressBar animated now={pct} />
              <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>   {campaign.time_left}</p>
              <Link href="/CampaignDetails">
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