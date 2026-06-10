import React from 'react'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router'

const Dashboard = () => {
    return (
        <div className='flex min-h-screen'>
            <div className='w-32 md:w-48 bg-gray-900 text-white h-screen'>
                <Sidebar />
            </div>
            
            <div className='flex-1 bg-red-100  h-screen'>
                <Outlet />
            </div>
        </div>
    )
}
export default Dashboard