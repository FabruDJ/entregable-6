import React, { useState } from 'react';
import '../styles/nav.css'
import '../styles/sidebar.css'
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { setShowCart } from '../store/slices/showCart.slice';

const Nav = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const showCart = useSelector(state => state.showCart)

    return (
            <>
                <Sidebar />
                <nav>
                    <div className="nav-left-container">
                        <div className="nav-title-container">
                            <p className='nav-title-responsive' onClick={() => navigate('/')}>F</p>
                            <p className='nav-title' onClick={() => navigate('/')}>Fabru's Store</p>
                        </div>
                    </div>
                    <div className="nav-right-container">
                        <button className='nav-right-btns' onClick={() => navigate('/purchases')}>
                            <i className="fa-solid fa-bag-shopping"></i>
                        </button>
                        <button className='nav-right-btns' onClick={() => dispatch(setShowCart(true))}>
                            <i className="fa-solid fa-cart-shopping"></i>
                        </button>
                        <button className='nav-right-btns' onClick={() => navigate('/user')}>
                            <i className="fa-solid fa-circle-user"></i>
                        </button>
                    </div>
                </nav>
            </>
    );
};

export default Nav;