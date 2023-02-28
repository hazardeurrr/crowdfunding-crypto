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

const NFTList = ({p}) => {
    const [display, setDisplay] = React.useState(false);
    // const [projects, setProjects] = React.useState(undefined)
    const dispatch = useDispatch()

    const projects = useSelector((state) => state.firstCampaigns)
 
    var campaigns = []

    React.useEffect(() => {
        // db.collection("creatorPage")
        // .get()
        // .then((docs) => {
        //     docs.forEach(element => {
        //             campaigns.push(element.data())
        //     })
    
        //     setProjects(campaigns)
    
        // }).catch((error) => {
        //     console.log("Error getting document:", error);
        // });
        setDisplay(true);

    }, [projects])

    const options = {
        loop: true,
        nav: false,
        dots: false,
        autoplay: true,
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
        const len = projects.length > 6 ? 6 : projects.length
        var rows = [];
        for (var i = 0; i < len; i++) {
            rows.push(<div key={i} className="single-ml-projects-box">
            <SingleNFT/></div>)
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