import React, { useEffect, useState } from 'react'
import axios from 'axios'

const MainDashboard = () => {

  const [products, setProducts] = useState([])
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, orderRes] = await Promise.all([
          axios.get("http://localhost:3000/api/product/get", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          }),
          axios.get("http://localhost:3000/api/order/all", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          })
        ])

        setProducts(productRes.data.products)
        setOrders(orderRes.data.orders)

      } catch (error) {
        console.log(error)
      }
    }

    fetchData()
  }, [])

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);

  const outOfStock = products.filter(p => p.stock === 0).length;
  const lowStockProducts = products.filter(p => p.stock > 0 && p.stock < 5)
  const revenue = orders.reduce((sum, o) => sum + o.total, 0)
  const today = new Date().toDateString()

  const ordersToday = orders.filter(
    o => new Date(o.createdAt).toDateString() === today
  ).length

  const productSales = {}

  orders.forEach(order => {
    const name = order.product?.name
    if (!name) return
    productSales[name] = (productSales[name] || 0) + order.quantity
  })

  const highestSale = Object.entries(productSales).sort((a, b) => b[1] - a[1])[0]

  return (
    <div className="p-6 space-y-6 bg-red-100 min-h-screen">

      {/* Header */}
      <h1 className="text-2xl font-bold text-gray-800">
        Dashboard
      </h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Total Products</p>
          <span className="text-2xl font-semibold text-gray-800">
            {products.length}
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Total Stock</p>
          <span className="text-2xl font-semibold text-gray-800">
            {products.reduce((sum, p) => sum + p.stock, 0)}
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Orders Today</p>
          <span className="text-2xl font-semibold text-gray-800">
            {orders.filter(
              o => new Date(o.createdAt).toDateString() === new Date().toDateString()
            ).length}
          </span>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Revenue</p>
          <span className="text-2xl font-semibold text-green-600">
            ${orders.reduce((sum, o) => sum + o.total, 0)}
          </span>
        </div>

      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

        {/* Out of Stock */}
        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <p className="text-gray-600 font-medium mb-2">
            Out of Stock Products
          </p>

          <div className="text-3xl font-bold text-red-500">
            {products.filter(p => p.stock === 0).length}
          </div>
        </div>

        {/* Highest Sale Product */}
        <div className="bg-white p-5 rounded-xl shadow-sm border space-y-2">
          <p className="text-gray-600 font-medium">
            Highest Sale Product
          </p>

          <div className="text-sm text-gray-700">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {(() => {
                const map = {}
                orders.forEach(o => {
                  const name = o.product?.name
                  if (!name) return
                  map[name] = (map[name] || 0) + o.quantity
                })
                const top = Object.entries(map).sort((a, b) => b[1] - a[1])[0]
                return top ? top[0] : "-"
              })()}
            </p>

            <p>
              <span className="font-medium">Total Units Sold:</span>{" "}
              {(() => {
                const map = {}
                orders.forEach(o => {
                  const name = o.product?.name
                  if (!name) return
                  map[name] = (map[name] || 0) + o.quantity
                })
                const top = Object.entries(map).sort((a, b) => b[1] - a[1])[0]
                return top ? top[1] : "-"
              })()}
            </p>
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white p-5 rounded-xl shadow-sm border space-y-2">
          <p className="text-gray-600 font-medium">
            Low Stock Products
          </p>

          <div className="text-sm text-gray-700 space-y-1">
            {products
              .filter(p => p.stock > 0 && p.stock < 5)
              .map(p => (
                <p key={p._id}>- {p.name}</p>
              ))}
          </div>
        </div>

      </div>
    </div>
  )
};

export default MainDashboard;