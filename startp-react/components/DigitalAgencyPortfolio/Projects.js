import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import Link from 'next/link';

const masonryOptions = {
    transitionDuration: 0
};
 
export class Projects extends Component {
    render() {
        const images = this.props.images.map((image, idx) => {
            return (
                <div className="col-lg-4 col-sm-6 item" key={idx}>
                    <div className="single-latest-projects">
                        <img src={image.image} alt="portfolio-image" />

                        <div className="content">
                            <span>{image.category}</span>
                            <h3>{image.title}</h3>
                        </div>

                        <Link href="/project-details">
                            <a className="link-btn"></a>
                        </Link>
                    </div>
                </div>
            )
        })
        return (
            <div className="our-latest-projects ptb-80">
                <div className="container">
                    <div className="section-title text-left">
                        <h2>Our Latest <span>Projects</span></h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </div>
                 
                    <Masonry
                        className={'row'} // default ''
                        elementType={'div'} // default 'div'
                        options={masonryOptions} // default {}
                        disableImagesLoaded={false} // default false
                        updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                    >
                        {images}
                    </Masonry>
                </div>
            </div>
        );
    }
}

Projects.defaultProps = {
    images: [
        { 
            image: "/images/agency-portfolio-projects/ap-project1.jpg",
            category: "Business",
            title: "Business Stratagy"
        },
        { 
            image: "/images/agency-portfolio-projects/ap-project2.jpg", 
            category: "Development",
            title: "Web Development"
        },
        { 
            image: "/images/agency-portfolio-projects/ap-project3.jpg", 
            category: "Marketing",
            title: "Digital Marketing"
        },
        { 
            image: "/images/agency-portfolio-projects/ap-project4.jpg",
            category: "App",
            title: "Mobile App Development"
        },
        { 
            image: "/images/agency-portfolio-projects/ap-project6.jpg",
            category: "Marketing",
            title: "Email Marketing"
        },
        { 
            image: "/images/agency-portfolio-projects/ap-project5.jpg",
            category: "Development",
            title: "E-commerce Development"
        },
        { 
            image: "/images/agency-portfolio-projects/ap-project9.jpg",
            category: "App",
            title: "React App Development"
        },
        { 
            image: "/images/agency-portfolio-projects/ap-project8.jpg",
            category: "Writing",
            title: "Content Writing"
        },
        { 
            image: "/images/agency-portfolio-projects/ap-project7.jpg",
            category: "IT",
            title: "IT Consultancy"
        },
        { 
            image: "/images/agency-portfolio-projects/ap-project11.jpg",
            category: "Solutions",
            title: "IT Solutions"
        },
        { 
            image: "/images/agency-portfolio-projects/ap-project10.jpg",
            category: "Marketing",
            title: "Marketing & Reporting"
        },
    ]
}

export default Projects;
