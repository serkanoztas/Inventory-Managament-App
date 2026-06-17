import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [supplier, setSupplier] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");

  const [categories, setCategories] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoryRes, supplierRes, productRes] = await Promise.all([
          axios.get("http://localhost:3000/api/category/get", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          }),
          axios.get("http://localhost:3000/api/supplier/get", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          }),
          axios.get("http://localhost:3000/api/product/get", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          })
        ]);

        setCategories(categoryRes.data.categories);
        setSuppliers(supplierRes.data.suppliers);
        setProducts(productRes.data.products)
        // console.log(categoryRes.data);
        // console.log(supplierRes.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/product/add",
        {
          name: productName,
          category,
          supplier,
          price,
          stock,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
          },
        }
      );

      if (response.data.success) {

        setProducts(prev => [
          ...prev,
          response.data.product,
        ]);

        setProductName("");
        setCategory("");
        setSupplier("");
        setPrice("");
        setStock("");

        alert("Product added successfully");

        setShowModal(false);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/product/update/${editingProduct._id}`,
        {
          name: editingProduct.name,
          category: editingProduct.category._id || editingProduct.category,
          supplier: editingProduct.supplier._id || editingProduct.supplier,
          price: editingProduct.price,
          stock: editingProduct.stock,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
          },
        }
      );

      if (response.data.success) {

        setProducts(prev =>
          prev.map(product =>
            product._id === editingProduct._id
              ? response.data.product
              : product
          )
        );

        alert("Product updated successfully");
        setEditingProduct(null);
      }

    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/product/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
          },
        }
      );

      if (response.data.success) {
        alert("Product deleted");

        // UI güncelleme ekstra state tutmadan
        setProducts(prev => prev.filter(cat => cat._id !== id));
      }

    } catch (error) {
      console.log("DELETE ERROR:", error.response?.data || error);
    }
  };


  return (
    <div className='flex flex-col p-6'>

      <h1 className='font-bold text-2xl'>Products</h1>

      <div className='flex flex-col sm:flex-row gap-3 justify-between mt-6'>
        <input
          className='outline-none rounded-xl w-full sm:w-3/4 p-2 bg-white border'
          type="text"
          placeholder='Search products by name...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
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
            {filteredProducts.map((item) => (
              <tr key={item._id} className="border-t hover:bg-gray-50 transition">

                <td className="p-3">{item.name}</td>

                <td className="p-3">
                  {item.category?.categoryName}
                </td>

                <td className="p-3">
                  {item.supplier?.name}
                </td>

                <td className="p-3">
                  ${item.price}
                </td>

                <td className="p-3">
                  <span
                    className={`rounded-full px-3 py-1 text-white font-semibold ${item.stock > 20 ? " bg-green-500 " :
                      item.stock > 0 ? "bg-yellow-500" : "bg-red-500"}`}>
                    {item.stock}
                  </span>
                </td>

                <td className="p-3 text-center space-x-3">
                  <button
                    onClick={() => setEditingProduct(item)}
                    className="text-blue-500 hover:underline">
                    Edit
                  </button>

                  <button onClick={() => handleDelete(item._id)} className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-lg relative">

            <h2 className="text-xl font-bold mb-4">Add Product</h2>

            <form onSubmit={handleSubmit}>

              <input
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                className="w-full border p-2 rounded mb-3"
                placeholder="Product Name"
              />

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border p-2 rounded mb-3"
              >
                <option value="">Select Category</option>

                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.categoryName}
                  </option>
                ))}
              </select>

              <select
                value={supplier}
                onChange={(e) => setSupplier(e.target.value)}
                className="w-full border p-2 rounded mb-3"
              >
                <option value="">Select Supplier</option>

                {suppliers.map((sup) => (
                  <option key={sup._id} value={sup._id}>
                    {sup.name}
                  </option>
                ))}
              </select>

              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full border p-2 rounded mb-3"
                placeholder="Price"
                type="number"
              />

              <input
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full border p-2 rounded mb-4"
                placeholder="Stock"
                type="number"
              />

              <div className="flex justify-end gap-2">

                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-600"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Save
                </button>

              </div>

            </form>

          </div>
        </div>
      )}


      {
        //Edit Page
        editingProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

            <div className="bg-white p-6 rounded-xl w-[350px] md:w-[600px]">

              <h2 className="text-2xl font-bold text-center mb-5">
                Edit Product
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                <input
                  className="border p-2 rounded"
                  placeholder="Product Name"
                  value={editingProduct.name || ""}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      name: e.target.value,
                    })
                  }
                />

                <input
                  className="border p-2 rounded"
                  placeholder="Price"
                  type="number"
                  value={editingProduct.price || ""}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: e.target.value,
                    })
                  }
                />

                <input
                  className="border p-2 rounded"
                  placeholder="Stock"
                  type="number"
                  value={editingProduct.stock || ""}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      stock: e.target.value,
                    })
                  }
                />

                <select
                  className="border p-2 rounded"
                  value={
                    editingProduct.category?._id ||
                    editingProduct.category ||
                    ""
                  }
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="">Select Category</option>

                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.categoryName}
                    </option>
                  ))}
                </select>

                <select
                  className="border p-2 rounded"
                  value={
                    editingProduct.supplier?._id ||
                    editingProduct.supplier ||
                    ""
                  }
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      supplier: e.target.value,
                    })
                  }
                >
                  <option value="">Select Supplier</option>

                  {suppliers.map((sup) => (
                    <option key={sup._id} value={sup._id}>
                      {sup.name}
                    </option>
                  ))}
                </select>

              </div>

              <div className="flex justify-center gap-3 mt-5">

                <button
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 rounded bg-gray-300"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdate}
                  className="px-4 py-2 rounded bg-green-600 text-white"
                >
                  Save
                </button>

              </div>

            </div>

          </div>
        )
      }

    </div>
  );
};

export default Products;