import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteProductThunk, getCartListThunk, purchaseProductsThunk } from '../store/slices/cartList.slice';
import { setShowCart } from '../store/slices/showCart.slice';
import '../styles/nav.css'
import '../styles/sidebar.css'

const Sidebar = () => {

    const showCart = useSelector(state => state.showCart)
    const dispatch = useDispatch()
    const cartList = useSelector(state => state.cartList)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(getCartListThunk())
    }, [])

    return (
        <div id='sidebar-container' className={showCart ? 'active' : 'none'}>
            <div id='sidebar' className={showCart ? 'active-sidebar' : 'none'}>
                <div className="sidebar-close-container">
                    <button onClick={() => dispatch(setShowCart(false))}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <p className='my-cart'>My Cart</p>
                <div className="cart-list-container">
                    <ul className='cart-list'>
                        {
                            cartList.map((product) => (
                                <li className='cart-list-item' key={product.id}>
                                    <div className="cart-list-item-section">
                                        <p 
                                            className='cart-item-title'
                                            onClick={() => {
                                                navigate(`/products/${product.id}`)
                                                dispatch(setShowCart(false))
                                            }}
                                        >
                                            {product.title}
                                        </p>
                                        <button
                                        onClick={() => dispatch(deleteProductThunk(product.id))}
                                        >
                                            <i className="fa-solid fa-trash-can"></i>
                                        </button>
                                    </div>
                                    <div className="cart-list-item-section item-section-down">
                                        <div className="item-quantity">
                                            <p>{product.productsInCart.quantity}</p>
                                        </div>
                                        <div className="item-price">
                                            <p className='a'>Total:</p>
                                            <p className='b'>$ {product.price}</p>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                <hr className='cart-hr'/>
                <div className="total-container">
                    <div className="total-text-container">
                        <p className='a'>Total:</p>
                        <p className='b'>$ TOTAL</p>
                    </div>
                </div>
                <div className="cart-btn-container">
                    <button onClick={() => dispatch(purchaseProductsThunk())}>Checkout</button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;