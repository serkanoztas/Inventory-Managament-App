import React, { useState } from 'react'

const Suppliers = () => {

    const [showModel, setShowModel] = useState(false);

    return (
        <div className='p-6 flex flex-col gap-6'>
            <h1 className='font-bold text-3xl'>Supplier Managament</h1>

            <div className='justify-between flex'>
                <input className='outline-none rounded-xl sm:w-2/5 md:w-3/5 lg:w-4/5 p-2 bg-white' type="text" placeholder='Search suppliers' />
                <button onClick={() => setShowModel(true)} className='text-white bg-blue-500 rounded-xl max-w-24 px-2 text-sm cursor-pointer py-1'>Add Supplier</button>
            </div>

            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border mt-6">

                <table className="min-w-full text-sm text-left">

                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="p-3">Id</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Phone</th>
                            <th className="p-3">Address</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="border-t hover:bg-gray-50 transition">
                            <td className="p-3">1</td>
                            <td className="p-3">User</td>
                            <td className="p-3">Email</td>
                            <td className="p-3">123456</td>
                            <td className="p-3">Main Street</td>
                            <td className="p-3 space-x-3">
                                <button className="text-blue-500 hover:underline cursor-pointer">
                                    Edit
                                </button>
                                <button className="text-red-500 hover:underline cursor-pointer">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
            {
                showModel && (
                    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                        <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-lg relative">

                            <h2 className="text-xl font-bold mb-4">Add Supplier</h2>

                            <input
                                className="w-full border p-2 rounded mb-3"
                                placeholder="Supplier Name"
                            />

                            <input
                                className="w-full border p-2 rounded mb-3"
                                placeholder="Supplier Email"
                            />

                            <input
                                className="w-full border p-2 rounded mb-3"
                                placeholder="Supplier Phone"
                                type="text"
                            />

                            <input
                                className="w-full border p-2 rounded mb-3"
                                placeholder="Supplier Address"
                                type="text"
                            />

                            <div className="flex justify-end gap-2">
                                <button
                                    onClick={() => setShowModel(false)}
                                    className="px-4 py-2 text-gray-600"
                                >
                                    Cancel
                                </button>

                                <button className="px-4 py-2 bg-blue-500 text-white rounded">
                                    Save
                                </button>
                            </div>

                        </div>
                    </div>
                )
            }
        </div>


    )
}

export default Suppliers