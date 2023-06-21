
import { useNavigate } from 'react-router-dom';
import '../Styles/home.css';
import { useDispatch } from 'react-redux';
import { makeInactive } from '../redux/Features/Player/playerSlice';
import { logout } from '../redux/Features/Auth/authSlice';
import { AiFillHome, AiFillHeart } from 'react-icons/ai'
import '../Styles/sideBar.css'


const HomeSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const userId = localStorage.getItem("id");

  const logoutUser = () => {
    localStorage.clear();
    dispatch(makeInactive());
    dispatch(logout())
    navigate('/');
  }

  return (
    <>
        <aside className='w-[260px] min-h-screen hidden md:flex flex-col  bg-TLYellow text-TLBlack sticky text-xl font-semibold pt-24'>
            <a href='/home'>
              <div 
                className='sideBar-links'
              >
                <AiFillHome size={30}/>
                <p>HOME</p>
              </div>
            </a>
              <div 
                className='sideBar-links'
                onClick={() => navigate('/user/likes/' + userId?.toString())}
              >
                <AiFillHeart size={30}/>
                <p>LIKES</p>
              </div>

            <button 
              className=""
              onClick={logoutUser}
            >
              Logout
            </button>
        </aside>
    </>
  )
}

export default HomeSideBar