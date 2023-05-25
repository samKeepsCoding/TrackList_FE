import React from 'react';
import { useNavigate } from 'react-router-dom';
import useToken from '../Hooks/useToken';
import Login from './Login';
import Landing from './Landing';
import HomeMainContent from '../Components/HomeMainContent';
import HomeSideBar from '../Components/HomeSideBar';


const Home: React.FC = () => {
  const {token, setToken} = useToken();

  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/');
  }

  if (!token) {
    return <Landing />;
  } else {
  
      return (
        <>
          <div className='w-full h-screen flex justify-center items-center '>
            <HomeSideBar/>
            <HomeMainContent/>
          </div>
        </>
      )
  }

};

export default Home;