import React from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';
 
const CategoriesMainPage = () => {
    return (
        <>

            <div className="solutions-area ptb-80">
                <div className="container">
                    <div className="section-title">
                        <span className="sub-title">Categories</span>
                        <h2>Discover projects that inspire you</h2>
                        <div className="bar"></div>
                        {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-solutions-box">
                                <div className="icon">
                                    <img src="/images/icon4.png" alt="image" />
                                </div>
                                <h3>
                                    <Link href="/service-details">
                                        <a>Charity</a>
                                    </Link>
                                </h3>
                                <p>Donate to charity and make a small step changing the world</p>
                                
                                <Link href="/service-details">
                                    <a className="learn-more-btn">
                                        <Icon.PlusCircle /> See campaigns
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-solutions-box">
                                <div className="icon">
                                    <img src="/images/icon5.png" alt="image" />
                                </div>
                                <h3>
                                    <Link href="/service-details">
                                        <a>Tech</a>
                                    </Link>
                                </h3>
                                <p>Discover the tech projects that could be a new revolution !</p>
                                
                                <Link href="/service-details">
                                    <a className="learn-more-btn">
                                        <Icon.PlusCircle /> See campaigns
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-solutions-box">
                                <div className="icon">
                                    <img src="/images/icon6.png" alt="image" />
                                </div> 
                                <h3>
                                    <Link href="/service-details">
                                        <a>Art</a>
                                    </Link>
                                </h3>
                                <p>Support artists financing their projects and creations</p>
                                
                                <Link href="/service-details">
                                    <a className="learn-more-btn">
                                        <Icon.PlusCircle /> Learn More
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-solutions-box">
                                <div className="icon">
                                    <img src="/images/icon7.png" alt="image" />
                                </div> 
                                <h3>
                                    <Link href="/service-details">
                                        <a>Games</a>
                                    </Link>
                                </h3>
                                <p>Help game studios and indie developpers to launch their games !</p>
                                
                                <Link href="/service-details">
                                    <a className="learn-more-btn">
                                        <Icon.PlusCircle /> See campaigns
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-solutions-box">
                                <div className="icon">
                                    <img src="/images/icon6.png" alt="image" />
                                </div> 
                                <h3>
                                    <Link href="/service-details">
                                        <a>Crypto</a>
                                    </Link>
                                </h3>
                                <p>Find new cryptocurrency-related projects and help them to take off !</p>
                                
                                <Link href="/service-details">
                                    <a className="learn-more-btn">
                                        <Icon.PlusCircle /> See campaigns
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-solutions-box">
                                <div className="icon">
                                    <img src="/images/icon7.png" alt="image" />
                                </div> 
                                <h3>
                                    <Link href="/service-details">
                                        <a>Travel</a>
                                    </Link>
                                </h3>
                                <p>Contribute to people's dreams, helping them totravel the world...</p>
                                
                                <Link href="/service-details">
                                    <a className="learn-more-btn">
                                        <Icon.PlusCircle /> See campagins
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-solutions-box">
                                <div className="icon">
                                    <img src="/images/icon5.png" alt="image" />
                                </div> 
                                <h3>
                                    <Link href="/service-details">
                                        <a>Innovation</a>
                                    </Link>
                                </h3>
                                <p>Discover the projects that will make the world of tommorrow...</p>
                                
                                <Link href="/service-details">
                                    <a className="learn-more-btn">
                                        <Icon.PlusCircle /> See campaigns
                                    </a>
                                </Link>
                            </div>
                        </div>

                        <div className="col-lg-3 col-sm-6 col-md-6">
                            <div className="single-solutions-box">
                                <div className="icon">
                                    <img src="/images/icon4.png" alt="image" />
                                </div> 
                                <h3>
                                    <Link href="/service-details">
                                        <a>Special Events</a>
                                    </Link>
                                </h3>
                                <p>Contribute to the organization of a special event financing it !</p>
                                
                                <Link href="/service-details">
                                    <a className="learn-more-btn">
                                        <Icon.PlusCircle /> See campaigns
                                    </a>
                                </Link>
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
        </>
    )
}

export default CategoriesMainPage;