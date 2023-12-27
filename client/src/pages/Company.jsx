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
                                        Exchange: {companyData?.exchange || 'Loading...'}
                                    </td>
                                    <td className="py-4 px-4 w-1/4">
                                        PE Ratio: {companyData?.peRatio || 'Loading...'}
                                    </td>
                                    <td className="py-4 px-4 w-1/4">
                                        Dividend Yield: {companyData?.dividendYield || 'Loading...'}
                                    </td>
                                    <td className="py-4 px-4 w-1/4">
                                        Market Capitalization: {companyData?.marketCap || 'Loading...'}
                                    </td>
                                </tr>
                                <tr className="bg-[#444] rounded-[10px]">
                                    <td className="py-4 px-4">
                                        Sector: {companyData?.sector || 'Loading...'}
                                    </td>
                                    <td className="py-4 px-4">
                                        PB Ratio: {companyData?.pbRatio || 'Loading...'}
                                    </td>
                                    <td className="py-4 px-4">
                                        52 Week High: {companyData?.weekHigh || 'Loading...'}
                                    </td>
                                    <td className="py-4 px-4">
                                        50 Day Moving Avg: {companyData?.movingAverage50 || 'Loading...'}
                                    </td>
                                </tr>
                                <tr className="bg-[#333] rounded-[10px]">
                                    <td className="py-4 px-4">
                                        Country India: {companyData?.country || 'Loading...'}
                                    </td>
                                    <td className="py-4 px-4">
                                        PEG Ratio: {companyData?.pegRatio || 'Loading...'}
                                    </td>
                                    <td className="py-4 px-4">
                                        52 Week Low: {companyData?.weekLow || 'Loading...'}
                                    </td>
                                    <td className="py-4 px-4">
                                        200 Day Moving Avg: {companyData?.movingAverage200 || 'Loading...'}
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
