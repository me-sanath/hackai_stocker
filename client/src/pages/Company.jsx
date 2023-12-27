import React from 'react'

const Company = ({match}) => {
    const { companyName } = match.params;
  
    return (
      <div>
        <h1>{companyName} Stock Details</h1>
        {/* Display stock details here */}
      </div>
    );
}

export default Company
