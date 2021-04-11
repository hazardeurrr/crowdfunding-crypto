import React from 'react';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
    loop: true,
    nav: true,
    smartSpeed: 1000,
    autoplayTimeout: 5000,
    dots: false,
    animateOut: 'fadeOut',
    autoplayHoverPause: true,
    autoplay: true,
    items: 1,
    navText: [
        "<i class='bx bx-chevron-left'></i>",
        "<i class='bx bx-chevron-right'></i>"
    ]
};

const MainBanner = () => {
    const [display, setDisplay] = React.useState(false);

    React.useEffect(() => {
        setDisplay(true);
    }, [])

    return (
        <>
            {display ? <OwlCarousel 
                className="agency-portfolio-home-slides owl-carousel owl-theme"
                {...options}
            > 
                <div className="agency-portfolio-main-banner portfolio-banner-bg1">
                    <div className="d-table">
                        <div className="d-table-cell">
                            <div className="container">
                                <div className="portfolio-banner-content">
                                    <span className="sub-title">We are Creative</span>
                                    <h1>Digital Agency</h1>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                                    <a href="#" className="btn btn-secondary">Get Started</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="agency-portfolio-main-banner portfolio-banner-bg2">
                    <div className="d-table">
                        <div className="d-table-cell">
                            <div className="container">
                                <div className="portfolio-banner-content">
                                    <span className="sub-title">We are Digital</span>
                                    <h1>UX/UI Design</h1>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                                    <a href="#" className="btn btn-secondary">Get Started</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="agency-portfolio-main-banner portfolio-banner-bg3">
                    <div className="d-table">
                        <div className="d-table-cell">
                            <div className="container">
                                <div className="portfolio-banner-content">
                                    <span className="sub-title">We are Agency</span>
                                    <h1>Digital Marketing</h1>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.</p>
                                    <a href="#" className="btn btn-secondary">Get Started</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </OwlCarousel> : ''}
        </>
    )
}

export default MainBanner;  