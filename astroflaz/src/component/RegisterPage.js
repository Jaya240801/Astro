import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';


const RegisterPage = () => {
  const [register, setregister] = useState({
    email: "",
    username: "",
    password: "",
  });

  const navigate = useNavigate()

  const handleChange = (e) => {
    setregister(prev => ({ ...prev, [e.target.name]: e.target.value }))
  };

  const handleClick = async e => {
    e.preventDefault()

    try {
      await axios.post('http://localhost:8800/register', register)
      navigate("/")
    } catch (err) {
      console.log(err)
    }
  }

  console.log(register)

  return (
    <div>
      <div className='d-flex justify-content-center align-items-center bg-dark vh-100'>
        <div className='bg-white p-3 rounded w-25'>
          <h2>Register</h2>
          <div className='mb-3'>
            <input className='w-100' type="text" placeholder="email" onChange={handleChange} name="email" />
          </div>
          <div className='mb-3'>
            <input className='w-100' type="text" placeholder="username" onChange={handleChange} name="username" />
          </div>
          <div className='mb-3'>
            <input className='w-100' type="password" placeholder="password" onChange={handleChange} name="password" />
          </div>
          <button className='btn btn-outline-dark btn-light w-100 rounded-0 text-decoration-none' onClick={handleClick}>Register</button>
          <p className='d-flex justify-content-center mt-3'>I Have Accounts</p>
          <Link to="/" className='btn btn-outline-dark btn-light w-100 rounded-0 text-decoration-none'>Sign In</Link>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
