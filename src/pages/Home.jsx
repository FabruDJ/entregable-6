import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getCartListThunk } from '../store/slices/cartList.slice';
import '../styles/home.css'

const Home = () => {

    const dispatch = useDispatch()
    const productsList = useSelector(state => state.products)
    const navigate = useNavigate()
    const [ categories, setCategories ] = useState([])
    const [ productsFiltered, setProductsFiltered ] = useState([])
    const [ searchValue, setSearchValue ] = useState('')

    useEffect(() => {
        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories))
    }, [])

    useEffect(() => {
        setProductsFiltered(productsList)
    }, [productsList])

    const showAllProducts = () => {
        setProductsFiltered(productsList)
    }
    
    const filterCategory = (categoryId) => {
        const filteredProducts = productsList.filter(product => product.category.id === categoryId)
        setProductsFiltered(filteredProducts)
    }

    const searchProduct = () => {
        const filtered = productsList.filter(product => 
            product.title.toLowerCase().includes(searchValue.toLowerCase()))
        setProductsFiltered(filtered)
    }



    return (
        <div className='home'>
            <aside className='home-aside'>
                <div className="home-aside-container">
                    <div className="home-aside-title-container">
                        <p className='home-aside-title'>Category</p>
                        <i className="fa-solid fa-chevron-down"></i>
                    </div>
                    <hr className='aside-hr'/>
                    <ul className='home-aside-list'>
                        <button 
                            onClick={() => showAllProducts()}
                            className='home-aside-categories'
                        >
                            All
                        </button>
                        {
                            categories.map((category) => (
                                <button 
                                    key={category.id}
                                    onClick={() => filterCategory(category.id)}
                                    className='home-aside-categories'
                                >
                                    {category.name}
                                </button>
                            ))
                        }
                    </ul>
                </div>
            </aside>
            <section className='home-section'>
                <div className="home-input-container">
                    <input 
                        type="text" 
                        className='home-input' 
                        placeholder='What are you looking for?'
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                    />
                    <button 
                        className='home-btn'
                        onClick={searchProduct}
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>
                <ul className='home-products-list'>
                    {
                        productsFiltered.map((product) => (
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
            </section>
        </div>
    );
};

export default Home;