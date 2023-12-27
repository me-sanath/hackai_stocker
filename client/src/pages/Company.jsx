import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { XYPlot, LineSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines } from 'react-vis';
import 'react-vis/dist/style.css';

const Company = ({ match }) => {

    const { companyName } = useParams();

    const [companyData, setCompanyData] = useState(null);
    const [isFollowing, setIsFollowing] = useState(false);

    //Handle this please logic of logged in or not?
    const isLoggedIn = true;

    const [stockChartValues, setStockChartValues] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get('API_ENDPOINT');
            const data = await response.data;

            const values = Object.keys(data).map(date => ({
                x: new Date(date),
                y: parseFloat(data[date]['4. close']),
            }));

            setCompanyData(data);
            setStockChartValues(values);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // useEffect(() => {
    //     // Dummy data for testing
    //     const dummyData = {
    //         "2023-12-26": {
    //             "4. close": "2577.5000",
    //         },
    //         "2023-12-22": {
    //             "4. close": "2564.7000",
    //         },
    //         "2023-12-21": {
    //             "4. close": "2562.2000",
    //         },
    //         "2023-12-20": {
    //             "4. close": "2527.3501",
    //         },
    //         "2023-12-19": {
    //             "4. close": "2573.0000",
    //         },
    //         "2023-12-18": {
    //             "4. close": "2577.5000",
    //         },
    //         "2023-12-17": {
    //             "4. close": "2564.7000",
    //         },
    //         "2023-12-16": {
    //             "4. close": "2562.2000",
    //         }
    // //     };
    //     const dates = Object.keys(dummyData).slice(0, 7).reverse();
    //     const closingPrices = dates.map((date) => parseFloat(dummyData[date]['4. close']));

    //     setCompanyData(dummyData);
    //     setStockChartXValues(dates);
    //     setStockChartYValues(closingPrices);
    // }, []);

    const handleFollowingClick = () => {
        // Implement logic to handle the follow action
        // You may want to update the state or make an API call to update the backend
        setIsFollowing(!isFollowing);
    };

    return (
        <div>
            <Navbar isLoggedIn={isLoggedIn} />
            <div className='p-8 flex items-center justify-center flex-col'>
                <div className='flex justify-between w-screen px-60'>
                    <h1 className='text-5xl font-semibold'>{companyName}</h1>
                    <button
                        onClick={handleFollowingClick}
                        className='text-black cursor-pointer bg-[#ff6beb] py-2 px-4 rounded-full mt-4 flex items-center'
                    >
                        <span className='mr-2'>{isFollowing ? '✔' : '+'}</span>
                        {isFollowing ? 'Following' : 'Follow'}
                    </button>
                </div>
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
                {stockChartValues.length > 0 && (
                    <div className="mt-8" style={{ width: '80vw', height: '400px' }}>
                        <XYPlot xType="time" width={800} height={400}>
                            <VerticalGridLines />
                            <HorizontalGridLines />
                            <XAxis title="Date" />
                            <YAxis title="Closing Prices" />
                            <LineSeries data={stockChartValues} />
                        </XYPlot>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Company;