// FollowingPage.jsx

import React, { useState, useEffect } from 'react';

const FollowingPage = () => {
  const [followedStocks, setFollowedStocks] = useState([]);

  // Fetch user's followed stocks from backend
  useEffect(() => {
    // Make an API call to get user's followed stocks
    // Update the followedStocks state
    // Example: fetchFollowedStocks(userId).then((data) => setFollowedStocks(data));
  }, []);

  const handleNotificationClick = (stockSymbol) => {
    // Handle notification click, e.g., show a notification modal
    // You may also want to implement a backend service for sending notifications
  };

  return (
    <div>
      <h2>Your Followed Stocks</h2>
      <ul>
        {followedStocks.map((stock) => (
          <li key={stock.symbol}>
            {stock.name}
            <span
              role="img"
              aria-label="Notification Bell"
              style={{ marginLeft: '10px', cursor: 'pointer' }}
              onClick={() => handleNotificationClick(stock.symbol)}
            >
              🔔
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowingPage;
