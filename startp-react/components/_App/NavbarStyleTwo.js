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
                        <Link href="/">
                            <a onClick={toggleNavbar} className="navbar-brand">
                                <img src="/images/logo_svg.svg" style={{width: 110}} alt="logo" />
                            </a>
                        </Link>

                        
                        <div className={classOne} id="navbarSupportedContent">
                            {/* <ul className="navbar-nav ms-auto">
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
                                        <a href="#roadmap"onClick={e => e.preventDefault()} className="nav-link">
                                            Roadmap
                                        </a>
                                </li>
                            </ul> */}
                        </div>

                        <a target="_blank" href="https://app.blockboosted.com/" className="btn btn-primary">
                                        LAUNCH ALPHA
                        </a>

                        {/* <div className="others-option"> */}
                            
                            {/* <div className="single-footer-widget">

                                <ul className="social-links">
                                    
                                    <li> */}
                                        {/* <Link href="https://twitter.com/blockboosted">
                                            <a className="twitter" target="_blank"><Icon.Twitter /></a>
                                        </Link>
                                    </li> */}
                                    {/* <li>
                                        <Link href="https://twitter.com/blockboosted">
                                            <a className="linkedin" target="_blank"><FaTelegramPlane /></a>
                                        </Link>
                                    </li> */}
                                    {/* <li>
                                        <Link href="https://medium.com/@blockboosted">
                                            <a className="instagram" target="_blank"><FaMediumM /></a>
                                        </Link>
                                    </li> */}
                                  
                                {/* </ul>
                            </div> */}
						{/* </div> */}
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default NavbarStyleTwo;