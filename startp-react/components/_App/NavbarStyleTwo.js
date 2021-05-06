import React from "react"
import Link from '@/utils/ActiveLink'
import * as Icon from 'react-feather'
import { useSelector } from 'react-redux'
import { FaTelegramPlane, FaMediumM } from 'react-icons/fa';


const NavbarStyleTwo = () => {
    const cart = useSelector((state) => state.cart)
    const [menu, setMenu] = React.useState(true)
 
    const toggleNavbar = () => {
        setMenu(!menu)
    }

    React.useEffect(() => {
        let elementId = document.getElementById("header");
        document.addEventListener("scroll", () => {
            if (window.scrollY > 170) {
                elementId.classList.add("is-sticky");
            } else {
                elementId.classList.remove("is-sticky");
            }
        });
        window.scrollTo(0, 0); 
    })
 
    const classOne = menu ? 'collapse navbar-collapse' : 'collapse navbar-collapse show';
    const classTwo = menu ? 'navbar-toggler navbar-toggler-right collapsed' : 'navbar-toggler navbar-toggler-right';

    return (
        <header id="header" className="headroom">
            <div className="startp-nav">
                <div className="container">
                    <nav className="navbar navbar-expand-md navbar-light">
                        <Link href="/it-startup">
                            <a onClick={toggleNavbar} className="navbar-brand">
                                <img src="/images/logo.png" alt="logo" />
                            </a>
                        </Link>

                        <button 
                            onClick={toggleNavbar} 
                            className={classTwo}
                            type="button" 
                            data-toggle="collapse" 
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
                            aria-expanded="false" 
                            aria-label="Toggle navigation"
                        >
                            <span className="icon-bar top-bar"></span>
                            <span className="icon-bar middle-bar"></span>
                            <span className="icon-bar bottom-bar"></span>
                        </button>

                        <div className={classOne} id="navbarSupportedContent">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item">
                                    <Link href="#">
                                        <a onClick={e => e.preventDefault()} className="nav-link">
                                            The project
                                        </a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                     <Link href="#">
                                        <a onClick={e => e.preventDefault()} className="nav-link">
                                            BBST Token
                                        </a>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link href="#">
                                        <a onClick={e => e.preventDefault()} className="nav-link">
                                            Roadmap
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div>


                        <div className="others-option">
                            <div className="single-footer-widget">

                                <ul className="social-links">
                                    
                                    <li>
                                        <Link href="#">
                                            <a className="twitter" target="_blank"><Icon.Twitter /></a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a className="linkedin" target="_blank"><FaTelegramPlane /></a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a className="instagram" target="_blank"><FaMediumM /></a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="#">
                                            <a className="facebook" target="_blank"><Icon.Facebook /></a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
						</div>
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default NavbarStyleTwo;