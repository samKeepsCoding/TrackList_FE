import React from 'react';

const NavBar = () => {
  return (
    <>
       <header className='flex flex-row items-center justify-center p-4 px-8 w-full'>
            <nav className='flex flex-row justify-between items-center w-full'>
                <h1 className='font-bold text-3xl lg:text-4xl'>TrackList<span className='text-TLYellow'>.</span></h1>
                <div className='ml-auto flex items-center space-x-3 text-md  md:text-xl'>
                    <a href='/login'>
                        Login
                    </a>
                    <span>/</span>
                    <a href='/register'>
                        <button className='rounded-full py-[.1rem] px-3 bg-white text-TLBlack hover:bg-transparent hover:text-white md:hover:border-TLyellow border-2'>
                            Try free
                        </button>
                    </a>
                </div>
            </nav>
        </header> 
    </>
  )
}

export default NavBar