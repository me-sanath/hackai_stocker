import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { backendPortURL } from '../constants/constants';
import { useAuth } from '../authContext';

const Login = () => {
    var [form, setForm] = useState({});
    const navigate = useNavigate();
    var [message, setMessage] = useState("");
    const { isAuthenticated, toggleLogin } = useAuth();

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setForm({
            ...form,
            [name]: value,
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            const data = await axios.post(backendPortURL + 'api/login/', form);
    
            if (data.error) {
                setMessage(data.error);
            } else {
                setForm({});
                setMessage("Login successful");
                toggleLogin(data.data.token, data.data.user_id, data.data.username, () => {
                    navigate(`/profile?token=${data.data.token}&userid=${data.data.user_id}&username=${data.data.username}`);
                })
            }
        } catch (error) {
            console.error(error);
            setMessage("An error occurred during login.");
        }
    };
    

    return (
        <div className='flex flex-col justify-center items-center h-screen bg-gradient-to-tl'>
            <div className='bg-[#393939] px-8 py-12 rounded-[15px]'>
                <h3 className='text-[#ff6beb] text-center text-3xl font-semibold pb-4'>LOGIN</h3>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <input type='email' placeholder='Email' name='email' onChange={handleChange} required className='m-2 p-2 bg-[#aaaa] placeholder:text-[#dddddd] rounded-[5px] text-black' />
                    <input type='password' placeholder='Password' name='password' onChange={handleChange} required className='m-2 p-2 bg-[#aaaa] placeholder:text-[#dddddd] rounded-[5px] text-black' />
                    <button type='submit' className='bg-[#ff6beb] text-black m-2 p-2 rounded-[5px] font-medium hover:drop-shadow-[0_7px_7px_rgba(255,100,204,0.6)]' >SUBMIT</button>
                    <p className='text-[#ff0000]'>{message}</p>
                </form>
                <p className='text-[#ddd]'>Don't have an account? <span><Link to="/register" className="text-[#ff6beb]">
                    <button
                        className='text-[#ff6beb]'>
                        Register here
                    </button>
                </Link></span></p>
            </div>
        </div>
    )
}

export default Login
