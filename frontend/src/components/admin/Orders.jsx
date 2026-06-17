import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Orders = () => {

    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:3000/api/order/all",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                        },
                    }
                )

                setOrders(res.data.orders)
            } catch (error) {
                console.log(error)
            }
        }

        fetchOrders()
    }, [])

    return (

        <div className='p-6'>
            <h1 className='font-bold text-3xl'>Orders</h1>

            <div className="overflow-x-auto bg-white rounded-xl shadow-sm border mt-6">

                <table className="min-w-full text-sm text-left">

                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="p-3">S NO</th>
                            <th className="p-3">Customer Name</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Product Name</th>
                            <th className="p-3">Category</th>
                            <th className="p-3">Quantity</th>
                            <th className="p-3">Total Price</th>
                            <th className="p-3">Order Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map((order, index) => (
                            <tr key={order._id} className="border-t hover:bg-gray-50 transition">

                                <td className="p-3">{index + 1}</td>

                                <td className="p-3">
                                    {order.customer?.name}
                                </td>

                                <td className="p-3">
                                    {order.customer?.email}
                                </td>

                                <td className="p-3">
                                    {order.product?.name}
                                </td>

                                <td className="p-3">
                                    {order.product?.category?.categoryName}
                                </td>

                                <td className="p-3">
                                    {order.quantity}
                                </td>

                                <td className="p-3">
                                    ${order.total}
                                </td>

                                <td className="p-3">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>
        </div>
    )
}

export default Orders