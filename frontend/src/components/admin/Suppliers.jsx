import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Suppliers = () => {

    const [loading, setLoading] = useState(false);
    const [showModel, setShowModel] = useState(false);
    const [editingSupplier, setEditingSupplier] = useState(null);
    const [suppliers, setSuppliers] = useState([]);
    const [supplierName, setSupplierName] = useState("");
    const [supplierEmail, setSupplierEmail] = useState("");
    const [supplierPhone, setSupplierPhone] = useState("");
    const [supplierAddress, setSupplierAddresss] = useState("");


    useEffect(() => {
        const fetchSuppliers = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/supplier/get",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                        },
                    }
                );

                console.log(response.data.suppliers);
                setSuppliers(response.data.suppliers);
                setLoading(false);
            } catch (error) {
                console.log("STATUS:", error.response?.status);
                console.log("DATA:", error.response?.data);
                setLoading(false);
            }
        }
        fetchSuppliers();
    }, [])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post("http://localhost:3000/api/supplier/add",
                { name: supplierName, email: supplierEmail, number: supplierPhone, address: supplierAddress },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                    },
                }
            );
            if (response.data.success) {
                alert("Supplier Added Successfully");

                const newSupplier = response.data.supplier;
                setSuppliers(prev => [...prev, newSupplier]);

                setSupplierName("");
                setSupplierEmail("");
                setSupplierPhone("");
                setSupplierAddresss("");




            }
            else {
                console.log("Error Adding Supplier", response.data);
                alert("Error Adding Supplier");

            }
        } catch (error) {
            console.log("ERROR:", error);
            console.log("RESPONSE:", error.response);
        }

        setShowModel(false);

    }

    const handleUpdate = async () => {
        try {
            const response = await axios.put(
                `http://localhost:3000/api/supplier/update/${editingSupplier._id}`,
                {
                    name: editingSupplier.name,
                    email: editingSupplier.email,
                    number: editingSupplier.number,
                    address: editingSupplier.address
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                    },
                }
            );

            if (response.data.success) {
                alert("Supplier updated successfully");

                setSuppliers(prev =>
                    prev.map(cat =>
                        cat._id === editingSupplier._id
                            ? response.data.supplier
                            : cat
                    )
                );

                setEditingSupplier(null); // modal kapat

                console.log(response.data);
            }
        } catch (error) {
            console.log("UPDATE ERROR:", error.response?.data || error);
        }
    };
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:3000/api/supplier/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                    },
                }
            );

            if (response.data.success) {
                alert("Supplier deleted");

                // UI güncelleme ekstra state tutmadan
                setSuppliers(prev => prev.filter(cat => cat._id !== id));
            }

        } catch (error) {
            console.log("DELETE ERROR:", error.response?.data || error);
        }
    };

    if (loading) { return (<div className='font-bold text-4xl mx-auto'> Loading... </div>) }
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
                        {Array.isArray(suppliers) && suppliers.filter(Boolean).map((item) => (
                            <tr key={item._id} className="border-t hover:bg-gray-50 transition">
                                <td className="p-3 text-xs"> {item._id} </td>
                                <td className="p-3">{item.name}</td>
                                <td className="p-3">{item.email}</td>
                                <td className="p-3">{item.number}</td>
                                <td className="p-3">{item.address} </td>
                                <td className="p-3 space-x-3">
                                    <button
                                        onClick={() => setEditingSupplier(item)}
                                        className="text-blue-500 hover:underline cursor-pointer">
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="text-red-500 hover:underline cursor-pointer">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
            {
                showModel && (
                    <form onSubmit={handleSubmit} className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

                        <div className="bg-white w-[90%] max-w-md p-6 rounded-xl shadow-lg relative">

                            <h2 className="text-xl font-bold mb-4">Add Supplier</h2>

                            <input
                                onChange={(e) => setSupplierName(e.target.value)}
                                className="w-full border p-2 rounded mb-3"
                                placeholder="Supplier Name"
                                type="text"
                            />

                            <input
                                onChange={(e) => setSupplierEmail(e.target.value)}
                                className="w-full border p-2 rounded mb-3"
                                placeholder="Supplier Email"
                                type="email"
                            />

                            <input
                                onChange={(e) => setSupplierPhone(e.target.value)}
                                className="w-full border p-2 rounded mb-3"
                                placeholder="Supplier Phone"
                                type="text"
                            />

                            <input
                                onChange={(e) => setSupplierAddresss(e.target.value)}
                                className="w-full border p-2 rounded mb-3"
                                placeholder="Supplier Address"
                                type="text"
                            />

                            <div className="flex justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={() => setShowModel(false)}
                                    className="px-4 py-2 text-gray-600"

                                >
                                    Cancel
                                </button>

                                <button className="px-4 py-2 bg-blue-500 text-white rounded"
                                    type="submit"
                                >
                                    Save
                                </button>
                            </div>

                        </div>
                    </form>
                )
            }
            { //Edit Page
                editingSupplier && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-white  p-6 rounded-xl w-[300px] md:w-[500px]">
                            <h2 className='flex justify-center items-center mb-4 font-bold text-2xl'>Edit Category</h2>

                            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
                                <input
                                    placeholder='update name'
                                    className='px-2 py-1 rounded-lg'
                                    value={editingSupplier?.name || ""}
                                    onChange={(e) =>
                                        setEditingSupplier({
                                            ...editingSupplier,
                                            name: e.target.value,
                                        })
                                    }
                                />

                                <input
                                    placeholder='update email'
                                    className='px-2 py-1 rounded-lg'
                                    value={editingSupplier?.email || ""}
                                    onChange={(e) =>
                                        setEditingSupplier({
                                            ...editingSupplier,
                                            email: e.target.value,
                                        })
                                    }
                                />

                                <input
                                    placeholder='update phone'
                                    className='px-2 py-1 rounded-lg'
                                    value={editingSupplier?.number || ""}
                                    onChange={(e) =>
                                        setEditingSupplier({
                                            ...editingSupplier,
                                            number: e.target.value,
                                        })
                                    }
                                />

                                <input
                                    placeholder='update address'
                                    className='px-2 py-1 rounded-lg'
                                    value={editingSupplier?.address || ""}
                                    onChange={(e) =>
                                        setEditingSupplier({
                                            ...editingSupplier,
                                            address: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            <button className='flex mx-auto mt-4 bg-green-600 text-white rounded-xl px-2 py-1' onClick={handleUpdate}>
                                Save
                            </button>
                        </div>
                    </div>
                )
            }
        </div>


    )
}

export default Suppliers