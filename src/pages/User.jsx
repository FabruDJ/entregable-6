import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const User = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () => {
        localStorage.setItem('token', '')
        localStorage.setItem('name', '')
        localStorage.setItem('lastName', '')
        navigate('/')
    }

    return (
        <div className='user'>
            <div className="user-container">
                        <i className="fa-solid fa-circle-user user-icon"></i>
                        <div className="user-name">
                            <p>
                                {localStorage.getItem('name')}
                                {' '}
                                {localStorage.getItem('lastName')}
                            </p>
                        </div>
                        <div className="logout">
                            <button 
                                className='logout-btn'
                                onClick={() => logout()}
                            >
                                Logout
                            </button>
                        </div>
                    </div>
        </div>
    );
};

export default User;