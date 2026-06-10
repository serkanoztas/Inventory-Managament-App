import React from 'react'

import { FaBox, FaCog, FaHome, FaShoppingCart, FaSignOutAlt, FaTable, FaTruck, FaUsers } from 'react-icons/fa';
import { NavLink } from 'react-router';

const Sidebar = () => {

    const menuItems = [
        { name: 'Dashboard', path: '/admin-dashboard', icon: <FaHome />, isParent: false },
        { name: 'Products', path: '/admin-dashboard/products', icon: <FaBox />, isParent: false },
        { name: 'Categories', path: '/admin-dashboard/categories', icon: <FaTable />, isParent: false },
        { name: 'Orders', path: '/admin-dashboard/orders', icon: <FaShoppingCart />, isParent: false },
        { name: 'Suppliers', path: '/admin-dashboard/suppliers', icon: <FaTruck />, isParent: false },
        { name: 'Users', path: '/admin-dashboard/users', icon: <FaUsers />, isParent: false },
        { name: 'Profile', path: '/admin-dashboard/profile', icon: <FaCog />, isParent: false },
        { name: 'Logout', path: '/admin-dashboard/logout', icon: <FaSignOutAlt />, isParent: false },
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
                </ul>
            </div>
        </div>
    )
}

export default Sidebar