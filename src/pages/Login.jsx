import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setIsLoading } from '../store/slices/isLoading.slice';
import '../styles/login.css'

const Login = () => {

    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()


    const [invalidUser, setInvalidUser] = useState(false)


    const submit = (data) => {
        axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', data)
            .then(res => {
                dispatch(setIsLoading(true))
                navigate('/')
                localStorage.setItem('token', res.data.data.token)
                localStorage.setItem('name', res.data.data.user.firstName)
                localStorage.setItem('lastName', res.data.data.user.lastName)
                setInvalidUser(false)
            })
            .catch(e => {
                if (e.response?.status === 404) {
                    setInvalidUser(true)
                }
                console.log(e.response)
            })
            .finally(() => dispatch(setIsLoading(false)))
    }

    return (
        <div className='login'>
            <div className="login-container">
                <p className='login-title'>Login</p>
                <form onSubmit={handleSubmit(submit)}>
                    <div className="login-input-1">
                        <label htmlFor="email">Email address</label>
                        <input
                            type="email"
                            placeholder='Enter email'
                            id='email'
                            {...register('email')}
                        />
                        <p>We'll never share your email with anyone else.</p>
                    </div>
                    <div className="login-input-2">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder='Password'
                            {...register('password')}
                        />
                    </div>
                    <p
                        className='invalid-user'
                        style={{ visibility: invalidUser ? 'visible' : 'hidden' }}
                    >
                        Email or password are incorect
                    </p>
                    <button className='login-enter-btn' type='submit'>Enter</button>
                </form>
            </div>
        </div>
    );
};

export default Login;