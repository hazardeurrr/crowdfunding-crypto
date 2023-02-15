import React from 'react';
import Link from 'next/link';
import SimpleCampaignPost from '../Common/SimpleCampaignPost';

import { useSelector } from 'react-redux';
import FeaturedProjectCarrousel from '../ITStartup/FeaturedProjectCarrousel';
import MainProjectFeaturedCarousel from '../Common/MainProjectFeaturedCarousel';
import MainProjectFeatured from '../Common/MainProjectFeatured';

const MainBannerCrea = () => {
    const projectList = useSelector((state) => state.firstCampaigns)

    const showProject = () => {
        if(projectList.length > 0){
            return <div className="mainCarousel"><MainProjectFeaturedCarousel /></div>
						    // return <div style={{marginTop: 50}}><MainProjectFeatured project={projectList[0]} /></div>
        }	
				// else {
				// 	return <img src="/images/ml-banner-image/ml-main-pic-2bnb.png"/>
				// } 
	    }

		const carouselCSS = () => {
			return <div className="col-lg-5">
								{/* <div className="banner-form ml-3"> */}
                                    {showProject()}
														</div>
		}
//style={{paddingTop: 100, marginBottom: -50}}
    return (
        <div className="main-banner" >  
			<div className="d-table">
				<div className="d-table-cell">
					<div className="container" style={{textAlign: 'center'}}>
						<div className="row h-100 justify-content-center align-items-center">
								<div className="hero-content">
								<h5 style={{color:"#6084a4", fontWeight: 350}}>BlockBoosted For Creators</h5>
								<h1>The donation hub for content creators</h1>
                           
													 {/* <h5 style={{marginTop: 25}}>0% fee | 100% free</h5> */}
													 <p style={{marginTop: 10}}>Tip content creators directly in crypto.
													 <br></br>Get rewarded with exclusive NFTs and other counterparts.</p>

											 <Link href="/create">
												<a className="btn btn-primary-crea">Create my page</a>
											</Link>
																		<Link href={{
																								pathname: "/explore",
																								// query: {
																								// 		id: "all",
																								// 		}
																								}} activeClassName="active">
																								<a className="btn btn-light">Explore</a>
																		</Link>
								</div>
							</div>
						</div>
					</div>
			</div>

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
			<div className="shape5">
				<img src="/images/shape5.png" alt="shape" />
			</div>
			<div className="shape6 rotateme">
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

export default MainBannerCrea;