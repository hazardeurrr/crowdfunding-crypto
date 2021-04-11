import React from 'react'
import Navbar from "@/components/_App/Navbar"
import Footer from "@/components/_App/Footer"
import PageBanner from '@/components/Common/PageBanner'
import CartContent from '@/components/Cart/CartContent'
 
const Cart = () => {
    return (
        <>
            <Navbar />

            <PageBanner pageTitle="Cart" /> 

            <div className="cart-area ptb-80">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12">
                            <CartContent />
                        </div>
                    </div>
                </div>
            </div>
 
            <Footer />
        </>
    )
}

export default Cart;