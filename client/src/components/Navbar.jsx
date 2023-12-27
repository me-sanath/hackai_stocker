// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="bg-[#000] p-8">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-[#ff6beb]">
                    <div className="text-[#ff6beb] text-3xl font-semibold">
                        Stocker
                    </div>
                </Link>
                <Link to="/login" className="text-[#ff6beb]">
                    <button type='submit'
                        className='bg-[#ff6beb] text-black m-2 p-2 rounded-[5px] font-semibold text-xl hover:drop-shadow-[0_7px_7px_rgba(255,100,204,0.6)] hover:scale-110'>
                        LOGIN
                    </button>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
