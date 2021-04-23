import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import * as Icon from 'react-feather';
import ProgressBar from 'react-bootstrap/ProgressBar';


const SingleCardCarrousel = (props) => {

    const campaign = props.project;
    const pct = Math.round((campaign.raised / campaign.objective) * 100 * 10) / 10
    

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

    
    return (
      <div className="single-blog-post-item">
        <div className="post-image">
            <Link href="/blog-details">
                <a>
                   <ProgressBar variant="success"  now={pct} label={`${pct}%`}/>

                    <img src={campaign.main_img} alt="image" />
                </a>
            </Link>
        </div>

        <div className="post-content">
            
            <ul className="post-meta">
                <li><p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg> {campaign.time_left}</p></li>
                <li><svg xmlns="http://www.w3.org/2000/svg" width="16" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-activity"><polyline points="17 11 12 6 7 11"></polyline><polyline points="17 18 12 13 7 18"></polyline></svg>
 {campaign.raised} {campaign.currency}</li>
            </ul>
            <h3>
                <Link href="/blog-details">
                    <a>{campaign.title}</a>
                </Link>
            </h3>

            <Link href="/blog-details">
                    {cat()}
            </Link>
        </div>
      </div>
    );
}

export default SingleCardCarrousel;