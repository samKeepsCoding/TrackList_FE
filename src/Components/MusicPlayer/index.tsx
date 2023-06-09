import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Track from './Track';
import Controls from './Controls';
import { playPause, nextLoop, prevLoop } from '../../redux/Features/Player/playerSlice';
import { PlayerState } from '../../Types';
import { RootState } from '../../redux/store';
import ProgressBar from './ProgressBar';
import { min } from 'wavesurfer.js/src/util';
import Player from './Player';




const MusicPlayer = () => {
    const { activeLoop, isPlaying, isActive, currentLoops, currentIndex} = useSelector((state: RootState) => state.player);


    const [seekTime, setSeekTime] = useState(0);
    const [appTime, setAppTime] = useState(0);
    const [volume, setVolume] = useState(0.3);
    const [repeat, setRepeat] = useState(false);
    const [shuffle, setShuffle] = useState(false);
    const [duration, setDuration] = useState(0)

    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(playPause(true))
    // }, [])

    const handlePlayPause = () => {
        if (!isActive) return;
        
        if (isPlaying) {
            dispatch(playPause(false))
            console.log("was Playing now not")
        } else {
            dispatch(playPause(true))
            console.log("wasn't play now is ")
        }
    };




  return (
    <div className='relative w-full flex items-center justify-center sm:px-12 px-8'>
        <Track isPlaying={isPlaying} activeLoop={activeLoop} isActive={isActive} currentLoops={currentLoops} currentIndex={currentIndex}/>
        <div className='flex-1 flex flex-col items-center justify-center'>
            <Controls 
                  isPlaying={isPlaying}
                  repeat={repeat}
                  setRepeat={setRepeat}
                  handlePlayPause={handlePlayPause}
                  currentLoops={currentLoops}            
            />
            <ProgressBar
                onInput={(e: any) => setSeekTime(e.target.value)} value={appTime} min={0} max={duration}           
            />
            <Player 
                isPlaying={isPlaying} 

                volume={volume} 
                seekTime={seekTime} 
                activeLoop={activeLoop} 
                repeat={repeat} 
                // onEnded={handleNextLoop}
                currentIndex={currentIndex}
                          
            />
        </div>
    </div>
  )
}

export default MusicPlayer