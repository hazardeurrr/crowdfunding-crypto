import React from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
    items: 4,
    loop: true,
    nav: false,
    autoplay: true,
    margin:30,
    dots: false,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1200: {
            items: 3
        },
        1500: {
            items: 4
        }
    }
}

const RecentWorks = () => {
    const [display, setDisplay] = React.useState(false);

    React.useEffect(() => {
        setDisplay(true);
    }, [])

    return (
        <div className="works-area pt-80 pb-50 bg-f7fafd">
            <div className="container">
                <div className="section-title">
                    <h2>Some views of our platform</h2>
                    <div className="bar"></div>
                    <p></p>
                </div>
            </div>

            {display ? <OwlCarousel 
                className="works-slides owl-carousel owl-theme"
                {...options}
            > 
                <div className="single-works">
                    <img src="/images/works-image/works-image1.jpg" alt="image" />

                    {/* <Link href="/project-details">
                        <a className="icon"><Icon.Settings /></a>
                    </Link> */}

                    <div className="works-content">
                        <h3>
                            <a>Homepage</a>

                        </h3>
                        <p>Campaigns with the highest number of "like" are featured on our home page. The more BBST you stake, the more impact you have on this choice.
                            You can also easily access campaigns depending on their categories.
                        </p>
                    </div>
                </div>
    
                <div className="single-works">
                    <img src="/images/works-image/works-image2.jpg" alt="image" />

                    {/* <Link href="/project-details">
                        <a className="icon"><Icon.Settings /></a>
                    </Link> */}

                    <div className="works-content">
                        <h3>
                            <a>Explore</a>
                        </h3>
                        <p>Sort campaigns by categories and see a complete overview of each one. <br></br>
                        Looking for a specific campaign ? Or a specific creator ? Research is made easy thanks to our search module.</p>
                    </div>
                </div>
    
                <div className="single-works">
                    <img src="/images/works-image/works-image3.jpg" alt="image" />

                    {/* <Link href="/project-details">
                        <a className="icon"><Icon.Settings /></a>
                    </Link> */}

                    <div className="works-content">
                        <h3>
                            <a>Campaign page</a>
                        </h3>
                        <p>A clean campaign page with everything you need. As a creator, customize it as you want ! Links, images, videos, custom style and tier rewards...
                            Contributors ? Get a clear overview of the creator and its campaign. Share it or back it in one click !
                        </p>
                    </div>
                </div>
        
                <div className="single-works">
                    <img src="/images/works-image/works-image4.jpg" alt="image" />

                    {/* <Link href="/project-details">
                        <a className="icon"><Icon.Settings /></a>
                    </Link> */}

                    <div className="works-content">
                        <h3>
                            <Link href="/project-details">
                                <a>Profile page</a>
                            </Link>
                        </h3>
                        <p>Customize your profile as you wish ! Link your social media account to gain more trust. See all the projects you liked and created.</p>
                    </div>
                </div>
    
            </OwlCarousel> : ''}
            
            {/* Shape Images */}
            <div className="shape8 rotateme">
                <img src="/images/shape2.svg" alt="shape" />
            </div>
            <div className="shape2 rotateme">
                <img src="/images/shape2.svg" alt="shape" />
            </div>
            <div className="shape7">
                <img src="/images/shape4.svg" alt="shape" />
            </div>
            <div className="shape4">
                <img src="/images/shape4.svg" alt="shape" />
            </div>
        </div>
    )
}

export default RecentWorks;
