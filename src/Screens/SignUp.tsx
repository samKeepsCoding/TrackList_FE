import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'
import { FiChevronRight } from 'react-icons/fi'


import background from '../Assets/musicproducer.jpg';

interface RegisterFormData {
  userName: string;
  password: string;
}

const SignUp: React.FC = () => {

  const [formData, setFormData] = useState<RegisterFormData>({
    userName: '',
    password: '',
  })

  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/Auth/register', {
        method: 'POST',
        headers: {
          'Content-Type' : 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (!response.ok) {
        console.log(response);
        throw new Error('Network response was not ok');
      }

      // Success, handle response here
      console.log('User registered successfully!');
      navigate('/login');
    } catch (e) {
      console.error("There was an error registering the user:", e)
    }
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({...prevState, [name]: value}));
  };

  return (
    <>
      <section 
        className="relative w-full h-screen flex justify-center items-center bg-center bg-cover px-4 "
        style={{ backgroundImage: `url(${background})` }}
      >

      <div className='absolute top-0 left-0 w-full h-full opacity-60 bg-TLBlack'></div>

        <div className='bg-white w-full flex justify-center items-center max-w-md md:max-w-4xl z-30 text-TLBlack rounded-md h-auto md:h-3/4'>

          {/* Left Side of Card */}
          <div 
            className='relative justify-center items-center w-1/2 h-full bg-cover bg-center z-30 hidden md:flex'
            style={{ backgroundImage: `url(${background})` }}
          >
              <p>.</p>
          </div>

          {/* Right Side of Card */}
          <form
            className='flex flex-col justify-center items-start w-full max-w- h-full md:w-1/2 p-4 md:p-8 space-y-2 md:space-y-4 bg-TLYellow'
            onSubmit={handleSubmit}
          >
            <h1 className='text-center md:text-start w-full text-3xl md:text-6xl font-bold mb-0 md:mb-8'>Sign Up</h1>
            <input placeholder='Username' type='text' name='userName' value={formData.userName} onChange={handleChange} className='formInput mb-3'
            />
            <input placeholder='Password' type='password' name='password' value={formData.password} onChange={handleChange} className='formInput'
            />
            <div className='w-full flex flex-col justify-center items-center mt-32'>
              <button 
                className='relative rounded-sm flex justify-center w-full py-3 mt-8 text-xl md:text-2xl font-semibold text-white hover:text-TLYellow bg-TLBlack hover:border-2-black'
                type='submit'
              >
                Continue 
                <FiChevronRight size={15} className='absolute top-1/2 right-3 transform -translate-x-1/2 -translate-y-1/2' /> 
              </button> 


                <div className='flex items-center justify-center p-6 space-x-3 text-black w-full'>
                  <div className='border-t-[0.8px] w-full border-TLBlack md:border-TLBlack'></div>
                  <span className='text-xs whitespace-nowrap'>
                  Don't have an account? 
                    <a href="/login" className='text-sm font-medium text-[#CC1F5D]'> LOGIN</a>
                  </span>
                  <div className='border-t-[0.8px] w-full border-TLBlack md:border-TLBlack'></div>
                </div>
              </div>
          </form>
        </div>
      </section>
    </>
  )
}

export default SignUp