import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { backendPortURL } from '../constants/constants';

const Signup =  () => {

  var [form, setForm] = useState({});  
  const navigate = useNavigate();
  var [message, setMessage] = useState("");

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
    console.log(form);
    try{
      const {data} = await axios.post(backendPortURL + 'auth/register', form)
      if(data.error){
        console.log(data.error);
        setMessage(data.error);
      } else {
        setForm({});
        console.log('Login Successful');
        navigate(`/profile?token=${data.token}`);
      }
    }
    catch(err){
      setMessage(err);
      console.log(err);
    }
  }

  return (
    <div className='flex flex-col justify-center items-center h-screen bg-gradient-to-tl'>
            <div className='bg-[#393939] px-8 py-12 rounded-[15px]'>
                <h3 className='text-[#ff6beb] text-center text-3xl font-semibold pb-4'>SIGN UP</h3>
                <form onSubmit={handleSubmit} className='flex flex-col'>
                    <input type='name' placeholder='Name' name='name' onChange={handleChange} required className='m-2 p-2 bg-[#aaaa] placeholder:text-[#dddddd] rounded-[5px] text-black' />
                    <input type='email' placeholder='Email' name='email' onChange={handleChange} required className='m-2 p-2 bg-[#aaaa] placeholder:text-[#dddddd] rounded-[5px] text-black' />
                    <input type='password' placeholder='Password' name='password' onChange={handleChange} required className='m-2 p-2 bg-[#aaaa] placeholder:text-[#dddddd] rounded-[5px] text-black' />
                    <button type='submit' className='bg-[#ff6beb] text-black m-2 p-2 rounded-[5px] font-medium hover:drop-shadow-[0_7px_7px_rgba(255,100,204,0.6)]' >SUBMIT</button>
                    <p className='text-[#ff0000]'>{message}</p>
                </form>
                <p className='text-[#ddd]'>Already have an account? <span><Link to="/login" className="text-[#ff6beb]">
                    <button
                        className='text-[#ff6beb]'>
                        Log in
                    </button>
                </Link></span></p>
            </div>
        </div>
  )
}

export default Signup;
