import React, { useEffect, useRef } from 'react'
import useAudioPlayer from '../Hooks/useAudioPlayer';

interface CurrentTrackProps {
    track: {
        title: string;
        data: string;
    };
}

const CurrentTrack: React.FC<CurrentTrackProps> = ({track}) => {

    const audioElement = useRef<HTMLAudioElement>(null);
    

    const {
      playerState,
      handlePlay,
      handleOnTimeUpdate,
      handleAudioProgress,
      handleAudioSpeed
    } = useAudioPlayer(audioElement);
    
    useEffect(() => {
        if (audioElement.current) {
          audioElement.current.load();
        }
      }, [track]);
  return (
    <div className='w-screen z-10 fixed bottom-0 bg-pink-100 h-[100px] text-center'>
        <audio ref={audioElement}  onTimeUpdate={handleOnTimeUpdate} controls src={'data:audio/mp3;base64' + track.data}>
            
        </audio>
        <h1>{track.title}</h1>
        <button onClick={handlePlay}>{playerState.isPlaying ? 'Pause' : 'Play'}</button>
        <div className="track-progress">
          <input
            type="range"
            min="0"
            max="100"
            value={playerState.progress}
            onChange={(e) => handleAudioProgress(e)}
          />
        </div>
    </div>
  )
}

export default CurrentTrack