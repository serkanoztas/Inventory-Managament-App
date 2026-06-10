import React from 'react';

const MainDashboard = () => {
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
          <span className="text-2xl font-semibold text-gray-800">0</span>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Total Stock</p>
          <span className="text-2xl font-semibold text-gray-800">0</span>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Orders Today</p>
          <span className="text-2xl font-semibold text-gray-800">0</span>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border">
          <p className="text-gray-500 text-sm">Revenue</p>
          <span className="text-2xl font-semibold text-green-600">
            $0
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
          <div className="text-3xl font-bold text-red-500">0</div>
        </div>

        {/* Highest Sale Product */}
        <div className="bg-white p-5 rounded-xl shadow-sm border space-y-2">
          <p className="text-gray-600 font-medium">
            Highest Sale Product
          </p>

          <div className="text-sm text-gray-700">
            <p><span className="font-medium">Name:</span> -</p>
            <p><span className="font-medium">Category:</span> -</p>
            <p><span className="font-medium">Total Units Sold:</span> -</p>
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white p-5 rounded-xl shadow-sm border space-y-2">
          <p className="text-gray-600 font-medium">
            Low Stock Products
          </p>

          <div className="text-sm text-gray-700 space-y-1">
            <p>- Product 1</p>
            <p>- Product 2</p>
            <p>- Product 3</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MainDashboard;