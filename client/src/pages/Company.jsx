import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Company = ({ match }) => {
    const { companyName } = useParams();

    const [companyData, setCompanyData] = useState(null);
    // const [isFollowing, setIsFollowing] = useState(false);

    //Handle this please logic of logged in or not?
    const isLoggedIn = true;
    const fetchData = async () => {
        try {
            const response = await axios.get('API_ENDPOINT');
            const data = await response.json();

            setCompanyData(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // const handleFollowingClick = () => {
    //     // Implement logic to handle the follow action
    //     // You may want to update the state or make an API call to update the backend
    //     setIsFollowing(!isFollowing);
    // };

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} />
            <div className='p-8 flex items-center justify-center flex-col'>
                <h1 className='text-5xl font-semibold'>{companyName}</h1>
                {/* <button
                    onClick={handleFollowingClick}
                    className='text-white cursor-pointer bg-blue-500 py-2 px-4 rounded-full mt-4 flex items-center'
                >
                
                    {isFollowing ? 'Following' : 'Follow'}
                    <span className='ml-2'>{isFollowing ? '✔' : '+'}</span>
                </button> */}
                <div className="container mx-auto my-8 space-y-4">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-white text-xl font-medium table-auto">
                            <tbody  >
                                <tr className="bg-[#333] rounded-[10px]">
                                    <td className="py-4 px-4 w-1/4">
                                        <div className='flex justify-between'><span>Exchange:</span> <span>{companyData?.exchange || 'Loading...'}</span></div>
                                    </td>
                                    <td className="py-4 px-4 w-1/4">
                                        <div className='flex justify-between'><span>PE Ratio:</span> <span>{companyData?.pe_ratio || 'Loading...'}</span></div>
                                    </td>
                                    <td className="py-4 px-4 w-1/4">
                                        <div className='flex justify-between'><span>Dividend Yield:</span> <span>{companyData?.div_yield || 'Loading...'}</span></div>
                                    </td>
                                    <td className="py-4 px-4 w-1/4">
                                        <div className='flex justify-between'><span>Market Capitalization:</span> <span>{companyData?.market_cap || 'Loading...'}</span></div>
                                    </td>
                                </tr>
                                <tr className="bg-[#444] rounded-[10px]">
                                    <td className="py-4 px-4 w-1/4">
                                        <div className='flex justify-between'><span>Sector:</span> <span>{companyData?.sector || 'Loading...'}</span></div>
                                    </td>
                                    <td className="py-4 px-4 w-1/4">
                                        <div className='flex justify-between'><span>Profit Margin:</span> <span>{companyData?.profit_margin || 'Loading...'}</span></div>
                                    </td>
                                    <td className="py-4 px-4 w-1/4">
                                        <div className='flex justify-between'><span>52 Week High:</span> <span>{companyData?.year_high + companyData?.currency || 'Loading...'}</span></div>
                                    </td>
                                    <td className="py-4 px-4 w-1/4">
                                        <div className='flex justify-between'><span>50 Day Moving Avg:</span> <span>{companyData?.day_moving_average_fifty + companyData?.currency || 'Loading...'}</span></div>
                                    </td>
                                </tr>
                                <tr className="bg-[#333] rounded-[10px]">
                                    <td className="py-4 px-4 w-1/4">
                                        <div className='flex justify-between'><span>Country:</span> <span>{companyData?.country || 'Loading...'}</span></div>
                                    </td>
                                    <td className="py-4 px-4 w-1/4">
                                        <div className='flex justify-between'><span>PEG Ratio:</span> <span>{companyData?.peg_ratio || 'Loading...'}</span></div>
                                    </td>
                                    <td className="py-4 px-4 w-1/4">
                                        <div className='flex justify-between'><span>52 Week Low:</span> <span>{companyData?.year_low + companyData?.currency || 'Loading...'}</span></div>
                                    </td>
                                    <td className="py-4 px-4 w-1/4">
                                        <div className='flex justify-between'><span>200 Day Moving Avg:</span> <span>{companyData?.day_moving_average_twohundos + companyData?.currency || 'Loading...'}</span></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* Display stock details here */}
            </div>
        </div>
    );
};

export default Company;
