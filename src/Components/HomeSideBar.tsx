
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
        <aside className='w-1/4 h-full hidden md:flex justify-center items-center bg-TLYellow text-TLBlack'>
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