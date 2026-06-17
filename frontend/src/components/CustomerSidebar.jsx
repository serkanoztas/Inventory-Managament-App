import React from 'react'

import { FaBox, FaCog, FaHome, FaShoppingCart, FaSignOutAlt, FaTable, FaTruck, FaUsers } from 'react-icons/fa';
import { NavLink, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

const CustomerSidebar = () => {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };


    const menuItems = [

        { name: 'Products', path: '/customer-dashboard', icon: <FaBox />, isParent: false },
        { name: 'Orders', path: '/customer-dashboard/orders', icon: <FaShoppingCart />, isParent: false },
        { name: 'Profile', path: '/customer-dashboard/profile', icon: <FaCog />, isParent: false }
    ];

    return (
        <div className='flex h-screen text-xs sm:text-lg'>
            <div className='h-full m-0 w-full  flex-col bg-gray-900 text-white shadow-lg'>
                <span className='hidden sm:flex font-bold justify-center mx-auto mt-6'>Inventory MS</span>
                <ul className='flex flex-col mt-5 w-full'>
                    {menuItems.map((item, index) => (
                        <li key={index} className='w-full'>
                            <NavLink
                                to={item.path}
                                className='flex flex-row gap-2  items-center justify-center w-full h-16 hover:bg-gray-700 cursor-pointer'
                            >
                                <span className='hidden sm:block'>{item.icon}</span>
                                <span className='text-sm'>{item.name}</span>
                            </NavLink>
                        </li>
                    ))}
                    <li>
                        <button
                            onClick={handleLogout}
                            className='flex gap-2 items-center justify-center w-full h-16 hover:bg-gray-700'
                        >
                            <span className='hidden sm:block'>
                                <FaSignOutAlt />
                            </span>
                            <span className='text-sm'>Logout</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default CustomerSidebar