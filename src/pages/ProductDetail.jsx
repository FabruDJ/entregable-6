import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addProductThunk } from '../store/slices/cartList.slice';
import '../styles/product-detail.css'

const ProductDetail = () => {

    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const products = useSelector(state => state.products)
    const productDetail = products.find(product => product.id === Number(id))
    const relatedProducts = products.filter(product =>
        product.category.id === productDetail.category.id
    )
    const productsPics = productDetail?.productImgs
    const [ selectedImg, setSelectedImg ] = useState(0)
    const [ quantity, setQuantity ] = useState(1)

    const addToCart = () => {
        const productToCart = {
            id: id,
            quantity: quantity
        }
        dispatch(addProductThunk(productToCart))
    }

    useEffect(() => {
        setQuantity(1)
    }, [ id ])

    return (
        <div className='product-detail'>
            <div className="product-detail-navigation-container">
                <div className="product-detail-navigation">
                    <Link to='/'>Home</Link>
                    <div className="product-detail-navigation-deco"></div>
                    <p>{productDetail?.title}</p>
                </div>
            </div>
            <div className="product-detail-container">
                <div className="product-detail-left-container">
                    <div className="product-detail-img-container">
                        <button 
                            className='product-detail-img-btns'
                            onClick={() => setSelectedImg(selectedImg-1)}
                            style={{visibility: selectedImg === 0 ? 'hidden' : 'visible'}}
                        >
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                        <div className="product-detail-img-container-2">
                            <img 
                                src={productsPics?.[selectedImg]} 
                                alt="product-image" 
                                className='product-detail-img'
                                />
                        </div>
                        <button 
                            className='product-detail-img-btns'
                            onClick={() => setSelectedImg(selectedImg+1)}
                            disabled={selectedImg === 2}
                            style={{visibility: selectedImg === 2 ? 'hidden' : 'visible'}}
                        >
                            <i className="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
                <div className="product-detail-right-container">
                    <div className="product-detail-right-title-container">
                        <p>{productDetail?.title}</p>
                    </div>
                    <div className="product-detail-right-desc-container">
                        <p>{productDetail?.description}</p>
                    </div>
                    <div className="product-detail-right-price-container">
                        <div className="price">
                            <p className='price-price'>Price</p>
                            <p className='price-number'>$ {productDetail?.price}</p>
                        </div>
                        <div className="quantity-products-container">
                            <div className="quantity-products">
                                <button
                                    onClick={() => setQuantity(quantity-1)}
                                    disabled={quantity === 1}
                                >    
                                <i className="fa-solid fa-minus"></i>
                                </button>
                                <p>{quantity}</p>
                                <button
                                    onClick={() => setQuantity(quantity+1)}
                                    disabled={quantity === 5}
                                >
                                    <i className="fa-solid fa-plus"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="product-detail-right-btn-container">
                        <button 
                            className='product-detail-right-btn'
                            onClick={() => addToCart()}
                        >
                            Add to Cart <i className="fa-solid fa-cart-shopping"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div className="related-products">
                <p className='related-products-title'>Related Products</p>
                <ul className='related-products-list'>
                    {
                        relatedProducts.map((product) => (
                            <li
                                className='home-product-container'
                                key={product.id}
                                onClick={() => navigate(`/products/${product.id}`)}
                            >
                                <div className="home-product-img-container-2">
                                    <div className="home-product-img-container">
                                        <img
                                            src={product.productImgs[0]}
                                            alt='product-img'
                                            className='home-product-img'
                                        />
                                    </div>
                                </div>
                                <div className="home-product-text-container">
                                    <div className="home-product-text-up-container">
                                        <p className='home-product-title'><b>{product.title}</b></p>
                                    </div>
                                    <div className="home-product-text-down-container">
                                        <div className="down-left">
                                            <p>Price</p>
                                            <p className='home-product-price'>$ {product.price}</p>
                                        </div>
                                        <div className="down-right">
                                            <div className="cart-container">
                                                <i className="fa-solid fa-cart-shopping"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    );
};

export default ProductDetail;