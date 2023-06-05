
import { useNavigate } from 'react-router-dom';
import '../Styles/home.css';

const HomeSideBar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate('/');
  }
  return (
    <>
        <aside className='w-[260px] h-screen hidden md:flex justify-center  bg-TLYellow text-TLBlack'>
            <button 
              className=""
              onClick={logout}
            >
              Logout
            </button>
        </aside>
    </>
  )
}

export default HomeSideBar