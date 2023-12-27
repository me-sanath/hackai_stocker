import React from 'react'
import Home from './pages/Home';
import Company from './pages/Company';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const App = () => {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path="/:companyName" element={<Company />} />
          </Routes>
        </BrowserRouter>
      </>
  );
};

export default App
