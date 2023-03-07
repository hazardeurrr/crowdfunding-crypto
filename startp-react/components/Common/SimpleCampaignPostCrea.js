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
import { prefixedAddress } from '@/utils/prefix';



const SimpleCampaignPostCrea = (props) => {
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
      }, [])
    
   
    const displayDesc = () => {
        // if(campaign.small_description.length > 130){
        //     return campaign.small_description.substring(0, 130) + " [...]"
        // } else {
            return campaign.small_description
        // }
    }

    const SupportOrSee = () => {
        
            return "Support this creator"
        
    }


    // const showCats = () => {
    //     if(campaign.categories.length > 1){
    //         return campaign.categories[0] + " | " + campaign.categories[1]
    //     } else if(campaign.categories.length != 0){
    //         return campaign.categories[0]
    //     }
    // }




   
   
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



    const showNetwork = () => {
        if(campaign.network == chain){
            return <>
                Ethereum<img style={{height: 12, marginTop: -1, marginLeft: 5}} src={'/images/cryptoicons/smallethgray.svg'}/> 
            </>
        } 
    }

    const displayContent = () => {

        return <div className="single-box" style={{marginTop: 60, marginBottom: 60}}>
                    <Link href={{
                        pathname: "/creators/[id]",
                        query: {
                            id: prefixedAddress(campaign.network, campaign.contract_address),
                        }
                    }}
                    as={`/creators/${prefixedAddress(campaign.network, campaign.contract_address)}`}>
                    <a style={{width: '100%'}}>
                          <img style={{borderRadius: '50%', top: -70, width: 125,  height:125, objectFit:'cover', left:0, right:0, marginLeft: 'auto', marginRight: 'auto', position: 'absolute'}} src={campaign.main_img} alt="image" />
                    
                <div style={{marginTop: 50, justifyContent:'center', alignItems:'center'}}>
                    <h3 style={{textAlign:'center'}}>
                            {campaign.name}
                    </h3>
                <p style={{fontSize: 12}}>{displayDesc()}</p>
                
                {/* <b style={{fontSize: 16.5, marginTop: 2}}><div style={{display:"flex"}}>{displayRaised()} {displayCurrency()}</div></b> */}
                {/* {displayProgressBar()}
                <div style={{display:"flex", justifyContent:"space-between"}}>
                    <p><svg style={{marginTop: -2}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-clock"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>   {timeLeft()}</p>
                    <p>{showNetwork()}</p>
                </div> */}
                
                    <p className="read-more-btn">
                        {SupportOrSee()} <Icon.ArrowRight />
                    </p>
                </div>
                </a>
                </Link> 
            </div>           
    }


    return (
        <>
        {displayContent()}
        </>
    )
}

export default SimpleCampaignPostCrea;