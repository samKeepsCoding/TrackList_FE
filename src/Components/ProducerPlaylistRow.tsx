import React, { useEffect } from 'react'
import { Loop } from '../Types'
import { IoPause, IoPlay } from 'react-icons/io5';
import PlayPause from './PlayPause';
import { useDispatch, useSelector } from 'react-redux';
import { playPause, setActiveLoop } from '../redux/Features/Player/playerSlice';
import { RootState } from '../redux/store';


interface PlaylistRowProps {
    loop: Loop;
    isPlaying: boolean;
    key: number,
    index: number

}


const ProducerPlaylistRow: React.FC<PlaylistRowProps> = ({loop, isPlaying, key, index}) => {
    const dispatch = useDispatch();
    const activeLoop  = useSelector((state: RootState) => state.player.activeLoop)

    

    //   useEffect(() => {
    //     console.log(activeLoop);
    //   }, [activeLoop])

      

  return (
    <tr key={key}>
        <td className='text-start flex items-center '>
            <PlayPause isPlaying={isPlaying} activeLoop={activeLoop} loop={loop} index={index} />

                {loop.title}
                {/* Todo */}
                {index}
        </td>
        <td>f# min</td>
        <td>134</td>
    </tr>
  )
}

export default ProducerPlaylistRow