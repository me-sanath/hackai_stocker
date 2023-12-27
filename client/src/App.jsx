import React from 'react'
import Home from './pages/Home';
import Company from './pages/Company';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const App = () => {
  return (
      <>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path='/home' element={<Home />} />
            <Route path="/:companyName" element={<Company />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </>
  );
};

export default App
