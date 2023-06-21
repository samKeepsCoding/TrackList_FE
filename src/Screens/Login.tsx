import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css'
import { FiChevronRight } from 'react-icons/fi'
import background from '../Assets/producing.jpg';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import loginUser from '../api/login'
import { loginRequest, loginSuccess } from '../redux/Features/Auth/authSlice';





const Login: React.FC = () => {

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errMsg, setErrMsg] = useState<string>('');

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(loginRequest());

    try{
      const response = await loginUser({
        username,
        password,
      });

      if (response.status === 200) {
        const dataString = await response.text();

        const data = JSON.parse(dataString);
        dispatch(loginSuccess({token: data.token, userId: data.id}))

        navigate('/home')

      } else {
        const data = await response.text();
        console.log(data);
        setErrMsg(data);
      }
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  }

  return (
    <>
      <section 
        className="relative w-full h-screen flex justify-center items-center bg-center bg-cover px-4 "
        style={{ backgroundImage: `url(${background})` }}
      >

      <div className='absolute top-0 left-0 w-full h-full opacity-60 bg-TLBlack'></div>

        <div className='bg-white w-full flex justify-center items-center max-w-md md:max-w-4xl z-30 text-TLBlack rounded-md h-auto md:h-3/4 flex-row-reverse bg-transparent'>

          {/* Left Side of Card */}
          <div 
            className='relative justify-center items-center w-1/2 h-full bg-cover bg-center z-30 hidden md:flex rounded-r-md'
            style={{ backgroundImage: `url(${background})` }}
          >
              <p>.</p>
          </div>

          {/* Right Side of Card */}
          <form
            className='flex flex-col justify-center items-start w-full h-full md:w-1/2 p-4 md:p-8 space-y-2 md:space-y-4 bg-TLYellow rounded-md md:rounded-l-md md:rounded-r-none'
            onSubmit={handleSubmit}
          >
            <h1 className='text-center md:text-start w-full text-3xl md:text-6xl font-bold mb-0 md:mb-8'>Login</h1>
            {/* <label className='text-xl md:text-2xl'>
              Username:
            </label> */}
            <input placeholder='Username' type='text' name='userName' value={username} onChange={(e) => setUsername(e.target.value)} className='formInput mb-3'
            />
            {/* <label className='text-xl md:text-2xl'>
              Password:
            </label> */}
            <input placeholder='Password' type='password' name='password' value={password} onChange={e => setPassword(e.target.value)} className='formInput'
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
                <div className='border-t-[0.8px] w-full border-TLBlack'></div>
                <span className='text-xs whitespace-nowrap'>
                Already have an account? 
                  <a href="/register" className='text-sm font-medium text-[#CC1F5D]'> SIGN UP</a>
                </span>
                <div className='border-t-[0.8px] w-full border-TLBlack'></div>
              </div>
            </div>
          </form>
        </div>
      </section>
      
    </>
  )
}

export default Login