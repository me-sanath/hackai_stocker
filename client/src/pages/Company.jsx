import React from 'react';
import { useParams } from 'react-router-dom';

const Company = ({match}) => {
    const { companyName } = useParams();
  
    return (
      <div>
        <h1>{companyName} Stock Details</h1>
        {/* Display stock details here */}
      </div>
    );
}

export default Company
