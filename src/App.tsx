import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Page Imports
import Home from './Screens/Home';
import Landing from './Screens/Landing';
import SignUp from './Screens/SignUp';
import Login from './Screens/Login';
import AudioPlayerPage from './Screens/AudioPlayerPage';
import ProducerProfile from './Screens/ProducerProfile';

// Component Imports
import NavBar from './Components/NavBar';

// Hooks
import useToken from './Hooks/useToken';
import Footer from './Components/Footer';
import { PlayerState } from './Types';
import MusicPlayer from './Components/MusicPlayer';
import { RootState } from './redux/store';
import UserLikes from './Components/UserLikes';


const App: React.FC = () => {
  const { activeLoop, isActive } = useSelector((state: RootState) => state.player)


  const {token} = useSelector((state: RootState) => state.auth)

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
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
        <Route path='/audioPlayer' element={<AudioPlayerPage/>} />
        <Route path='/producer/:id' element={<ProducerProfile/>}/>
        <Route path='/user/likes/:id' element={<UserLikes/>} />
      </Routes>
      
      {isActive && (
        <div className='sticky h-28 bottom-0 left-0 right-0 flex animate-slideup bg-gradient-to-br from-white/10 to-TLYBlack backdrop-blur-[100px] z-10'>
          <MusicPlayer />
        </div>
      )}

    </BrowserRouter>
  );
}

export default App;
