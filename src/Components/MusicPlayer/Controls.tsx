import React, { MouseEventHandler } from 'react';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { BsArrowRepeat, BsFillPauseFill, BsFillPlayFill, BsShuffle } from 'react-icons/bs';
import { Loop } from '../../Types';
import { useDispatch, useSelector } from 'react-redux';
import { nextLoop, playPause, prevLoop } from '../../redux/Features/Player/playerSlice';
import { RootState } from '../../redux/store';

interface ControlsProps {
    isPlaying: boolean,
    handlePlayPause: MouseEventHandler<SVGElement>,
    repeat: boolean,
    setRepeat: React.Dispatch<React.SetStateAction<boolean>>,
    currentLoops: Loop[]
}

const Controls : React.FC<ControlsProps> = ({isPlaying, handlePlayPause, repeat, setRepeat, currentLoops}) => {
  const dispatch = useDispatch();
  const currentIndex = useSelector((state: RootState) => state.player.currentIndex)
  
  const handleNextLoop = () => {
    dispatch(playPause(false));
    dispatch(nextLoop(currentIndex))
    dispatch(playPause(true));
  };

  const handlePrevLoop = () => {
      dispatch(playPause(false))
      dispatch(prevLoop(currentIndex))
      dispatch(playPause(true))

  }

  return (
    <div className='flex items-center justify-around md:w-36 lg:w-52 2xl:w-80'>
        {currentLoops?.length && <MdSkipPrevious size={30} color="#FFF" className="cursor-pointer" onClick={handlePrevLoop} />}
        {isPlaying ? (
            <BsFillPauseFill size={45} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
            ) : (
            <BsFillPlayFill size={45} color="#FFF" onClick={handlePlayPause} className="cursor-pointer" />
        )}
        {currentLoops?.length && <MdSkipNext size={30} color="#FFF" className="cursor-pointer" onClick={handleNextLoop} />}
        {/* Todo make shuffle and repeat functionallity  */}
    </div>
  )
}

export default Controls