import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

// Page Imports

// Component Imports
import NavBar from './Components/NavBar';
import Home from './Screens/Home';


interface Loop {
  id: number;
  title: string;
  data: string;
}

function App() {
  const [loops, setLoops] = useState<Loop[]>([])
  

  useEffect(() => {
    const fetchLoops = async () => {
      try {
        const res = await axios.get('api/Loop');
        setLoops(res.data);
      } catch (err) {
        console.error("Error fetching loops:", err);
      }
    };

    fetchLoops();
    console.log(loops)
  },[])
  return (
    <>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
