import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import * as Icon from 'react-feather';
import Link from 'next/link';
 
const Team = () => {
    return (
        <>
            <Navbar />

            <PageBanner pageTitle="Team" />

            <div className="team-area pt-80 pb-50 bg-f9f6f6">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6">
                            <div className="single-team">
                                <div className="team-image">
                                    <img src="/images/team-image/team1.jpg" alt="image" />
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

                                    <p>Risus commodo viverra maecenas accumsan lacus vel facilisis quis ipsum. </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-team">
                                <div className="team-image">
                                    <img src="/images/team-image/team2.jpg" alt="image" />
                                </div>

                                <div className="team-content">
                                    <div className="team-info">
                                        <h3>Alex Maxwel</h3>
                                        <span>Marketing Manager</span>
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
                        </div>
                        
                        <div className="col-lg-4 col-md-6">
                            <div className="single-team">
                                <div className="team-image">
                                    <img src="/images/team-image/team3.jpg" alt="image" />
                                </div>

                                <div className="team-content">
                                    <div className="team-info">
                                        <h3>Janny Cotller</h3>
                                        <span>Web Developer</span>
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
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-team">
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
                        </div>

                        <div className="col-lg-4 col-md-6">
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
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-team">
                                <div className="team-image">
                                    <img src="/images/team-image/team1.jpg" alt="image" />
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

                                    <p>Risus commodo viverra maecenas accumsan lacus vel facilisis quis ipsum. </p>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-team">
                                <div className="team-image">
                                    <img src="/images/team-image/team2.jpg" alt="image" />
                                </div>

                                <div className="team-content">
                                    <div className="team-info">
                                        <h3>Alex Maxwel</h3>
                                        <span>Marketing Manager</span>
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
                        </div>
                        
                        <div className="col-lg-4 col-md-6">
                            <div className="single-team">
                                <div className="team-image">
                                    <img src="/images/team-image/team3.jpg" alt="image" />
                                </div>

                                <div className="team-content">
                                    <div className="team-info">
                                        <h3>Janny Cotller</h3>
                                        <span>Web Developer</span>
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
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-team">
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
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Team;