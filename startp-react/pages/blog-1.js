import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import * as Icon from 'react-feather';
import Link from 'next/link';
 
const Blog1 = () => {
    return (
        <>
            <Navbar />

            <PageBanner pageTitle="Blog Grid" />
 
            <div className="blog-area ptb-80">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-4 col-md-6">
                            <div className="single-blog-post">
                                <div className="blog-image">
                                    <Link href="/blog-details">
                                        <a>
                                            <img src="/images/blog-image/blog1.jpg" alt="image" />
                                        </a>
                                    </Link>

                                    <div className="date">
                                        <Icon.Calendar /> March 15, 2021
                                    </div>
                                </div>

                                <div className="blog-post-content">
                                    <h3>
                                        <Link href="/blog-details">
                                            <a>The Security Risks of Changing Package Owners</a>
                                        </Link>
                                    </h3>

                                    <span>By <a href="#">Admin</a></span>

                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>

                                    <Link href="/blog-details">
                                        <a className="read-more-btn">
                                            Read More <Icon.ArrowRight />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-blog-post">
                                <div className="blog-image">
                                    <Link href="/blog-details">
                                        <a>
                                            <img src="/images/blog-image/blog2.jpg" alt="image" />
                                        </a>
                                    </Link>

                                    <div className="date">
                                        <Icon.Calendar /> March 17, 2021
                                    </div>
                                </div>

                                <div className="blog-post-content">
                                    <h3>
                                        <Link href="/blog-details">
                                            <a>Tips to Protecting Your Business and Family</a>
                                        </Link>
                                    </h3>

                                    <span>By <a href="#">Smith</a></span>

                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>

                                    <Link href="/blog-details">
                                        <a className="read-more-btn">
                                            Read More <Icon.ArrowRight />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-blog-post">
                                <div className="blog-image">
                                    <Link href="/blog-details">
                                        <a>
                                            <img src="/images/blog-image/blog3.jpg" alt="image" />
                                        </a>
                                    </Link>

                                    <div className="date">
                                        <Icon.Calendar /> March 19, 2021
                                    </div>
                                </div>

                                <div className="blog-post-content"> 
                                    <h3>
                                        <Link href="/blog-details">
                                            <a>Protect Your Workplace from Cyber Attacks</a>
                                        </Link>
                                    </h3>

                                    <span>By <a href="#">John</a></span>

                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>

                                    <Link href="/blog-details">
                                        <a className="read-more-btn">
                                            Read More <Icon.ArrowRight />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-lg-4 col-md-6">
                            <div className="single-blog-post">
                                <div className="blog-image">
                                    <Link href="/blog-details">
                                        <a>
                                            <img src="/images/blog-image/blog4.jpg" alt="image" />
                                        </a>
                                    </Link>

                                    <div className="date">
                                        <Icon.Calendar /> March 15, 2021
                                    </div>
                                </div>

                                <div className="blog-post-content">
                                    <h3>
                                        <Link href="/blog-details">
                                            <a>Here are the 5 most telling signs of micromanagement</a>
                                        </Link>
                                    </h3>

                                    <span>By <a href="#">Admin</a></span>

                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>

                                    <Link href="/blog-details">
                                        <a className="read-more-btn">
                                            Read More <Icon.ArrowRight />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-blog-post">
                                <div className="blog-image">
                                    <Link href="/blog-details">
                                        <a>
                                            <img src="/images/blog-image/blog5.jpg" alt="image" />
                                        </a>
                                    </Link>

                                    <div className="date">
                                        <Icon.Calendar /> March 17, 2021
                                    </div>
                                </div>

                                <div className="blog-post-content">
                                    <h3>
                                        <Link href="/blog-details">
                                            <a>I Used The Web For A Day On A 50 MB Budget</a>
                                        </Link>
                                    </h3>

                                    <span>By <a href="#">Smith</a></span>

                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>

                                    <Link href="/blog-details">
                                        <a className="read-more-btn">
                                            Read More <Icon.ArrowRight />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-blog-post">
                                <div className="blog-image">
                                    <Link href="/blog-details">
                                        <a>
                                            <img src="/images/blog-image/blog6.jpg" alt="image" />
                                        </a>
                                    </Link>

                                    <div className="date">
                                        <Icon.Calendar /> March 19, 2021
                                    </div>
                                </div>

                                <div className="blog-post-content">
                                    <h3>
                                        <Link href="/blog-details">
                                            <a>Making Peace With The Feast Or Famine Of Freelancing</a>
                                        </Link>
                                    </h3>

                                    <span>By <a href="#">John</a></span>

                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.</p>

                                    <Link href="/blog-details">
                                        <a className="read-more-btn">
                                            Read More <Icon.ArrowRight />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                        
                        {/* Pagination */}
                        <div className="col-lg-12 col-md-12">
                            <div className="pagination-area">
                                <nav aria-label="Page navigation">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item"><a className="page-link" href="#">Prev</a></li>
                                        
                                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                        
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        
                                        <li className="page-item"><a className="page-link" href="#">Next</a></li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
		    </div>

            <Footer />
        </>
    )
}

export default Blog1;