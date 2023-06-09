import React, {useRef, useEffect, ReactEventHandler} from 'react'
import { Loop } from '../../Types';
import { useDispatch } from 'react-redux';
import { playPause } from '../../redux/Features/Player/playerSlice';

interface PlayerProps {
    isPlaying: boolean,
    volume: number,
    seekTime: number,
    activeLoop: Loop | null,
    repeat: boolean,
    // onEnded: React.ReactEventHandler<HTMLAudioElement>,
    currentIndex: number
}

const Player: React.FC<PlayerProps> = ({isPlaying, volume, seekTime, activeLoop, repeat, currentIndex}) => {

    const ref = useRef<HTMLAudioElement>(null);
        

    useEffect(() => {

        if (ref.current?.volume) {
            ref.current.volume = volume;
        }
    },[volume])

    useEffect(() => {
        if (ref.current) {
            ref.current.currentTime = seekTime;
        }
    },[seekTime]);

    useEffect(() => {
        if(ref.current && isPlaying) {
            ref.current.play()
        } else if (ref.current && !isPlaying) {
            ref.current?.pause();
        }
    }, [isPlaying, activeLoop])





    // useEffect(() => {
    //     if (ref.current) {
    //       ref.current.addEventListener('ended', onEnded);
    //       return () => {
    //         ref.current!.removeEventListener('ended', onEnded);
    //       };
    //     }
    //   }, [onEnded]);


  return (
    <audio
        ref={ref}
        src={`data:audio/mp3;base64,${activeLoop?.data}`}
        loop={repeat}
        // onEnded={onEnded}
    />
  )
}

export default Player;