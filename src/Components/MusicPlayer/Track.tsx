import React from 'react'
import { PlayerState } from '../../Types'
import example from '../../Assets/musicproducer.jpg'



const Track: React.FC<PlayerState> = ({isPlaying, activeLoop, isActive, currentIndex}) => {
  return (
    <div className='flex-1 flex items-center justify-start w-full max-w-5xl'>
        <div className={`${isPlaying && isActive ? 'animate-[spin_3s_linear_infinite]' : ''} hidden sm:flex h-16 w-16 mr-4 justify-center`}>
            <img src={example} alt="Active Track" className='rounded-full '/>
        </div>
        <div className='w-1/2'>
            <p className="truncate text-white font-bold text-lg">
                {activeLoop?.title ? activeLoop?.title : 'No active Song'}
            </p>
            {/* <p>{currentIndex}</p> */}
        </div>
    </div>
  )
}

export default Track