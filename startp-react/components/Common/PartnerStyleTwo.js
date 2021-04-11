import React from 'react';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
    loop: true,
    nav: false,
    dots: false,
    autoplay: true,
    smartSpeed: 1000,
    autoplayTimeout: 5000,
    responsive: {
        0:{
            items:2,
        },
        768:{
            items:4,
        },
        1200:{
            items:6,
        }
    }
}

const PartnerStyleTwo = () => {
    const [display, setDisplay] = React.useState(false);

    React.useEffect(() => {
        setDisplay(true);
    }, [])

    return (
        <div className="repair-partner-area bg-f9fafb">
            <div className="container">
                {display ? <OwlCarousel 
                    className="repair-partner-slides owl-carousel owl-theme"
                    {...options}
                >
                    <div className="single-repair-partner">
                        <a href="#" target="_blank">
                            <img src='/images/partner-img/partner-1.png' alt="image" />
                            <img src='/images/partner-img/partner-hover1.png' alt="image" />
                        </a>
                    </div>
            
                    <div className="single-repair-partner">
                        <a href="#" target="_blank">
                            <img src='/images/partner-img/partner-2.png' alt="image" />
                            <img src='/images/partner-img/partner-hover2.png' alt="image" />
                        </a>
                    </div>
                
                    <div className="single-repair-partner">
                        <a href="#" target="_blank">
                            <img src='/images/partner-img/partner-3.png' alt="image" />
                            <img src='/images/partner-img/partner-hover3.png' alt="image" />
                        </a>
                    </div>
        
                    <div className="single-repair-partner">
                        <a href="#" target="_blank">
                            <img src='/images/partner-img/partner-10.png' alt="image" />
                            <img src='/images/partner-img/partner-hover10.png' alt="image" />
                        </a>
                    </div>
            
                    <div className="single-repair-partner">
                        <a href="#" target="_blank">
                            <img src='/images/partner-img/partner-5.png' alt="image" />
                            <img src='/images/partner-img/partner-hover5.png' alt="image" />
                        </a>
                    </div>
        
                    <div className="single-repair-partner">
                        <a href="#" target="_blank">
                            <img src='/images/partner-img/partner-6.png' alt="image" />
                            <img src='/images/partner-img/partner-hover6.png' alt="image" />
                        </a>
                    </div>
        
                    <div className="single-repair-partner">
                        <a href="#" target="_blank">
                            <img src='/images/partner-img/partner-7.png' alt="image" />
                            <img src='/images/partner-img/partner-hover7.png' alt="image" />
                        </a>
                    </div>
                </OwlCarousel> : ''}
            </div>
        </div>
    );
}

export default PartnerStyleTwo;
