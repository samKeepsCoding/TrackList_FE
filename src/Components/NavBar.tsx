import React from 'react'

const NavBar = () => {
  return (
    <>
       <header className='flex flex-row items-center justify-center p-4 px-8 w-full'>
            <nav className='flex flex-row justify-between items-center w-full'>
                <h1 className='font-bold text-3xl lg:text-4xl'>TrackList<span className='text-TLYellow'>.</span></h1>
            </nav>
        </header> 
    </>
  )
}

export default NavBar