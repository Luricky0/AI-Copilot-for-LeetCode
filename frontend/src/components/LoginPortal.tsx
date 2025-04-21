import React, { useState } from 'react'
import axiosInstance from '../utils/axiosInstance'
import useUser from '../hooks/useUser'

const LoginPortal= () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { setToken } = useUser()

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axiosInstance.post('/login', { id: username, password })
      const { token } = res.data
      setToken(token)
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <div className="rounded bg-white">
      <form className="flex flex-col space-y-4" onSubmit={onLogin}>
        <h2>Login</h2>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your username"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Login
        </button>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Register
        </button>
      </form>
    </div>
  )
}
export default LoginPortal
