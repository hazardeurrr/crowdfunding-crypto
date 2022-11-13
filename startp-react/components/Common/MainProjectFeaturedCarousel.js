import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import * as Icon from 'react-feather';
import SingleCardCarrousel from '../Common/SingleCardCarrousel';
import { useSelector, useDispatch } from 'react-redux'
import {getAll} from '../../firebase-crowdfund/queries';
import MainProjectFeatured from './MainProjectFeatured';
import { FlashOnRounded } from '@material-ui/icons';
const OwlCarousel = dynamic(import('react-owl-carousel3'));






const MainProjectFeaturedCarousel = ({p}) => {
    const [display, setDisplay] = React.useState(false);

    const projects = useSelector((state) => state.firstCampaigns)

    React.useEffect(() => {
        setDisplay(true);

      
    }, [])

    const options = {
        loop: true,
        nav: false,
        dots: true,
        autoplay: true,
        smartSpeed: 1000,
        autoplayTimeout: 8000,
        items: 1,
        touchDrag: false,
        mouseDrag: false,
        pullDrag: false,
    }

    const ShowProjects = () => {
        const len = projects.length > 3 ? 3 : projects.length
        var rows = [];
        for (var i = 0; i < len; i++) {
            rows.push(<div key={i} className="single-ml-projects-box">
            <MainProjectFeatured project={projects[i]} top={i+1}
            /></div>)
        }
        return rows;
    }

    const displayContent = () => {
        if(projects != undefined && projects.length != 0){
            return <div className="container-fluid">
            {display ? <OwlCarousel 
                    className="testimonials-slides owl-carousel owl-theme"
                    {...options}
            >  
            {ShowProjects()}
            </OwlCarousel> : ''}
        </div>

        } 
    }

    
    
    return (
        <div className="ml-projects-area pt-0">
            {displayContent()}
        </div>
    );
}

export default MainProjectFeaturedCarousel;