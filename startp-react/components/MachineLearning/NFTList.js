import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import * as Icon from 'react-feather';
import SingleCardCarrousel from '../Common/SingleCardCarrousel';
import { useSelector, useDispatch } from 'react-redux'
import {getAll} from '../../firebase-crowdfund/queries';
import {db} from '../../firebase-crowdfund/index'
import SingleCardCarrouselCrea from '../Common/SingleCardCarrouselCrea';
import SimpleCampaignPostCrea from '../Common/SimpleCampaignPostCrea';
import SingleNFT from '../Common/SingleNFT';

const OwlCarousel = dynamic(import('react-owl-carousel3'));

const NFTList = ( props ) => {
    const [display, setDisplay] = React.useState(false);
    const dispatch = useDispatch()

    const projects = props.nfts
 
    React.useEffect(() => {

        setDisplay(true);

    }, [projects])

    const options = {
        loop: true,
        nav: false,
        dots: false,
        autoplay: false,
        smartSpeed: 1000,
        margin: 30,
        autoplayTimeout: 5000,
        responsive: {
            0:{
                items: 1,
            },
            576:{
                items: 2,
            },
            768:{
                items: 3,
            },
            1024:{
                items: 4,
            },
            1200:{
                items: 5,
            }
        },
    }

    const ShowProjects = () => {
        // const len = projects.length > 6 ? 6 : projects.length
        var rows = [];
        for (var i = 0; i < projects.length; i++) {
            rows.push(<div key={i} className="single-ml-projects-box" style={{maxWidth: 160, maxHeight: 160}}>
            <SingleNFT nft={projects[i]}/></div>)
        }
        return rows;
    }

    const displayContent = () => {
        if(projects != undefined && projects.length != 0){
            return <div className="container-fluid">
            {display ? <OwlCarousel 
                className="ml-projects-slides owl-carousel owl-theme" 
                {...options}
            >  
            {ShowProjects()}
            </OwlCarousel> : ''}
        </div>

        }
    }

    
    
    return (
        <div className="ml-projects-area pt-0 ptb-80" style={{overflow:'visible', paddingBottom: 0}}>
            {displayContent()}
            {/* Shape Images */}
            <div className="shape1">
                <img src="/images/shape1.png" alt="shape" />
            </div>
            <div className="shape2 rotateme">
                <img src="/images/shape2.svg" alt="shape" />
            </div>
            <div className="shape3">
                <img src="/images/shape3.svg" alt="shape" />
            </div>
            <div className="shape4">
                <img src="/images/shape4.svg" alt="shape" />
            </div>
            <div className="shape7">
                <img src="/images/shape4.svg" alt="shape" />
            </div>
            <div className="shape8 rotateme">
                <img src="/images/shape2.svg" alt="shape" />
            </div>
        </div>
    );
}

export default NFTList;