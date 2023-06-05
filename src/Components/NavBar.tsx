import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import useToken from '../Hooks/useToken';

const NavBar = () => {

    const [navVisible, setNavVisible] = useState<Boolean>(true);
    const [prevScrollPos, setPrevScrollPos] = useState<Number>(0);


    
    const [token, setToken] = useState<String | null>("");

    const variants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: "-100%" },
      }

    

    useEffect(() => {
        const handleScroll = () => {
            
            const currentScrollPos : Number = window.pageYOffset;
            if (prevScrollPos > currentScrollPos) {
                setNavVisible(true)
            } else {
                setNavVisible(false)
            }
            setPrevScrollPos(currentScrollPos)
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);

    }, [prevScrollPos]);

    useEffect(() => {
        const handleLogin = () => {
            if (localStorage.getItem("token")) {
                setToken(localStorage.getItem("token"))
            } else {
                setToken("");
            }
        }
    })
  return (
    <>
       <motion.header 
            className='flex flex-row items-center justify-center p-4 px-8 w-full bg-black fixed z-30'
            initial='open'
            animate={navVisible ? 'open' : 'closed'}
            variants={variants}
            transition={{duration: 0.2}} 
        >
            <nav className='flex flex-row justify-between items-center w-full'>
                <a 
                    className='font-bold text-3xl lg:text-4xl'
                    href='/home'
                >
                        TrackList<span className='text-TLYellow'>.</span>
                </a>
                <div className="ml-auto flex justify-center items-center ">
                    <a href="/login">
                        Login
                    </a>
                </div>
            </nav>
        </motion.header> 
    </>
  )
}

export default NavBar