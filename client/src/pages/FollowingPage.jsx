import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const FollowingPage = () => {
  const [followedStocks, setFollowedStocks] = useState([]);
  const [notificationStatus, setNotificationStatus] = useState({});
  const navigate = useNavigate();

  // Fetch user's followed stocks and notification status from backend
  useEffect(() => {
    // Make API calls to get user's followed stocks and notification status
    // Example: fetchFollowedStocks(userId).then((data) => setFollowedStocks(data));
    // Example: fetchNotificationStatus(userId).then((data) => setNotificationStatus(data));
    
    // For now, let's assume some sample data
    setFollowedStocks([
      { symbol: 'AAPL', name: 'Apple Inc.' },
      { symbol: 'GOOGL', name: 'Alphabet Inc.' },
    ]);

    setNotificationStatus({
      'AAPL': true,  // Assume the user is notified for Apple Inc.
      'GOOGL': false,  // Assume the user is not notified for Alphabet Inc.
    });
  }, []);

  const handleCompanyNameClick = (stockSymbol) => {
    // Redirect to the corresponding company page
    navigate(`/${stockSymbol}`);
  };

  const handleNotificationClick = (stockSymbol) => {
    // Toggle notification status for the selected stock
    setNotificationStatus((prevStatus) => ({
      ...prevStatus,
      [stockSymbol]: !prevStatus[stockSymbol],
    }));
  };

  return (
    <div>
    <nav className="bg-[#000] p-8">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-[#ff6beb] mb-7">
                    <div className="text-[#ff6beb] text-3xl font-semibold">
                        Stocker
                    </div>
                </Link>
            </div>
        </nav>
        <div className='p-8'>
      <h2 className="text-3xl font-bold mb-4 text-[#ff6beb]">Your Followed Stocks</h2>
      <table className="min-w-full border border-[#ff6beb] mt-4">
        <thead>
          <tr className="text-left">
            <th className="px-2 py-2 border border-[#ff6beb]">Company Name</th>
            <th className="px-2 py-2 border border-[#ff6beb]">Alerts</th>
          </tr>
        </thead>
        <tbody>
          {followedStocks.map((stock) => (
            <tr key={stock.symbol} className="bg-[#292929] text-white">
              <td
                className="px-2 py-2 cursor-pointer hover:underline border-[#ff6beb]"
                onClick={() => handleCompanyNameClick(stock.symbol)}
              >
                {stock.name}
              </td>
              <td className="px-2 py-2 border border-[#ff6beb]">
                <span
                  role="img"
                  aria-label="Notification Bell"
                  className="bell-icon"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleNotificationClick(stock.symbol)}
                >
                  {notificationStatus[stock.symbol] ? '🔔' : '🔕'}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default FollowingPage;