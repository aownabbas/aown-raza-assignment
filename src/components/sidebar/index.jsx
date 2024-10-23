import React, { useState } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { CartSlice } from '../../redux/slices/cartSlice';
import { LoginStatus } from '../../redux/slices/registerSlice';

const Sidebar = () => {
    const [activeMenu, setActiveMenu] = useState('Dashboard');
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const handleMenuClick = (menu) => {
        setActiveMenu(menu);
    };

    const handleLogout = () => {
        dispatch(CartSlice());
        navigate('/login');
        dispatch(LoginStatus(false));
    };

    return (
        <div className="sidebar">
            {/* Profile section */}
            <div className="profile">
                <img src="/images/sneaker3.png" alt="Profile" className="profile-pic" />
                <div className="profile-info">
                    <h3>Mark Wood</h3>
                    <p>marki@demo.com</p>
                </div>
            </div>

            {/* Navigation section */}
            <nav>
                <ul className="menu-list">
                    <li
                        className={`menu-item ${activeMenu === 'Dashboard' ? 'active' : ''}`}
                        onClick={() => {
                            handleMenuClick('Dashboard');
                            navigate('/');
                        }}
                    >
                        <i className="menu-icon">🏠</i> {/* Replace with actual icon */}
                        <span>Dashboard</span>
                    </li>
                    <li
                        className={`menu-item ${activeMenu === 'Products' ? 'active' : ''}`}
                        onClick={() => {
                            handleMenuClick('Products');
                            navigate('/view-cart');
                        }}
                    >
                        <i className="menu-icon">🛒</i>
                        <span>Products</span>
                    </li>
                </ul>
            </nav>

            {/* Logout button */}
            <button className="logout-btn" onClick={handleLogout}>
                {' '}
                Logout
            </button>
        </div>
    );
};

export default Sidebar;
