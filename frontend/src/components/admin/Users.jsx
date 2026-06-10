import React from 'react'

const Users = () => {
  return (
    <div className='flex flex-col p-6'>
      <h1 className='font-bold text-3xl'>Users Managament</h1>

      <div className='flex flex-col lg:flex-row gap-6'>

        <div className='flex flex-col gap-4 w-full lg:w-80 bg-white rounded-xl shadow-sm border p-6 mt-8'>
          <h1 className='text-2xl font-semibold'>Add New User</h1>
          {/* Add User */}
          <div>
            <p>User Name</p>
            <input placeholder='Enter Name' className='w-full p-2 border rounded-xl outline-none' type="text" />
          </div>
          <div>
            <p>User Email</p>
            <input placeholder='Enter Email' className='w-full p-2 border rounded-xl outline-none' type="email" />
          </div>
          <div>
            <p>Password</p>
            <input placeholder='*******' className='w-full p-2 border rounded-xl outline-none' type="password" />
          </div>
          <div>
            <p>User Address</p>
            <input placeholder='Enter Address' className='w-full p-2 border rounded-xl outline-none' type="text" />
          </div>
          <div>
            <select className='outline-none border-1 rounded-md w-full mt-2 p-2'>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>
          </div>
          <button className='text-white bg-blue-500 rounded-xl px-4 py-2 text-sm cursor-pointer'>Add User</button>

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
                <tr className="border-t hover:bg-gray-50 transition">
                  <td className="p-3">1</td>
                  <td className="p-3">User</td>
                  <td className="p-3">Email</td>
                  <td className="p-3">Admin</td>
                  <td className="p-3 space-x-3">
                    <button className="text-red-500 hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              </tbody>

            </table>

          </div>
        </div>
      </div>

    </div>
  )
}

export default Users