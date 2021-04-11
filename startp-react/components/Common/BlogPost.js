import React from 'react';
import Link from 'next/link';
import * as Icon from 'react-feather';

const BlogPost = () => {
    return (
        <div className="blog-area pt-80 pb-50">
            <div className="container">
                <div className="section-title">
                    <h2>The News from Our Blog</h2>
                    <div className="bar"></div>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                </div>

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

                                <span>
                                    By <Link href="#"><a href="#">Admin</a></Link>
                                </span>

                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse.</p>

                                <Link href="/blog-details">
                                    <a className="read-more-btn">Read More <Icon.ArrowRight /></a>
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

                                <span>
                                    By <Link href="#"><a>Smith</a></Link>
                                </span>

                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse.</p>

                                <Link href="/blog-details">
                                    <a className="read-more-btn">Read More <Icon.ArrowRight /></a>
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

                                <span>
                                    By <Link href="#"><a>John</a></Link>
                                </span>

                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse.</p>

                                <Link href="/blog-details">
                                    <a className="read-more-btn">Read More <Icon.ArrowRight /></a>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BlogPost;  