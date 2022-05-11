import React from 'react';
import Link from 'next/link';
import SimpleCampaignPost from '../Common/SimpleCampaignPost';

import { useSelector } from 'react-redux';
import FeaturedProjectCarrousel from '../ITStartup/FeaturedProjectCarrousel';
import MainProjectFeaturedCarousel from '../Common/MainProjectFeaturedCarousel';
import MainProjectFeatured from '../Common/MainProjectFeatured';

const MainBanner = () => {
    const projectList = useSelector((state) => state.allCampaigns)

    const showProject = () => {
        if(projectList.length > 0){
            return <div style={{marginTop: 50}}><MainProjectFeaturedCarousel /></div>
						    // return <div style={{marginTop: 50}}><MainProjectFeatured project={projectList[0]} /></div>
        }
    }

    return (
        <div className="main-banner" style={{paddingTop: 150, marginBottom: -50}}>
			<div className="d-table">
				<div className="d-table-cell">
					<div className="container">
						<div className="row h-100 justify-content-center align-items-center">
							<div className="col-lg-5">
								<div className="hero-content">
								<h1>A new way to raise funds</h1>
                           
													 <h5>Crowdfunding 3.0</h5><p style={{marginTop: 15}}>Less fees, more trust, community based.<br></br>Earn <Link href="/token"><a><img style={{height: 20, marginRight: 3}} src="/images/cryptoicons/bbstgrad.png"/>BBST</a></Link> while supporting great projects !
													 <br></br>Raise and contribute in crypto on Ethereum & Polygon.</p>

											 <Link href="/form-campaign">
												<a className="btn btn-primary">Create a campaign</a>
											</Link>
																		<Link href={{
																								pathname: "SearchPage",
																								query: {
																										id: "explore",
																										}
																								}} activeClassName="active">
																								<a className="btn btn-light">Explore</a>
																		</Link>
								</div>
							</div>

							{/* <div className="col-lg-5 offset-lg-1"> */}
                            <div className="col-lg-6 col-md-12">

								{/* <div className="banner-form ml-3"> */}
                                    {showProject()}
								{/* </div> */}
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

export default MainBanner;