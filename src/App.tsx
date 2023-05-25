import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Page Imports
import Home from './Screens/Home';
import Landing from './Screens/Landing';
import SignUp from './Screens/SignUp';
import Login from './Screens/Login';

// Component Imports
import NavBar from './Components/NavBar';

// Hooks
import useToken from './Hooks/useToken';
import Footer from './Components/Footer';

const App: React.FC = () => {
  const { token, setToken } = useToken();
  

  

  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path='/home'
          element={
            token ? (
              <Home/>
            ) : (
              <Navigate to='/' replace={true} state={{ from: '/home'}} />
            )
          }
        />
        
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>

      <Footer/>
    </BrowserRouter>
  );
}

export default App;
