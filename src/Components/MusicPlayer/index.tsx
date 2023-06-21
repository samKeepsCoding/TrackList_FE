import React, { useEffect, useState, useRef, HTMLInputTypeAttribute } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Track from './Track';
import Controls from './Controls';
import { playPause, nextLoop, prevLoop } from '../../redux/Features/Player/playerSlice';
import { PlayerState } from '../../Types';
import { RootState } from '../../redux/store';
import '../../Styles/musicPlayer.css'
import AudioPlayer from '../AudioPlayer';





const MusicPlayer = () => {
    const { activeLoop, isPlaying, isActive, currentLoops, currentIndex} = useSelector((state: RootState) => state.player);


    const [currentTime, setCurrentTime] = useState(0);
    const [repeat, setRepeat] = useState(false);
    const [duration, setDuration] = useState(0)

    const dispatch = useDispatch();

    // References
    const audioRef = useRef<HTMLAudioElement>(null);
    const progressBarRef = useRef<HTMLInputElement>(null);
    const animationRef = useRef<any>(null)

    useEffect(() => {
        if(audioRef.current && isPlaying) {
            audioRef.current.play();
            animationRef.current = requestAnimationFrame(whilePlaying)
        } else if (audioRef.current && !isPlaying) {
            audioRef.current?.pause();
            cancelAnimationFrame(animationRef.current)
        }
    }, [isPlaying, activeLoop]);

    useEffect(() => {
        if (audioRef.current && progressBarRef.current) {
            const seconds = Math.floor(audioRef.current?.duration);
            setDuration(seconds);
            progressBarRef.current.max = seconds.toString()
        }
    }, [audioRef?.current?.onloadedmetadata, audioRef?.current?.readyState])

    const handlePlayPause = () => {
        if (!isActive) return;
        
        if (isPlaying) {
            dispatch(playPause(false))
        } else {
            dispatch(playPause(true))
            console.log("wasn't play now is ")
        }
    };

    const changePlayerCurrentTime = () => {
        if (progressBarRef.current) {
            const value = Number(progressBarRef.current.value);
            const width = `${(value / duration) * 100}%`;
            progressBarRef.current.style.setProperty('--seek-before-width', width as string);
            setCurrentTime(Number(progressBarRef.current.value));
        }
    };
    
      const changeRange = () => {
        if (audioRef.current && progressBarRef.current) {
          audioRef.current.currentTime = Number(progressBarRef.current.value);
          changePlayerCurrentTime();
        }
      };
      

    const whilePlaying = () => {
        if (progressBarRef.current && audioRef.current) {
            progressBarRef.current.value = audioRef.current.currentTime.toString();
            animationRef.current = requestAnimationFrame(whilePlaying);
        }
    };

    const calculateTime = (secs: number) => {
        const minutes = Math.floor(secs / 60);
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
        return `${returnedMinutes}:${returnedSeconds}`;
    };


  return (
    <div className='relative w-full flex items-center justify-center sm:px-12 px-4 text-sm'>
        <Track isPlaying={isPlaying} activeLoop={activeLoop} isActive={isActive} currentLoops={currentLoops} currentIndex={currentIndex}/>
        <div className='flex-1 flex flex-col items-center justify-center'>
            <Controls 
                  isPlaying={isPlaying}
                  repeat={repeat}
                  setRepeat={setRepeat}
                  handlePlayPause={handlePlayPause}
                  currentLoops={currentLoops}            
            />
            <div className='flex justify-center items-center space-x-4'>
                {/* Current Time */}
                <div>
                    {calculateTime(currentTime)}
                </div>
                {/* Progress Bar */}

                    <input 
                        type='range' 
                        className='progressBar' 
                        defaultValue='0'
                        ref={progressBarRef}
                        onChange={changeRange}

                    />

                {/* Audio */}
                <audio
                    ref={audioRef}
                    src={`data:audio/mp3;base64,${activeLoop?.data}`}
                    preload="metadata"
                    onChange={changeRange}
                />

                {/* Duration */}
                <div >{(duration && !isNaN(duration)) && calculateTime(duration)}</div>
            </div>
        </div>
    </div>
  )
}

export default MusicPlayer