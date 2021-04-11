import React from 'react';
import * as Icon from 'react-feather';

const QuickViewModal = () => {
    return (
        <div className="modal fade" id="productsModalCenter">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <button type="button" className="close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="products-image">
                                <img src="/images/shop-image/shop-image1.jpg" alt="image" />
                            </div>
                        </div>

                        <div className="col-lg-6 col-md-6 col-sm-6">
                            <div className="products-content">
                                <h3>Wood Pencil</h3>

                                <div className="price">
                                    <span>$200.00</span> $191.00
                                </div>
                                <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>

                                <form>
                                    <div className="quantity">
                                        <div className="input-counter">
                                            <span className="minus-btn">
                                                <Icon.Minus />
                                            </span>
                                            <input type="text" min="1" value="1" />
                                            <span className="plus-btn">
                                                <Icon.Plus />
                                            </span>
                                        </div>
                                    </div>
                                    
                                    <button type="submit">Add to Cart</button>
                                </form>

                                <div className="product-meta">
                                    <span>Category: <a href="#">Pencil</a></span>
                                    <span>Tag: <a href="#">Prints</a></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuickViewModal;  