import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const companies = [
    { value: 'apple', label: 'Apple Inc.' },
    { value: 'google', label: 'Google LLC' },
    // Add more companies to the list
];

const Home = () => {
    const [selectedCompany, setSelectedCompany] = useState(null);
    const navigate = useNavigate();

    const handleSearch = () => {
        navigate(`/${selectedCompany.value}`);
    };

    return (
        <div className='flex justify-center items-center h-screen flex-col'>
            <Select
                options={companies}
                value={selectedCompany}
                onChange={(selectedOption) => setSelectedCompany(selectedOption)}
                placeholder="Select a company"
                className='w-36 sm:w-80'
            />
            <button onClick={handleSearch}>Search</button>
            <button>Login</button>
        </div>
    );
};

export default Home;
