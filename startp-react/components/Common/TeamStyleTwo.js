import React from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';

const TeamStyleTwo = () => {
    return (
        <div className="team-area repair-team-area pt-80 pb-50 bg-f9f6f6">
            <div className="container">
                <div className="section-title">
                    <h2>Our Awesome Team</h2>
                    <div className="bar"></div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>
            
                <div className="row justify-content-center">
                    <div className="col-lg-3 col-md-6">
                        <div className="single-team">
                            <div className="team-image">
                                <img src='/images/team-image/team1.jpg' alt="image" />
                            </div>

                            <div className="team-content">
                                <div className="team-info">
                                    <h3>Josh Buttler</h3>
                                    <span>CEO & Founder</span>
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

                                <p>Risus commodo viverra maecenas accumsan lacus vel facilisis quis ipsum.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="single-team">
                            <div className="team-image">
                                <img src='/images/team-image/team2.jpg' alt="image" />
                            </div>

                            <div className="team-content">
                                <div className="team-info">
                                    <h3>Alex Maxwel</h3>
                                    <span>CEO & Founder</span>
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

                                <p>Risus commodo viverra maecenas accumsan lacus vel facilisis quis ipsum.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="single-team">
                            <div className="team-image">
                                <img src='/images/team-image/team3.jpg' alt="image" />
                            </div>

                            <div className="team-content">
                                <div className="team-info">
                                    <h3>Janny Cotller</h3>
                                    <span>CEO & Founder</span>
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

                                <p>Risus commodo viverra maecenas accumsan lacus vel facilisis quis ipsum.</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="single-team">
                            <div className="team-image">
                                <img src='/images/team-image/team4.jpg' alt="image" />
                            </div>

                            <div className="team-content">
                                <div className="team-info">
                                    <h3>Jason Statham</h3>
                                    <span>CEO & Founder</span>
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

                                <p>Risus commodo viverra maecenas accumsan lacus vel facilisis quis ipsum.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamStyleTwo;