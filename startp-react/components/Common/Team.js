import React from 'react';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));
import * as Icon from 'react-feather';
import Link from 'next/link'
import {useRouter} from 'next/router'
import fr from '../../public/locales/fr/translation'
import en from '../../public/locales/en/translation'
const options = {
    items: 5,
    loop: true,
    nav: false,
    dots: true,
    margin: 30,
    autoplay: false,
    smartSpeed: 1000,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1200: {
            items: 4
        },
        1500: {
            items: 5
        }
    }
}

const Team = () => {
    const router = useRouter()
    const  {locale} = router
    console.log('locale',locale)
    const t = locale === 'en' ? en : fr
    const [display, setDisplay] = React.useState(false);

    React.useEffect(() => {
        setDisplay(true);
    }, [])

    return (
        <div className="team-area ptb-80 bg-f9f6f6">
            <div className="container">
                <div className="section-title">
                    <h2>{t.team}</h2>
                    <div className="bar"></div>
                </div>
            </div>

            {display ? <OwlCarousel 
                className="team-slider owl-carousel owl-theme owl-theme-style"
                {...options}
            > 
                <div className="single-team">
                    <div className="team-image">
                        <img src="/images/team-image/tibo.jpg" alt="image" />
                    </div>

                    <div className="team-content">
                        <div className="team-info">
                            <h3>Thibault Drouot</h3>
                            <span>CEO - Blockchain Entrepreneur</span>
                        </div>

                        {/* <ul>
                            <li>
                                <Link href="#">
                                    <a target="_blank"><Icon.Facebook /></a>
                                </Link>
                                
                            </li>
                            <li>
                                <Link href="#">
                                    <a target="_blank"><Icon.Twitter /></a>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <a target="_blank"><Icon.Linkedin /></a>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <a target="_blank"><Icon.Gitlab /></a>
                                </Link>
                            </li>
                        </ul>

                        <p>Risus commodo viverra maecenas accumsan lacus vel facilisis quis ipsum. </p> */}
                    </div>
                </div>
            
                <div className="single-team">
                    <div className="team-image">
                        <img src="/images/team-image/hugo.jpg" alt="image" />
                    </div>

                    <div className="team-content">
                        <div className="team-info">
                            <h3>Hugo Deroche</h3>
                            {/* <span>Co-founder</span><br></br> */}
                            <span>Blockchain Engineer | Co-Founder</span>
                        </div>

                        {/* <ul>
                            <li>
                                <Link href="#">
                                    <a target="_blank"><Icon.Facebook /></a>
                                </Link>
                                
                            </li>
                            <li>
                                <Link href="#">
                                    <a target="_blank"><Icon.Twitter /></a>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <a target="_blank"><Icon.Linkedin /></a>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <a target="_blank"><Icon.Gitlab /></a>
                                </Link>
                            </li>
                        </ul>

                        <p>Risus commodo viverra maecenas accumsan lacus vel facilisis quis ipsum. </p> */}
                    </div>
                </div>
    
                <div className="single-team">
                    <div className="team-image">
                        <img src="/images/team-image/malc.jpg" alt="image" />
                    </div>

                    <div className="team-content">
                        <div className="team-info">
                            <h3>Malcolm Etoundi</h3>
                            {/* <span>Co-founder</span><br></br> */}
                            <span>Blockchain Engineer | Co-Founder</span>
                        </div>

                        {/* <ul>
                            <li>
                                <Link href="#">
                                    <a target="_blank"><Icon.Facebook /></a>
                                </Link>
                                
                            </li>
                            <li>
                                <Link href="#">
                                    <a target="_blank"><Icon.Twitter /></a>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <a target="_blank"><Icon.Linkedin /></a>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <a target="_blank"><Icon.Gitlab /></a>
                                </Link>
                            </li>
                        </ul>

                        <p>Risus commodo viverra maecenas accumsan lacus vel facilisis quis ipsum. </p> */}
                    </div>
                </div>
            
                {/* <div className="single-team">
                    <div className="team-image">
                        <img src="/images/team-image/team4.jpg" alt="image" />
                    </div>

                    <div className="team-content">
                        <div className="team-info">
                            <h3>Jason Statham</h3>
                            <span>UX/UI Designer</span>
                        </div>

                        <ul>
                            <li>
                                <Link href="#">
                                    <a target="_blank"><Icon.Facebook /></a>
                                </Link>
                                
                            </li>
                            <li>
                                <Link href="#">
                                    <a target="_blank"><Icon.Twitter /></a>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <a target="_blank"><Icon.Linkedin /></a>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <a target="_blank"><Icon.Gitlab /></a>
                                </Link>
                            </li>
                        </ul>

                        <p>Risus commodo viverra maecenas accumsan lacus vel facilisis quis ipsum. </p>
                    </div>
                </div>
        
                <div className="single-team">
                    <div className="team-image">
                        <img src="/images/team-image/team5.jpg" alt="image" />
                    </div>

                    <div className="team-content">
                        <div className="team-info">
                            <h3>Corey Anderson</h3>
                            <span>Project Manager</span>
                        </div>

                        <ul>
                            <li>
                                <Link href="#">
                                    <a target="_blank"><Icon.Facebook /></a>
                                </Link>
                                
                            </li>
                            <li>
                                <Link href="#">
                                    <a target="_blank"><Icon.Twitter /></a>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <a target="_blank"><Icon.Linkedin /></a>
                                </Link>
                            </li>
                            <li>
                                <Link href="#">
                                    <a target="_blank"><Icon.Gitlab /></a>
                                </Link>
                            </li>
                        </ul>

                        <p>Risus commodo viverra maecenas accumsan lacus vel facilisis quis ipsum. </p>
                    </div>
                </div>
         */}
               
            </OwlCarousel> : ''}
        </div>
    )
}

export default Team;