import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
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

const Projects = () => {
    const [display, setDisplay] = React.useState(false);

    React.useEffect(() => {
        setDisplay(true);
    }, [])
    
    return (
        <div className="ml-projects-area pt-0 ptb-80">
            <div className="container">
                <div className="section-title st-fs-28">
                    <h2>Proud Projects That Make Us Stand Out</h2>
                    <div className="bar"></div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            </div>

            <div className="container-fluid">
                {display ? <OwlCarousel 
                    className="ml-projects-slides owl-carousel owl-theme"
                    {...options}
                >  
                    <div className="single-ml-projects-box">
                        <img src="/images/projects-img1.jpg" alt="image" />
                        <div className="plus-icon">
                            <Link href="/project-details">
                                <a><span></span></a>
                            </Link>
                        </div>
                    </div>

                    <div className="single-ml-projects-box">
                        <img src="/images/projects-img2.jpg" alt="image" />
                        <div className="plus-icon">
                            <Link href="/project-details">
                                <a><span></span></a>
                            </Link>
                        </div>
                    </div>

                    <div className="single-ml-projects-box">
                        <img src="/images/projects-img3.jpg" alt="image" />
                        <div className="plus-icon">
                            <Link href="/project-details">
                                <a><span></span></a>
                            </Link>
                        </div>
                    </div>

                    <div className="single-ml-projects-box">
                        <img src="/images/projects-img4.jpg" alt="image" />
                        <div className="plus-icon">
                            <Link href="/project-details">
                                <a><span></span></a>
                            </Link>
                        </div>
                    </div>

                    <div className="single-ml-projects-box">
                        <img src="/images/projects-img5.jpg" alt="image" />
                        <div className="plus-icon">
                            <Link href="/project-details">
                                <a><span></span></a>
                            </Link>
                        </div>
                    </div>
                </OwlCarousel> : ''}
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