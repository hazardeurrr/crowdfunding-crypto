import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import * as Icon from 'react-feather';
import SingleCardCarrousel from '../Common/SingleCardCarrousel';
import { useSelector, useDispatch } from 'react-redux'
import projectList from '@/utils/projectList';
import {getAll} from '../../firebase-crowdfund/queries';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
    loop: true,
    nav: false,
    dots: true,
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
            items: 2,
        },
        1024:{
            items: 3,
        },
        1200:{
            items: 4,
        }
    },
}




const Projects = ({p}) => {
    const [display, setDisplay] = React.useState(false);
    // const [projects, setProjects] = React.useState(undefined)

    const projects = useSelector((state) => state.allCampaigns)

   {/* React.useEffect(() => {
        setDisplay(true);
        var campaigns = []
        getAll('campaign', (docs) => {
            docs.forEach(element => {
                campaigns.push(element.data())
            });
            setProjects(campaigns)
        })
    }, [p])*/}

    React.useEffect(() => {
        setDisplay(true);

      
    }, [])

    const ShowProjects = () => {
        const len = projects.length > 6 ? 6 : projects.length
        var rows = [];
        for (var i = 0; i < len; i++) {
            rows.push(<div key={i} className="single-ml-projects-box">
            <SingleCardCarrousel project={projects[i]}
            /></div>)
        }
        return rows;
    }

    const displayContent = () => {
        if(projects != undefined){
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
        <div className="ml-projects-area pt-0 ptb-80">
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

export default Projects;