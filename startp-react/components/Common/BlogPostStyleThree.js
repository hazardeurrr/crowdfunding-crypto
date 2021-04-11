import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const OwlCarousel = dynamic(import('react-owl-carousel3'));

const options = {
    loop: true,
    nav: false,
    dots: true,
    autoplayHoverPause: true,
    autoplay: true,
    smartSpeed: 1000,
    autoplayTimeout: 5000,
    margin: 30,
    responsive: {
        0: {
            items: 1,
        },
        768: {
            items: 2,
        },
        992: {
            items: 3,
        }
    }
};

const BlogPostStyleThree = () => {
    const [display, setDisplay] = React.useState(false);

    React.useEffect(() => {
        setDisplay(true);
    }, [])

    return (
        <div className="blog-area ptb-80">
			<div className="container">
				<div className="section-title text-left">
					<h2>Our Recent <span>News</span></h2>
					<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
				</div>

                {display ? <OwlCarousel 
                    className="blog-slides owl-carousel owl-theme"
                    {...options}
                >   
                    <div className="single-blog-item">
                        <div className="post-image">
                            <Link href="/blog-details">
                                <a><img src="/images/blog-image/blog1.jpg" alt="image" /></a>
                            </Link>
                        </div>

                        <div className="post-content">
                            <ul className="post-meta">
                                <li>By <a href="#">Admin</a></li>
                                <li>20 February 2020</li>
                            </ul>
                            <h3>
                                <Link href="/blog-details">
                                    <a>The security risks of changing package owners</a>
                                </Link>
                            </h3>
                        </div>
                    </div>

                    <div className="single-blog-item">
                        <div className="post-image">
                            <Link href="/blog-details">
                                <a><img src="/images/blog-image/blog2.jpg" alt="image" /></a>
                            </Link>
                        </div>

                        <div className="post-content">
                            <ul className="post-meta">
                                <li>By <a href="#">Admin</a></li>
                                <li>21 February 2020</li>
                            </ul>
                            <h3>
                                <Link href="/blog-details">
                                    <a>Tips to Protecting Your Business and Family</a>
                                </Link>
                            </h3>
                        </div>
                    </div>

                    <div className="single-blog-item">
                        <div className="post-image">
                            <Link href="/blog-details">
                                <a><img src="/images/blog-image/blog3.jpg" alt="image" /></a>
                            </Link>
                        </div>

                        <div className="post-content">
                            <ul className="post-meta">
                                <li>By <a href="#">Admin</a></li>
                                <li>22 February 2020</li>
                            </ul>
                            <h3>
                                <Link href="/blog-details">
                                    <a>Protect Your Workplace from Cyber Attacks</a>
                                </Link>
                            </h3>
                        </div>
                    </div>

                    <div className="single-blog-item">
                        <div className="post-image">
                            <Link href="/blog-details">
                                <a><img src="/images/blog-image/blog3.jpg" alt="image" /></a>
                            </Link>
                        </div>

                        <div className="post-content">
                            <ul className="post-meta">
                                <li>By <a href="#">Admin</a></li>
                                <li>22 February 2020</li>
                            </ul>
                            <h3>
                                <Link href="/blog-details">
                                    <a>Four New WordPress.com Color Schemes</a>
                                </Link>
                            </h3>
                        </div>
                    </div>
                </OwlCarousel> : ''}
			</div>
		</div>
    )
}

export default BlogPostStyleThree;  