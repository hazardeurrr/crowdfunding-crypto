import React from 'react';
import { resetIdCounter, Tab, Tabs, TabList, TabPanel } from 'react-tabs';
resetIdCounter();

const ProductsDetailsTabs = () => {
    return (
        <div className="products-details-tabs">
            <Tabs>
                <TabList>
                    <Tab>Description</Tab>
                    <Tab>Additional Information</Tab>
                    <Tab>Review</Tab>
                </TabList>
            
                <TabPanel>
                    <div className="products-description">
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. Lorem Ipsum is simply dummy text of the printing.</p>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="products-description">
                        <ul className="additional-information">
                            <li><span>Brand</span> ThemeForest</li>
                            <li><span>Color</span> Brown</li>
                            <li><span>Size</span> Large, Medium</li>
                            <li><span>Weight</span> 27 kg</li>
                            <li><span>Dimensions</span> 16 x 22 x 123 cm</li>
                        </ul>
                    </div>
                </TabPanel>

                <TabPanel>
                    <div className="products-reviews">
                        <h3>Customer Reviews</h3>
                        <p>There are no reviews yet.</p>

                        <form className="review-form">
                            <p>Rate this item:</p>

                            <div className="star-rating">
                                <i className='bx bxs-star'></i>
                                <i className='bx bxs-star'></i>
                                <i className='bx bxs-star'></i>
                                <i className='bx bxs-star'></i>
                                <i className='bx bxs-star'></i>

                                <p>Very good product!</p>
                            </div>

                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <textarea name="review-message" id="message" cols="30" rows="4" placeholder="Write your review*" className="form-control"></textarea>
                                    </div>
                                </div>

                                <div className="col-lg-6 col-md-6">
                                    <div className="form-group">
                                        <input type="text" placeholder="Name*" className="form-control" />
                                    </div>
                                </div>
                                
                                <div className="col-lg-6 col-md-6">
                                    <div className="form-group">
                                        <input type="email" placeholder="Email*" className="form-control" />
                                    </div>
                                </div>

                                <div className="col-lg-12 col-md-12">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </TabPanel>
            </Tabs> 
        </div>
    )
}

export default ProductsDetailsTabs;  