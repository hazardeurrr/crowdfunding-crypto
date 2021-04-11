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
                    <h2>Our Recent Works</h2>
                    <div className="bar"></div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>

            {display ? <OwlCarousel 
                className="works-slides owl-carousel owl-theme"
                {...options}
            > 
                <div className="single-works">
                    <img src="/images/works-image/works-image1.jpg" alt="image" />

                    <Link href="/project-details">
                        <a className="icon"><Icon.Settings /></a>
                    </Link>

                    <div className="works-content">
                        <h3>
                            <Link href="/project-details">
                                <a>Incredible infrastructure</a>
                            </Link>
                        </h3>
                        <p>Lorem ipsum dolor amet, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                    </div>
                </div>
    
                <div className="single-works">
                    <img src="/images/works-image/works-image2.jpg" alt="image" />

                    <Link href="/project-details">
                        <a className="icon"><Icon.Settings /></a>
                    </Link>

                    <div className="works-content">
                        <h3>
                            <Link href="/project-details">
                                <a>Email Notifications</a>
                            </Link>
                        </h3>
                        <p>Lorem ipsum dolor amet, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                    </div>
                </div>
    
                <div className="single-works">
                    <img src="/images/works-image/works-image3.jpg" alt="image" />

                    <Link href="/project-details">
                        <a className="icon"><Icon.Settings /></a>
                    </Link>

                    <div className="works-content">
                        <h3>
                            <Link href="/project-details">
                                <a>Best Analytics Audits</a>
                            </Link>
                        </h3>
                        <p>Lorem ipsum dolor amet, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                    </div>
                </div>
        
                <div className="single-works">
                    <img src="/images/works-image/works-image4.jpg" alt="image" />

                    <Link href="/project-details">
                        <a className="icon"><Icon.Settings /></a>
                    </Link>

                    <div className="works-content">
                        <h3>
                            <Link href="/project-details">
                                <a>Simple Dashboard</a>
                            </Link>
                        </h3>
                        <p>Lorem ipsum dolor amet, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
                    </div>
                </div>
    
                <div className="single-works">
                    <img src="/images/works-image/works-image5.jpg" alt="image" />

                    <Link href="/project-details">
                        <a className="icon"><Icon.Settings /></a>
                    </Link>
                    
                    <div className="works-content">
                        <h3>
                            <Link href="/project-details"><a>Information Retrieval</a></Link>
                        </h3>
                        <p>Lorem ipsum dolor amet, adipiscing, sed do eiusmod tempor incididunt ut labore dolore magna aliqua.</p>
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
