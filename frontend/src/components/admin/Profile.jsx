import React from 'react'

const Profile = () => {
    return (
        <div className='flex flex-col p-6'>
            <h1 className='font-bold text-3xl'>User Profile</h1>
            <div className='flex flex-col gap-4 w-full lg:w-80 bg-white rounded-xl shadow-sm border p-6 mt-8'>
                <h1 className='text-2xl font-semibold'>Update Profile</h1>
                {/* Add User */}
                <div>
                    <p>Name</p>
                    <input placeholder='Update Name' className='w-full p-2 border rounded-xl outline-none' type="text" />
                </div>
                <div>
                    <p>Email</p>
                    <input placeholder='Update Email' className='w-full p-2 border rounded-xl outline-none' type="email" />
                </div>
                <div>
                    <p>Address</p>
                    <input placeholder="Update Address" className='w-full p-2 border rounded-xl outline-none' type="text" />
                </div>
                <button className='text-white bg-yellow-500 rounded-xl px-4 py-2 text-sm cursor-pointer'>Edit Profile</button>

            </div>
        </div>
    )
}

export default Profile