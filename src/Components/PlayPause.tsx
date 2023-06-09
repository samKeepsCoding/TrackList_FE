import React, { MouseEventHandler } from 'react';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import { Loop } from '../Types';
import { playPause, setActiveLoop, setCurrentLoops } from '../redux/Features/Player/playerSlice';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';

interface PlayPauseProps {
    isPlaying: boolean;
    activeLoop: Loop | null;
    loop: Loop;
    index: number
    // handlePause: MouseEventHandler;
    // handlePlay: React.MouseEventHandler<SVGElement>;
}

const PlayPause: React.FC<PlayPauseProps> = ({loop, activeLoop, isPlaying, index }) =>  
{
  const dispatch = useDispatch();

  const handlePauseClick = () => {
    dispatch(playPause(false));
    
  };

  const handlePlayClick = () => {
    dispatch(setActiveLoop({loop, index}));
    dispatch(playPause(true));
    console.log(isPlaying)
  };

  return (
    <>
      {isPlaying && activeLoop?.title === loop.title ? (
    
            <FaPauseCircle
                size={25}
                className="text-TLYellow cursor-pointer mr-3"
                onClick={handlePauseClick}
            />
            ): (
                <FaPlayCircle
                size={25}
                className="text-TLYellow mr-3 cursor-pointer hover:scale-125 ease-linear duration-100"
                onClick={handlePlayClick}
              />
      )}
    </>
  )
  
}



export default PlayPause

