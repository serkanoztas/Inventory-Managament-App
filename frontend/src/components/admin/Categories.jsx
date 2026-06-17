import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Categories = () => {

    const [loading, setLoading] = useState(false);
    const [categoryName, setCategoryName] = useState("");
    const [categoryDescription, setCategoryDescription] = useState("");
    const [categories, setCategories] = useState([]);
    const [editingCategory, setEditingCategory] = useState(null);
    const [search, setSearch] = useState("");
    const filteredCategories = categories.filter((category) =>
        category.categoryName
            .toLowerCase()
            .includes(search.toLowerCase())
    );



    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    "http://localhost:3000/api/category/get",
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                        },
                    }
                );

                console.log(response.data.categories);
                setCategories(response.data.categories);
                setLoading(false);
            } catch (error) {
                console.log("STATUS:", error.response?.status);
                console.log("DATA:", error.response?.data);
                setLoading(false);
            }
        }
        fetchCategories();
    }, [])

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post("http://localhost:3000/api/category/add",
                { categoryName, categoryDescription },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                    },
                }
            );
            if (response.data.success) {
                alert("Category Added Successfully");

                const newCategory = response.data.category;
                setCategories(prev => [...prev, newCategory]);

                setCategoryName("");
                setCategoryDescription("");




            }
            else {
                console.log("Error Adding Category", response.data);
                alert("Error Adding Category");

            }
        } catch (error) {
            console.log("ERROR:", error);
            console.log("RESPONSE:", error.response);
        }

    }

    const handleUpdate = async () => {
        try {
            const response = await axios.put(
                `http://localhost:3000/api/category/update/${editingCategory._id}`,
                {
                    categoryName: editingCategory.categoryName,
                    categoryDescription: editingCategory.categoryDescription,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                    },
                }
            );

            if (response.data.success) {
                alert("Category updated successfully");

                setCategories(prev =>
                    prev.map(cat =>
                        cat._id === editingCategory._id
                            ? response.data.category
                            : cat
                    )
                );

                setEditingCategory(null); // modal kapat
            }
        } catch (error) {
            console.log("UPDATE ERROR:", error.response?.data || error);
        }
    };
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(
                `http://localhost:3000/api/category/delete/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
                    },
                }
            );

            if (response.data.success) {
                alert("Category deleted");

                // UI güncelleme ekstra state tutmadan
                setCategories(prev => prev.filter(cat => cat._id !== id));
            }

        } catch (error) {
            console.log("DELETE ERROR:", error.response?.data || error);
        }
    };

    if (loading) { return (<div className='font-bold text-4xl mx-auto'> Loading... </div>) }
    return (
        <div className='p-6'>

            <h1 className='font-bold text-3xl mb-6'>
                Category Management
            </h1>


            <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row gap-6">


                <div className='flex flex-col bg-white w-full lg:w-2/5 rounded-xl border p-4 gap-6'>

                    <h1 className='font-semibold text-2xl'>
                        Add New Category
                    </h1>

                    <div className='flex flex-col gap-2'>
                        <p>Category Name</p>
                        <input
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className='border-gray-400 border py-1 px-2 rounded-md'
                            type="text"
                            placeholder='Enter category name'
                        />
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p>Description</p>
                        <input
                            value={categoryDescription}
                            onChange={(e) => setCategoryDescription(e.target.value)}
                            className='border-gray-400 border py-1 px-2 rounded-md'
                            type="text"
                            placeholder='Category description (optional)'
                        />
                    </div>

                    <button type="submit" className='text-white bg-blue-500 hover:bg-blue-600 transition rounded-xl p-2'>
                        Add Category
                    </button>

                </div>

                <hr />

                <div className='flex-1'>

                    <input
                        className='w-full border-gray-400 bg-white border py-1 px-2 rounded-md'
                        type="text"
                        placeholder='Search category name'
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border mt-6">

                        <table className="min-w-full text-sm text-left">

                            <thead className="bg-gray-100 text-gray-700">
                                <tr>
                                    <th className="p-3">Name</th>
                                    <th className="p-3">Description</th>
                                    <th className="p-3">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {Array.isArray(filteredCategories) &&
                                    filteredCategories.filter(Boolean).map((item) => (
                                        <tr key={item._id} className="border-t hover:bg-gray-50 transition">
                                            <td className="p-3"> {item.categoryName} </td>
                                            <td className="p-3"> {item.categoryDescription} </td>
                                            <td className="p-3 space-x-3">
                                                <button className="text-white p-1.5 rounded-xl hover:underline bg-blue-500"
                                                    onClick={() => setEditingCategory(item)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className="bg-red-500 text-white p-1.5 rounded-xl  hover:underline"
                                                    onClick={() => handleDelete(item._id)}>
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))}

                            </tbody>

                        </table>
                    </div>

                </div>

            </form>

            { //Edit Page
                editingCategory && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-white  p-6 rounded-xl w-[500px]">
                            <h2 className='flex justify-center items-center mb-4 font-bold text-2xl'>Edit Category</h2>

                            <div className='flex gap-4'>
                                <input
                                    className='px-2 py-1 rounded-lg'
                                    value={editingCategory?.categoryName || ""}
                                    onChange={(e) =>
                                        setEditingCategory({
                                            ...editingCategory,
                                            categoryName: e.target.value,
                                        })
                                    }
                                />

                                <input
                                    className='px-2 py-1 rounded-lg'
                                    value={editingCategory?.categoryDescription || ""}
                                    onChange={(e) =>
                                        setEditingCategory({
                                            ...editingCategory,
                                            categoryDescription: e.target.value,
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
    );
};

export default Categories;