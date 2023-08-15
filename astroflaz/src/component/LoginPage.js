import React, { useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";

function LoginPage(passEmail) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const login = async () => {
        try {
            const response = await axios.post('http://localhost:8800/login', { email, password });
            const simpanEmail = response.data.userEmail;

            if (response.data.error) {
                setMessage('Login failed');
            } else {
                localStorage.setItem('isAuthenticated', 'true');
                navigate("/home");
                // console.log(simpanEmail)
            }

            if (simpanEmail) {
                passEmail(simpanEmail);
            }
            console.log(passEmail(simpanEmail))
            // setMessage(response.data.message);         
        } catch (err) {
            console.error(err);
            setMessage('Login failed');
        }
    };

    return (
        <div>
            <div className='d-flex justify-content-center align-items-center bg-dark vh-100'>
                <div className='bg-white p-3 rounded w-25'>
                    <h2>Login</h2>
                    <div className='mb-3'>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className='w-100' type="email" placeholder="email"/>
                    </div>
                    <div className='mb-3'>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} className='w-100' type="password" placeholder="password"/>
                    </div>
                    <button className='btn btn-outline-dark btn-light w-100 rounded-0 text-decoration-none' onClick={login}>Login</button>
                    <p className='d-flex justify-content-center mt-3'>Don't have accounts? Register below here</p>
                    <Link to="/register" className='btn btn-outline-dark btn-light w-100 rounded-0 text-decoration-none'>Register</Link>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;