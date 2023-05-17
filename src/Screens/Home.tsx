import React from 'react';
import useToken from '../Hooks/useToken';
import Login from './Login';


const Home: React.FC = () => {
  const {token, setToken} = useToken();

  if (token) {
    return <Login setToken={setToken} />;
  } else {

      return <div>Home</div>;
  }

};

export default Home;