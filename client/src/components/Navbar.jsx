// Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../authContext';

const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    const handleLoginClick = () => {
        // Handle login action
        navigate('/login');
    };

    return (
        <nav className="bg-[#000] p-8">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-[#ff6beb]">
                    <div className="text-[#ff6beb] text-3xl font-semibold">
                        Stocker
                    </div>
                </Link>
                {isAuthenticated ? (
                    <Link to="/profile" className="text-[#ff6beb]">
                        <button
                            className='bg-[#ff6beb] text-black m-2 p-2 rounded-[5px] font-semibold text-xl hover:drop-shadow-[0_7px_7px_rgba(255,100,204,0.6)] hover:scale-110'
                        >
                            FOLLOWING
                        </button>
                    </Link>
                ) : (
                    <button
                        onClick={handleLoginClick}
                        className='bg-[#ff6beb] text-black m-2 p-2 rounded-[5px] font-semibold text-xl hover:drop-shadow-[0_7px_7px_rgba(255,100,204,0.6)] hover:scale-110'
                    >
                        LOGIN
                    </button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
