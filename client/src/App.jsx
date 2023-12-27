// App.jsx

import React from 'react'
import Home from './pages/Home';
import Company from './pages/Company';
import Login from './pages/Login';
import Signup from './pages/Signup';
import FollowingPage from './pages/FollowingPage'; // Update the import here
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './authContext';

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path="/:companyName" element={<Company />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Signup />} />
          <Route path="/profile" element={<FollowingPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
