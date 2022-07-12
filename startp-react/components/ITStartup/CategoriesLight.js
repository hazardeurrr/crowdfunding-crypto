import React from 'react';
import Link from 'next/link';
import CategoryList from '@/utils/CategoryList'

const CategoriesLight = () => {
    return (
        <div className="industries-serve-area ptb-80">
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
                            {CategoryList[0]}
                            <Link href={{
                                pathname: "explore",
                                query: {
                                    id: CategoryList[0],
                                }
                            }}>
                                <a className="link-btn"></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6 col-sm-6 col-md-4">
                        <div className="single-industries-serve-box">
                            <div className="icon">
                                <i className='bx bx-donate-heart'></i>
                            </div>
                            {CategoryList[1]}
                            <Link href={{
                                pathname: "explore",
                                query: {
                                    id: CategoryList[1],
                                }
                            }}>
                                <a className="link-btn"></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6 col-sm-6 col-md-4">
                        <div className="single-industries-serve-box">
                            <div className="icon">
                                <i className='bx bx-health'></i>
                            </div>
                            {CategoryList[2]}
                            <Link href={{
                                pathname: "explore",
                                query: {
                                    id: CategoryList[2],
                                }
                            }}>
                                <a className="link-btn"></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6 col-sm-6 col-md-4">
                        <div className="single-industries-serve-box">
                            <div className="icon">
                                <i className='bx bx-world'></i>
                            </div>
                            {CategoryList[3]}
                            <Link href={{
                                pathname: "explore",
                                query: {
                                    id: CategoryList[3],
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
                            {CategoryList[4]}
                            <Link href={{
                                pathname: "explore",
                                query: {
                                    id: CategoryList[4],
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
                            {CategoryList[5]}
                            <Link href={{
                                pathname: "explore",
                                query: {
                                    id: CategoryList[5],
                                }
                            }}>
                                <a className="link-btn"></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6 col-sm-6 col-md-4">
                        <div className="single-industries-serve-box">
                            <div className="icon">
                                <i className='bx bx-chip'></i>
                            </div>
                            {CategoryList[6]}
                            <Link href={{
                                pathname: "explore",
                                query: {
                                    id: CategoryList[6],
                                }
                            }}>
                                <a className="link-btn"></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6 col-sm-6 col-md-4">
                        <div className="single-industries-serve-box">
                            <div className="icon">
                                <i className='bx bx-bulb'></i>
                            </div>
                            {CategoryList[7]}
                            <Link href={{
                                pathname: "explore",
                                query: {
                                    id: CategoryList[7],
                                }
                            }}>
                                <a className="link-btn"></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6 col-sm-6 col-md-4">
                        <div className="single-industries-serve-box">
                            <div className="icon">
                                <i className='bx bx-star'></i>
                            </div>
                            {CategoryList[8]}
                            <Link href={{
                                pathname: "explore",
                                query: {
                                    id: CategoryList[8],
                                }
                            }}>
                                <a className="link-btn"></a>
                            </Link>
                        </div>
                    </div>

                    <div className="col-lg-3 col-6 col-sm-6 col-md-4">
                        <div className="single-industries-serve-box">
                            <div className="icon">
                                <i className='bx bx-unite'></i>
                            </div>
                            {CategoryList[9]}
                            <Link href={{
                                pathname: "explore",
                                query: {
                                    id: CategoryList[9],
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

export default CategoriesLight;  