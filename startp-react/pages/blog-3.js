import React from 'react';
import Navbar from "@/components/_App/Navbar";
import Footer from "@/components/_App/Footer";
import PageBanner from '@/components/Common/PageBanner';
import * as Icon from 'react-feather';
import Link from 'next/link';
 
const Blog3 = () => {
    return (
        <>
            <Navbar />

            <PageBanner pageTitle="Blog Grid" />

            <div className="blog-area ptb-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4 col-md-6">
                            <div className="single-blog-post-box">
                                <div className="entry-thumbnail">
                                    <Link href="/blog-details">
                                        <a>
                                            <img src="/images/blog-image/blog9.jpg" alt="image" />
                                        </a>
                                    </Link>
                                </div>

                                <div className="entry-post-content">
                                    <div className="entry-meta">
                                        <ul>
                                            <li><a href="#">Admin</a></li>
                                            <li>August 15, 2021</li>
                                        </ul>
                                    </div>

                                    <h3>
                                        <Link href="/blog-details">
                                            <a>Making Peace With The Feast Or Famine Of Freelancing</a>
                                        </Link>
                                    </h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...</p>

                                    <Link href="/blog-details">
                                        <a className="learn-more-btn">
                                            Read Story <Icon.Plus />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-blog-post-box">
                                <div className="entry-thumbnail">
                                    <Link href="/blog-details">
                                        <a>
                                            <img src="/images/blog-image/blog10.jpg" alt="image" />
                                        </a>
                                    </Link>
                                </div>

                                <div className="entry-post-content">
                                    <div className="entry-meta">
                                        <ul>
                                            <li><a href="#">Admin</a></li>
                                            <li>August 18, 2021</li>
                                        </ul>
                                    </div>
 
                                    <h3>
                                        <Link href="/blog-details">
                                            <a>I Used The Web For A Day On A 50 MB Budget</a>
                                        </Link>
                                    </h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...</p>
                                    
                                    <Link href="/blog-details">
                                        <a className="learn-more-btn">
                                            Read Story <Icon.Plus />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-blog-post-box">
                                <div className="entry-thumbnail">
                                    <Link href="/blog-details">
                                        <a>
                                            <img src="/images/blog-image/blog11.jpg" alt="image" />
                                        </a>
                                    </Link>
                                </div>

                                <div className="entry-post-content">
                                    <div className="entry-meta">
                                        <ul>
                                            <li><a href="#">Admin</a></li>
                                            <li>August 15, 2021</li>
                                        </ul>
                                    </div>
 
                                    <h3>
                                        <Link href="/blog-details">
                                            <a>Here are the 5 most telling signs of micromanagement</a>
                                        </Link>
                                    </h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...</p>
                                    
                                    <Link href="/blog-details">
                                        <a className="learn-more-btn">
                                            Read Story <Icon.Plus />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-blog-post-box">
                                <div className="entry-thumbnail">
                                    <Link href="/blog-details">
                                        <a>
                                            <img src="/images/blog-image/blog12.jpg" alt="image" />
                                        </a>
                                    </Link>
                                </div>

                                <div className="entry-post-content">
                                    <div className="entry-meta">
                                        <ul>
                                            <li><a href="#">Admin</a></li>
                                            <li>August 15, 2021</li>
                                        </ul>
                                    </div>
 
                                    <h3>
                                        <Link href="/blog-details">
                                            <a>The security risks of changing package owners</a>
                                        </Link>
                                    </h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...</p>
                                    
                                    <Link href="/blog-details">
                                        <a className="learn-more-btn">
                                            Read Story <Icon.Plus />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-blog-post-box">
                                <div className="entry-thumbnail">
                                    <Link href="/blog-details">
                                        <a>
                                            <img src="/images/blog-image/blog13.jpg" alt="image" />
                                        </a>
                                    </Link>
                                </div>

                                <div className="entry-post-content">
                                    <div className="entry-meta">
                                        <ul>
                                            <li><a href="#">Admin</a></li>
                                            <li>August 18, 2021</li>
                                        </ul>
                                    </div>
 
                                    <h3>
                                        <Link href="/blog-details">
                                            <a>Tips to Protecting Your Business and Family</a>
                                        </Link>
                                    </h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...</p>
                                    
                                    <Link href="/blog-details">
                                        <a className="learn-more-btn">
                                            Read Story <Icon.Plus />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-4 col-md-6">
                            <div className="single-blog-post-box">
                                <div className="entry-thumbnail">
                                    <Link href="/blog-details">
                                        <a>
                                            <img src="/images/blog-image/blog14.jpg" alt="image" />
                                        </a>
                                    </Link>
                                </div>

                                <div className="entry-post-content">
                                    <div className="entry-meta">
                                        <ul>
                                            <li><a href="#">Admin</a></li>
                                            <li>August 15, 2021</li>
                                        </ul>
                                    </div>
 
                                    <h3>
                                        <Link href="/blog-details">
                                            <a>Protect Your Workplace from Cyber Attacks</a>
                                        </Link>
                                    </h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod...</p>
                                    
                                    <Link href="/blog-details">
                                        <a className="learn-more-btn">
                                            Read Story <Icon.Plus />
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

export default Blog3;