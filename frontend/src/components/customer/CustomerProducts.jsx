import React, { useEffect, useState } from 'react';
import axios from 'axios';


const CustomerProducts = () => {

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showModal, setShowModal] = useState(false);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes] = await Promise.all([
          axios.get("http://localhost:3000/api/product/get", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          })
        ]);

        setProducts(productRes.data.products)

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleOrder = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/order/create",
        {
          productId: selectedProduct._id,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
          },
        }
      );

      alert("Order created!");
      setShowModal(false);
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error");
    }
  };

  const total = selectedProduct ? selectedProduct.price * quantity : 0;

  return (
    <div className='flex flex-col p-6'>
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
            {products.map((item) => (
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
                    onClick={() => {
                      setSelectedProduct(item);
                      setQuantity(1);
                      setShowModal(true);
                    }}
                    className="text-green-500 hover:underline"
                  >
                    Order
                  </button>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">

            <h2 className="text-xl font-bold mb-4">
              Create Order
            </h2>

            <div className="space-y-3">

              <div>
                <span className="font-semibold">Product:</span>{" "}
                {selectedProduct.name}
              </div>

              <div>
                <span className="font-semibold">Price:</span>{" "}
                ${selectedProduct.price}
              </div>

              <div>
                <span className="font-semibold">Available Stock:</span>{" "}
                {selectedProduct.stock}
              </div>

              <div>
                <label className="block mb-1 font-semibold">
                  Quantity
                </label>

                <input
                  type="number"
                  min={1}
                  max={selectedProduct.stock}
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(
                      Math.min(
                        selectedProduct.stock,
                        Math.max(1, Number(e.target.value))
                      )
                    )
                  }
                  className="border rounded-lg px-3 py-2 w-full"
                />
              </div>

              <div className="text-lg font-bold">
                Total: ${total.toFixed(2)}
              </div>

            </div>

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleOrder}
                className="px-4 py-2 bg-green-600 text-white rounded-lg"
              >
                Confirm Order
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default CustomerProducts