import React from 'react'
import Navbar from "@/components/_App/Navbar"
import Footer from "@/components/_App/Footer"
import PageBanner from '@/components/Common/PageBanner'
import ProductSlider from '@/components/Shop/ProductSlider'
import ProductsDetailsTabs from '@/components/Shop/ProductsDetailsTabs'
import * as Icon from 'react-feather'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useToasts } from 'react-toast-notifications'

const ProductDetails = () => {
    const { addToast } = useToasts()
    const dispatch = useDispatch()
    const router = useRouter()
    const productId = router.query.id
    const product = useSelector((state) => state.products.find(item => item.id === productId))   

    const [qty, setQty] = React.useState(1)

    const increment = () => {
        setQty(qty + 1)
    }

    const decrement = () => {
        setQty(qty - 1)
    }

    const addToCart = () => {
        dispatch({
            type: 'ADD_QUANTITY_WITH_NUMBER',
            id: productId,
            qty: qty
        })
        addToast('Cart Added Successfully', { appearance: 'success' })
    }

    return (
        <>
            <Navbar />
            <PageBanner pageTitle={product && product.name} /> 

            <div className="shop-details-area ptb-80">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <ProductSlider images={product && product.images} />
                        </div>

                        <div className="col-lg-7">
                            <div className="products-details">
                                <h3>{product && product.name}</h3>

                                <div className="price">
                                    ${product && product.price}
                                </div>

                                <ul className="rating">
                                    <li><i className="flaticon-star-1"></i></li>
                                    <li><i className="flaticon-star-1"></i></li>
                                    <li><i className="flaticon-star-1"></i></li>
                                    <li><i className="flaticon-star-1"></i></li>
                                    <li><i className="flaticon-star-1"></i></li>
                                </ul>

                                <p>{product && product.desc}</p>

                                <div className="availability">
                                    Availability: <span>{product && product.availability}</span>
                                </div>
                                <form onSubmit={e => e.preventDefault()}>
                                    <div className="quantity d-flex align-items-center">
                                        <span>Quantity:</span>

                                        <div className="input-counter">
                                            <span className="minus-btn" onClick={decrement}>
                                                <Icon.Minus />
                                            </span>

                                            <input type="text" min="1" value={qty} onChange={e => e} />
                                            
                                            <span className="plus-btn" onClick={increment}>
                                                <Icon.Plus />
                                            </span>
                                        </div>
                                    </div>
                                    <button type="submit" onClick={addToCart}>Add to Cart</button>

                                    <a href="#" className="add-to-wishlist-btn" title="Add to Wishlist">
                                        <Icon.Heart />
                                    </a>
                                </form>

                                <div className="custom-payment-options">
                                    <span>Guaranteed safe checkout:</span>

                                    <div className="payment-methods">
                                        <img src="/images/payment-image/payment-img1.svg" alt="image" />
                                        <img src="/images/payment-image/payment-img2.svg" alt="image" />
                                        <img src="/images/payment-image/payment-img3.svg" alt="image" />
                                        <img src="/images/payment-image/payment-img4.svg" alt="image" />
                                        <img src="/images/payment-image/payment-img5.svg" alt="image" />
                                        <img src="/images/payment-image/payment-img6.svg" alt="image" />
                                        <img src="/images/payment-image/payment-img7.svg" alt="image" />
                                    </div>
                                </div>

                                <div className="products-share-social">
                                    <span>Share:</span>

                                    <ul>
                                        <li>
                                            <a href="#" className="facebook" target="_blank">
                                                <Icon.Facebook />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="twitter" target="_blank">
                                                <Icon.Twitter />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="linkedin" target="_blank">
                                                <Icon.Linkedin />
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#" className="instagram" target="_blank">
                                                <Icon.Instagram />
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="col-lg-12 col-md-12">
                            <ProductsDetailsTabs />
                        </div>
                    </div>
                </div>
            </div>
 
            <Footer />
        </>
    )
}

export default ProductDetails;