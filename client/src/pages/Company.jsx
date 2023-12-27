import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';

const Company = ({ match }) => {
    const { companyName } = useParams();

    const [companyData, setCompanyData] = useState(null);

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

    return (
        <div>
            <Navbar />
            <div className='p-8 flex items-center justify-center flex-col'>
                <h1 className='text-5xl font-semibold'>{companyName}</h1>
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
