import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const companies = [
  { value: 'apple', label: 'Apple Inc.' },
  { value: 'google', label: 'Google LLC' },
];

const Home = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isTextTyped, setIsTextTyped] = useState(false);
  const navigate = useNavigate();

  const handleSearch = () => {
    setIsTextTyped(selectedCompany && selectedCompany.label !== '');
    navigate(`/${selectedCompany.value}`);
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
    <div className='flex flex-col items-center h-screen bg-gray-900 text-white relative p-10'>
      <div className="flex justify-between w-full mb-40">
        <a href="/" className='text-2xl font-bold cursor-pointer text-[#ff6beb]'>Stocker</a>
        <button
          onClick={handleLoginClick}
          className='bg-[#ff6beb] text-white py-3 px-6 rounded transform hover:scale-110 transition-transform'
        >
          Login
        </button>
      </div>
      
      <div className="flex flex-col items-center space-x-4 flex-grow">
        <p className="text-lg text-[#ff6beb] mb-2">"Stalk the stocks"</p>
        <Select
          options={companies}
          value={selectedCompany}
          onChange={(selectedOption) => setSelectedCompany(selectedOption)}
          placeholder="Search for a company"
          className={`w-96 text-white py-3 px-6 rounded focus:outline-none placeholder:text-white`}
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: 'transparent',
              borderColor: 'white',
              color: '#ffffff',
              width: '300px', // Adjust the width as needed
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
              width: '300px', // Adjust the width as needed
            }),
          }}
          components={{
            IndicatorSeparator: () => null,
            DropdownIndicator: () => <i className="material-icons text-white">search</i>,
          }}
          onKeyPress={handleKeyPress}
        />
      </div>
    </div>
  );
};

export default Home;
