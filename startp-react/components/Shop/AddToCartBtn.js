import React from 'react'
import Link from 'next/link'
import { useToasts } from 'react-toast-notifications'
import { useDispatch } from 'react-redux'

const AddToCartBtn = ({ id }) => {
    // console.log(id)
    const { addToast } = useToasts()
    const dispatch = useDispatch()

    const addToCart = () => {
        dispatch({
            type: 'ADD_TO_CART',
            id
        })
        addToast('Cart Added Successfully', { appearance: 'success' })
    }
    return (
        <Link href="#">
            <a onClick={e => {
                e.preventDefault();
                addToCart()
            }} className="add-to-cart-btn">Add to Cart</a>
        </Link>
    )
}

export default AddToCartBtn
