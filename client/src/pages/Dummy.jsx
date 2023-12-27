import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Line } from 'react-chartjs-2';

const Company = () => {
  const { companyName } = useParams();

  const [companyData, setCompanyData] = useState(null);
  const [stockChartXValues, setStockChartXValues] = useState([]);
  const [stockChartYValues, setStockChartYValues] = useState([]);
  const chartRef = useRef(null);

  useEffect(() => {
    // Dummy data for testing
    const dummyData = {
      "2023-12-26": {
        "4. close": "2577.5000",
      },
      "2023-12-22": {
        "4. close": "2564.7000",
      },
      "2023-12-21": {
        "4. close": "2562.2000",
      },
      "2023-12-20": {
        "4. close": "2527.3501",
      },
      "2023-12-19": {
        "4. close": "2573.0000",
      },
    };
    const dates = Object.keys(dummyData).slice(0, 7).reverse();
    const closingPrices = dates.map((date) => parseFloat(dummyData[date]['4. close']));

    setCompanyData(dummyData);
    setStockChartXValues(dates);
    setStockChartYValues(closingPrices);
  }, []);

  useEffect(() => {
    // Destroy the chart before rendering to prevent canvas errors
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create a new chart
    const ctx = document.getElementById('stockChart');
    chartRef.current = new window.Chart(ctx, {
      type: 'line',
      data: {
        labels: stockChartXValues,
        datasets: [
          {
            label: 'Closing Prices',
            data: stockChartYValues,
            fill: false,
            borderColor: '#3498db',
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'category',
            labels: stockChartXValues,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // Cleanup the chart on component unmount
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [stockChartXValues, stockChartYValues]);

  return (
    <div>
      <Navbar />
      <div className='p-8 flex items-center justify-center flex-col'>
        <h1 className='text-5xl font-semibold'>{companyName}</h1>

        <div className="mt-8">
          <canvas id="stockChart" />
        </div>
      </div>
    </div>
  );
};

export default Dummy;
