import React from 'react'

const Orders = () => {
    return (

        <div className='p-6'> 
            <h1 className='font-bold text-3xl'>Orders</h1>
            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border mt-6">

                <table className="min-w-full text-sm text-left">

                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="p-3">S NO</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Address</th>
                            <th className="p-3">Product Name</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Quantity</th>
                            <th className="p-3">Total Price</th>
                            <th className="p-3">Order Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="border-t hover:bg-gray-50 transition">
                            <td className="p-3">1</td>
                            <td className="p-3">User</td>
                            <td className="p-3">Main Street</td>
                            <td className="p-3">Monitor</td>
                            <td className="p-3">Electronic</td>
                            <td className="p-3">2</td>
                            <td className="p-3">100</td>
                            <td className="p-3">1/01/1111</td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
    )
}

export default Orders