import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../store/slices/purchases.slice';
import '../styles/purchases.css'

const Purchases = () => {

    const dispatch = useDispatch()
    const purchases = useSelector(state => state.purchases)
    const navigate = useNavigate()
    const options = { weekday: 'long', year: 'numeric', month:'long', day: 'numeric' }

    useEffect(() => {
        dispatch(getPurchasesThunk())
    }, [])

    console.log(purchases)

    return (
        <div className='purchases'>
            <div className="purchases-navigation">
                <div className="product-detail-navigation-container">
                    <div className="product-detail-navigation">
                        <Link to='/'>Home</Link>
                        <div className="product-detail-navigation-deco"></div>
                        <p>My Purchases</p>
                    </div>
                </div>
            </div>
            <div className="purchases-container">
                <h2 className='purchases-title'>My Purchases</h2>
                <div className="purchases-list-container">
                    {
                        purchases.map(purchase => (
                            <div className="purchase-card" key={purchase.id}>
                                <div className="purchase-data">
                                    {new Date(purchase.createdAt).toLocaleDateString(undefined, options)}
                                </div>
                                <ul className='purchase-list'>
                                    {
                                        purchase.cart.products.map(product => (
                                            <li className='purchase-info' key={product.id}>
                                                <p 
                                                    onClick={() => navigate(`/products/${product.id}`)}
                                                    className='purchase-info-title'
                                                >
                                                    {product.title}
                                                </p>
                                                <div className="purchase-info-right">
                                                    <div className="purchase-quantity">
                                                        <p>{product.productsInCart.quantity}</p>
                                                    </div>
                                                    <div className="purchase-price">
                                                        <p>$ {product.price}</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default Purchases;