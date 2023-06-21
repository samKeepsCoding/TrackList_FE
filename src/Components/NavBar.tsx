import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import useToken from '../Hooks/useToken';
import profilePicture from '../Assets/musicproducer.jpg'
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const NavBar = () => {

    const [navVisible, setNavVisible] = useState<Boolean>(true);
    const [prevScrollPos, setPrevScrollPos] = useState<Number>(0);

    const variants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: "-100%" },
      }

    const { token } = useSelector((state: RootState) => state.auth)

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
        console.log(token)
    },[token])

  return (
    <>
       <motion.header 
            className='flex flex-row items-center justify-center p-4 px-8 w-full bg-black sticky z-30'
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
                {token ? (
                    <img src={profilePicture} alt="" className="h-12 w-12 rounded-full ml-auto"/>
                ): (
                    <div className="ml-auto flex justify-center items-center ">
                        <a href="/login">
                            Login
                        </a>
                    </div>
                )}
            </nav>
        </motion.header> 
    </>
  )
}

export default NavBar