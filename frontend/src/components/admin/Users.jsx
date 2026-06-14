import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Users = () => {

  const [users, setUsers] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [role, setRole] = useState("customer");

  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/user/get",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
            },
          }
        );

        if (response.data.success) {
          setUsers(response.data.users);
        }

      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/add",
        {
          name,
          email,
          password,
          address,
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
          },
        }
      );

      if (response.data.success) {

        setUsers(prev => [
          ...prev,
          response.data.user,
        ]);

        setName("");
        setEmail("");
        setPassword("");
        setAddress("");
        setRole("customer");

        alert("User added successfully");
      }

    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/user/update/${editingUser._id}`,
        {
          name: editingUser.name,
          email: editingUser.email,
          address: editingUser.address,
          role: editingUser.role,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
          },
        }
      );

      if (response.data.success) {

        setUsers(prev =>
          prev.map(user =>
            user._id === editingUser._id
              ? response.data.user
              : user
          )
        );

        setEditingUser(null);

        alert("User updated successfully");
      }

    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/user/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("pos-token")}`,
          },
        }
      );

      if (response.data.success) {

        setUsers(prev =>
          prev.filter(user => user._id !== id)
        );

        alert("User deleted");
      }

    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  return (
    <div className='flex flex-col p-6'>
      <h1 className='font-bold text-3xl'>Users Managament</h1>

      <div className='flex flex-col lg:flex-row gap-6'>

        <div className='flex flex-col gap-1 lg:gap-4 w-2/3 lg:w-80 bg-white rounded-xl shadow-sm border p-2 lg:p-6 mt-1 lg:mt-8 '>
          <h1 className='text-2xl font-semibold'>Add New User</h1>
          {/* Add User */}
          <div>
            <p>User Name</p>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder='Enter Name' className='w-full p-2 border rounded-xl outline-none' type="text" />
          </div>
          <div>
            <p>User Email</p>
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Enter Email' className='w-full p-2 border rounded-xl outline-none' type="email" />
          </div>
          <div>
            <p>Password</p>
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='*******' className='w-full p-2 border rounded-xl outline-none' type="password" />
          </div>
          <div>
            <p>User Address</p>
            <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder='Enter Address' className='w-full p-2 border rounded-xl outline-none' type="text" />
          </div>
          <div>
            <select value={role} onChange={(e) => setRole(e.target.value)} className='outline-none border-1 rounded-md w-full mt-2 p-2'>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          <button
            onClick={handleSubmit}
            className='text-white bg-blue-500 rounded-xl px-4 py-2 text-sm cursor-pointer'>Add User</button>

        </div>
        {/* Searh */}
        <div className='flex-1 bg-white rounded-xl shadow-sm border p-6 mt-8'>

          <div>
            <input className='w-full p-2 border rounded-xl outline-none' placeholder='Searh Users...' type="text" />
          </div>

          <div className="overflow-x-auto mt-6">

            <table className="w-full min-w-[600px] text-sm text-left">

              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3">Id</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Action</th>

                </tr>
              </thead>

              <tbody>
                {users.map((item) => (
                  <tr
                    key={item._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{item._id}</td>
                    <td className="p-3">{item.name}</td>
                    <td className="p-3">{item.email}</td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-xs ${item.role === "admin"
                          ? "bg-blue-500"
                          : "bg-green-500"
                          }`}
                      >
                        {item.role}
                      </span>
                    </td>

                    <td className="p-3 space-x-3">

                      <button
                        onClick={() => setEditingUser(item)}
                        className="text-blue-500 hover:underline"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(item._id)}
                        className="text-red-500 hover:underline"
                      >
                        Delete
                      </button>

                    </td>
                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        </div>
      </div>
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl w-[400px] space-y-4">

            <h2 className="text-xl font-bold">Update User</h2>

            <input
              className="w-full p-2 border rounded"
              value={editingUser.name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, name: e.target.value })
              }
              placeholder="Name"
            />

            <input
              className="w-full p-2 border rounded"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
              placeholder="Email"
            />

            <input
              className="w-full p-2 border rounded"
              value={editingUser.address}
              onChange={(e) =>
                setEditingUser({ ...editingUser, address: e.target.value })
              }
              placeholder="Address"
            />

            <select
              value={editingUser.role}
              onChange={(e) =>
                setEditingUser({ ...editingUser, role: e.target.value })
              }
              className="w-full p-2 border rounded"
            >
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>

            <div className="flex justify-between">

              <button
                onClick={() => setEditingUser(null)}
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Update
              </button>

            </div>
          </div>
        </div>
      )}

    </div>
  )
}

export default Users