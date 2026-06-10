import React, { useState } from 'react';

const Products = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className='flex flex-col p-6'>

      <h1 className='font-bold text-2xl'>Products</h1>

      <div className='flex flex-col sm:flex-row gap-3 justify-between mt-6'>
        <input
          className='outline-none rounded-xl w-full sm:w-3/4 p-2 bg-white border'
          type="text"
          placeholder='Search products by name...'
        />

        <button
          onClick={() => setShowModal(true)}
          className='text-white bg-blue-500 rounded-xl px-4 py-2 text-sm cursor-pointer'
        >
          Add Product
        </button>
      </div>

      {/* TABLE */}
      <div className="w-full overflow-x-auto bg-white rounded-xl shadow-sm border mt-8">
        <table className="min-w-[700px] w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Supplier</th>
              <th className="p-3">Price</th>
              <th className="p-3">Stock</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t hover:bg-gray-50 transition">
              <td className="p-3">iPhone 15</td>
              <td className="p-3">Electronics</td>
              <td className="p-3">Apple</td>
              <td className="p-3">$1200</td>
              <td className="p-3">
                <span className='rounded-full bg-green-500 px-3 py-1 text-white font-semibold'>
                  20
                </span>
              </td>

              <td className="p-3 text-center space-x-3">
                <button className="text-blue-500 hover:underline">Edit</button>
                <button className="text-red-500 hover:underline">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-lg relative">

            <h2 className="text-xl font-bold mb-4">Add Product</h2>

            <input
              className="w-full border p-2 rounded mb-3"
              placeholder="Product Name"
            />

            <input
              className="w-full border p-2 rounded mb-3"
              placeholder="Category"
            />

            <input
              className="w-full border p-2 rounded mb-3"
              placeholder="Supplier"
            />

            <input
              className="w-full border p-2 rounded mb-3"
              placeholder="Price"
              type="number"
            />

            <input
              className="w-full border p-2 rounded mb-4"
              placeholder="Stock"
              type="number"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
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
      )}

    </div>
  );
};

export default Products;