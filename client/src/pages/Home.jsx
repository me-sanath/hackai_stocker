import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Select from 'react-select';
import { Search } from '@mui/icons-material';
import { useAuth } from '../authContext';
import { backendPortURL } from '../constants/constants';

const Home = () => {
    const [selectedCompany, setSelectedCompany] = useState(null);
    const [isTextTyped, setIsTextTyped] = useState(false);
    const navigate = useNavigate();
    const [companies, setCompanies] = useState([]);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchCompanies = async () => {
            try {
                //HAVE TO FILL THIS
                const response = await fetch(backendPortURL + '/'); 
                const data = await response.json();
                setCompanies(data);
            } catch (error) {
                console.error('Error fetching companies:', error);
            }
        };

        fetchCompanies();
    }, []);

    const handleSearch = () => {
        setIsTextTyped(selectedCompany && selectedCompany.label !== '');
        navigate(`/${selectedCompany.code}`);
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className='h-screen bg-black text-white relative'>
            <nav className="bg-[#000] p-8 w-screen">
                <div className="container mx-auto flex justify-end items-center">
                    {isAuthenticated ? (
                        <Link to="/profile" className="text-[#ff6beb]">
                        <button
                            onClick={handleLoginClick}
                            className='bg-[#ff6beb] text-black m-2 p-2 rounded-[5px] font-semibold text-xl hover:drop-shadow-[0_7px_7px_rgba(255,100,204,0.6)] hover:scale-110'
                        >
                            FOLLOWING
                        </button>
                        </Link>
                    ) : (
                        <Link to="/login" className="text-[#ff6beb]">
                        <button
                            onClick={handleLoginClick}
                            className='bg-[#ff6beb] text-black m-2 p-2 rounded-[5px] font-semibold text-xl hover:drop-shadow-[0_7px_7px_rgba(255,100,204,0.6)] hover:scale-110'
                        >
                            LOGIN
                        </button>
                        </Link>
                    )}
                </div>
            </nav>

            <div className="h-4/6 flex flex-col items-center justify-center">
                <h1 className='text-8xl font-bold'>STOCKER</h1>
                <p className="text-2xl text-[#ff6beb] mb-2">"Stalk the stocks"</p>
                <div className='flex justify-between'>
                    <Select
                        options={companies}
                        value={selectedCompany}
                        onChange={(selectedOption) => {
                            setSelectedCompany(selectedOption)
                        }}
                        placeholder="Search for a company"
                        className={`w-5/6 sm:w-1/2 !text-white py-3 px-6 rounded focus:outline-none placeholder:text-white`}
                        styles={{
                            control: (provided) => ({
                                ...provided,
                                backgroundColor: '#eeeeee',
                                borderColor: 'white',
                                color: '!#ffffff',
                                width: '20rem', // Adjust the width as needed
                            }),
                            option: (provided, state) => ({
                                ...provided,
                                backgroundColor: state.isSelected ? '#4a5568' : 'white',
                                color: 'black', // Change font color inside menu
                            }),
                            dropdown: (provided) => ({
                                ...provided,
                                zIndex: 9999,
                                marginTop: '10px',
                                maxHeight: '200px',
                                width: '10rem', // Adjust the width as needed
                            }),
                        }}
                        components={{
                            IndicatorSeparator: () => null,
                            DropdownIndicator: () => null,
                        }}
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={handleSearch} className=''><Search /></button>
                </div>
            </div>
        </div>
    );
};

export default Home;
