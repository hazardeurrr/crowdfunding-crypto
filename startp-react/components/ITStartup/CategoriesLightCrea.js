import React from 'react';
import Link from 'next/link';
import CategoryListCrea from '@/utils/CategoryListCrea'
import SvgIcon from '@mui/material/SvgIcon';

function HomeIcon(props) {
    return (
      <SvgIcon {...props}>
       <path d="M18,5h1V6a1,1,0,0,0,2,0V5h1a1,1,0,0,0,0-2H21V2a1,1,0,0,0-2,0V3H18a1,1,0,0,0,0,2ZM7,7V17a1,1,0,0,0,2,0V7A1,1,0,0,0,7,7ZM21.6,9a1,1,0,0,0-.78,1.18,9,9,0,1,1-7-7,1,1,0,1,0,.4-2A10.8,10.8,0,0,0,12,1,11,11,0,1,0,23,12a10.8,10.8,0,0,0-.22-2.2A1,1,0,0,0,21.6,9ZM11,9v1a3,3,0,0,0,.78,2A3,3,0,0,0,11,14v1a3,3,0,0,0,3,3h1a3,3,0,0,0,3-3V14a3,3,0,0,0-.78-2A3,3,0,0,0,18,10V9a3,3,0,0,0-3-3H14A3,3,0,0,0,11,9Zm5,6a1,1,0,0,1-1,1H14a1,1,0,0,1-1-1V14a1,1,0,0,1,1-1h1a1,1,0,0,1,1,1Zm0-6v1a1,1,0,0,1-1,1H14a1,1,0,0,1-1-1V9a1,1,0,0,1,1-1h1A1,1,0,0,1,16,9Z"></path>
      </SvgIcon>
    );
  }

  
const CategoriesLightCrea = () => {
    return (
        <div className="industries-serve-area serve-crea ptb-80">
            <div className="container">
                <div className="section-title">
                    <h2>Explore by category</h2>
					<div className="bar"></div>
                    {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p> */}
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-3 col-6 col-sm-6 col-md-4">
                        <div className="single-industries-serve-box">
                            <div className="icon">
                                <i className='bx bx-paint'></i>
                            </div>
                            {CategoryListCrea[0]}
                            <Link href={{
                                pathname: "/explore",
                                query: {
                                    id: CategoryListCrea[0],
                                }
                            }}>
                                <a className="link-btn"></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6 col-sm-6 col-md-4">
                        <div className="single-industries-serve-box">
                            <div className="icon">
                                <i className='bx bx-video'></i>
                            </div>
                            {CategoryListCrea[1]}
                            <Link href={{
                                pathname: "/explore",
                                query: {
                                    id: CategoryListCrea[1],
                                }
                            }}>
                                <a className="link-btn"></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6 col-sm-6 col-md-4">
                        <div className="single-industries-serve-box">
                            <div className="icon">
                                <i className='bx bx-bitcoin'></i>
                            </div>
                            {CategoryListCrea[2]}
                            <Link href={{
                                pathname: "/explore",
                                query: {
                                    id: CategoryListCrea[2],
                                }
                            }}>
                                <a className="link-btn"></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6 col-sm-6 col-md-4">
                        <div className="single-industries-serve-box">
                            <div className="icon">
                                <i className='bx bx-microphone'></i>
                            </div>
                            {CategoryListCrea[3]}
                            <Link href={{
                                pathname: "/explore",
                                query: {
                                    id: CategoryListCrea[3],
                                }
                            }}>
                                <a className="link-btn"></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6 col-sm-6 col-md-4">
                        <div className="single-industries-serve-box">
                            <div className="icon">
                                <i className='bx bx-camera'></i>
                            </div>
                            {CategoryListCrea[4]}
                            <Link href={{
                                pathname: "/explore",
                                query: {
                                    id: CategoryListCrea[4],
                                }
                            }}>
                                <a className="link-btn"></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6 col-sm-6 col-md-4">
                        <div className="single-industries-serve-box">
                            <div className="icon">
                                <i className='bx bx-game'></i>
                            </div>
                            {CategoryListCrea[5]}
                            <Link href={{
                                pathname: "/explore",
                                query: {
                                    id: CategoryListCrea[5],
                                }
                            }}>
                                <a className="link-btn"></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6 col-sm-6 col-md-4">
                        <div className="single-industries-serve-box">
                            <div className="icon">
                                <i className='bx bx-headphone'></i>
                            </div>
                            {CategoryListCrea[6]}
                            <Link href={{
                                pathname: "/explore",
                                query: {
                                    id: CategoryListCrea[6],
                                }
                            }}>
                                <a className="link-btn"></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6 col-sm-6 col-md-4">
                        <div className="single-industries-serve-box">
                            <div className="icon">
                                <i className='bx bx-edit'></i>
                            </div>
                            {CategoryListCrea[7]}
                            <Link href={{
                                pathname: "/explore",
                                query: {
                                    id: CategoryListCrea[7],
                                }
                            }}>
                                <a className="link-btn"></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6 col-sm-6 col-md-4">
                        <div className="single-industries-serve-box">
                            <div className="icon">
                                <i className='bx bx-music'></i>
                            </div>
                            {CategoryListCrea[8]}
                            <Link href={{
                                pathname: "/explore",
                                query: {
                                    id: CategoryListCrea[8],
                                }
                            }}>
                                <a className="link-btn"></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6 col-sm-6 col-md-4">
                        <div className="single-industries-serve-box">
                            <div className="icon">
                                <i className='bx bx-book-open'></i>
                            </div>
                            {CategoryListCrea[9]}
                            <Link href={{
                                pathname: "/explore",
                                query: {
                                    id: CategoryListCrea[9],
                                }
                            }}>
                                <a className="link-btn"></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6 col-sm-6 col-md-4">
                        <div className="single-industries-serve-box">
                            <div className="icon">
                                <i className='bx bx-dribbble'></i>
                            </div>
                            {CategoryListCrea[10]}
                            <Link href={{
                                pathname: "/explore",
                                query: {
                                    id: CategoryListCrea[10],
                                }
                            }}>
                                <a className="link-btn"></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6 col-sm-6 col-md-4">
                        <div className="single-industries-serve-box">
                        <div className="icon">
                        <i className='bx'>                        
                        <HomeIcon sx={{ verticalAlign: "bottom", fontSize: "inherit" }} />
                        </i>
                            </div>
                            {CategoryListCrea[11]}
                            <Link href={{
                                pathname: "/explore",
                                query: {
                                    id: CategoryListCrea[11],
                                }
                            }}>
                                <a className="link-btn"></a>
                            </Link>
                        </div>
                    </div>

                </div>
            </div>

            <div className="analytics-shape2">
                <img src="/images/bigdata-analytics/vector.png" alt="image" />
            </div>
        </div>
    )
}

export default CategoriesLightCrea;  