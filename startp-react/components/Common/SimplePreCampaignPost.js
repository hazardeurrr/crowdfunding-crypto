import React, {useEffect, useRef} from 'react';
import * as Icon from 'react-feather';
import Link from 'next/link';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ChipUser from '@/components/Common/ChipUser'
import {getOne } from '../../firebase-crowdfund/queries' 
import RaisedChecker from './RaisedChecker';
import { useSelector, useDispatch } from 'react-redux';
import {chain} from '@/utils/chain'
import {bnb_chain} from '@/utils/bnb_chain'
import {db, firebase} from '../../firebase-crowdfund/index'
import { prefixedAddress } from '@/utils/prefix';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';


const SimplePreCampaignPost = (props) => {
    const campaign = props.project

    const displayDesc = () => {
        if(campaign.small_description.length > 130){
            return campaign.small_description.substring(0, 130) + " [...]"
        } else {
            return campaign.small_description
        }
    }

    const SupportOrSee = () => {
            return "See this campaign"
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
            return <div className='cats_small_div'> <span style={{display:'flex'}}>{getCatIcon(campaign.categories[0])}{campaign.categories[0]}</span><span className="cats_separator">&nbsp; | &nbsp;</span><span style={{display:'flex'}}>{getCatIcon(campaign.categories[1])}{campaign.categories[1]}</span></div>
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
        return (
            <div className="date">
                {/* <Icon.Bookmark/> */}
                {/* {returnCurrencyIconWhite()} */}
            {/* <img style={{height: 20}} src={'/images/cryptoicons/ethwhite.svg'}/>  */}
            {showCats()}
            </div>
        )
    }

    const displayRaised = () => {
        return parseInt(campaign.raised)
    }

    const displayCurrency = () => {
        return <div style={{marginLeft: 3}}>{showCurrencyWoPrefix()}
        {/* &nbsp;{returnCurrencyIcon()} */}
        </div>
    }

    const showCurrencyWoPrefix = () => {
        if(campaign.currency.includes('_'))
            return campaign.currency.substring(campaign.currency.indexOf('_') + 1);
        else
            return campaign.currency
    }

    const displayProgressBar = () => {
        return <ProgressBar variant="purple" now={(campaign.raised / campaign.objective) * 100}/>
    }

    const displayContent = () => {
            return <div className="single-blog-post">
            <div className="blog-image">
              <Link href={{
                               pathname: "/pre/[id]",
                               query: {
                                   id: campaign.id,
                               }
                          }}
                        //   as={`/campaigns/${campaign.contract_address}`}
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
                            pathname: "/pre/[id]",
                            query: {
                                id: campaign.id,
                            }
                        }}
                        // as={`/campaigns/${campaign.contract_address}`}
                        >
                            <a>{campaign.title}</a>
                        </Link>
                    </h3>
                <span width="10">
                    By &nbsp;
                    <Chip style={{maxWidth:'100%'}} avatar={<Avatar alt='avatar' src={campaign.creator_img} />} label={<div style={{
                        alignItems:'center',
                        width: '100%',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        fontSize : "14px",
                        fontStyle: 'italic'
                    }}>{campaign.creator_name} </div>}/>                
                </span>
                <p>{displayDesc()}</p>
                <b style={{fontSize: 16.5, marginTop: 2}}><div style={{display:"flex"}}>{displayRaised()} {displayCurrency()}</div></b>
                {displayProgressBar()}
                {/* <div style={{display:"flex", justifyContent:"space-between"}}>
                    <p><svg style={{marginTop: -2}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>   {timeLeft()}</p>
                    {showNetwork()}
                </div> */}
                <Link href={{
                          pathname: "/pre/[id]",
                          query: {
                              id: campaign.id,
                          }
                      }}
                    //   as={`/campaigns/${campaign.contract_address}`}
                      >
                    <a className="read-more-btn">
                        {SupportOrSee()} <Icon.ArrowRight />
                    </a>
                </Link>
            </div>
          </div>    
    }


    return (
        <>
        {displayContent()}
        </>
    )
}

export default SimplePreCampaignPost;