import React from 'react'
import { Loop } from '../../Types';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import PlayPause from '../PlayPause';

interface PlaylistTrackProps {
  loop: Loop;
  index: number;
  isPlaying: boolean;
  key: number;



}

const PlaylistTrack: React.FC<PlaylistTrackProps> = ({loop, index, isPlaying, key}) => {

  const activeLoop = useSelector((state: RootState) => state.player.activeLoop)
  return (

    <tr key={key}>
      <td className='text-start flex items-center'>
        <PlayPause isPlaying={isPlaying} activeLoop={activeLoop} loop={loop} index={index}/>
          {loop.title}
      </td>
      <td>f# min</td>
      <td>134</td>
    </tr>
  )
}

export default PlaylistTrack;