import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/AuthContext'

const Profile = () => {

    const { user } = useAuth()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")

    useEffect(() => {
        if (user) {
            setName(user.name || "")
            setEmail(user.email || "")
            setAddress(user.address || "")
        }
        console.log("USER:", user);
        console.log("USER ID:", user?.id);
    }, [user])

    const handleUpdate = async () => {
        try {
            const res = await axios.put(
                `http://localhost:3000/api/user/update/${user.id}`,
                {
                    name,
                    email,
                    address
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("pos-token")}`
                    }
                }
            )

            alert("Profile updated successfully")

        } catch (error) {
            console.log(error)
            alert(error.response?.data?.message || "Error")
        }
    }
    if (!user?.id) {
        return <div>Loading...</div>;
    }
    return (
        <div className='flex flex-col p-6'>
            <h1 className='font-bold text-3xl'>Admin Profile</h1>

            <div className='flex flex-col gap-4 w-full lg:w-80 bg-white rounded-xl shadow-sm border p-6 mt-8'>
                <h1 className='text-2xl font-semibold'>Update Profile</h1>

                <div>
                    <p>Name</p>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className='w-full p-2 border rounded-xl outline-none'
                        type="text"
                    />
                </div>

                <div>
                    <p>Email</p>
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className='w-full p-2 border rounded-xl outline-none'
                        type="email"
                    />
                </div>

                <div>
                    <p>Address</p>
                    <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className='w-full p-2 border rounded-xl outline-none'
                        type="text"
                    />
                </div>

                <button
                    onClick={handleUpdate}
                    className='text-white bg-yellow-500 rounded-xl px-4 py-2 text-sm cursor-pointer'
                >
                    Edit Profile
                </button>

            </div>
        </div>
    )
}

export default Profile