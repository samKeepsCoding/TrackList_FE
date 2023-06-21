import React from 'react'
import { Loop } from '../../Types'
import PlaylistTrack from './PlaylistTrack'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

interface MusicPlayerProps {
    loops: Loop[] | null,
}

const MusicPlaylist: React.FC<MusicPlayerProps> = ({loops}) => {

    const { isPlaying } = useSelector((state: RootState) => state.player)
  return (
    <>
        <table className='table-auto w-full text-center font-thin border-separate border-spacing-2'>
            <thead>
                <tr className='text-sm font-thin'>
                    <th className='text-start'>TITLE</th>
                    <th>KEY</th>
                    <th>BPM</th>
                    <th></th>
                </tr>
            </thead>

            <tbody className='space-y-6'>
                {loops ? loops.map((loop: Loop, index: number) => (
                    <PlaylistTrack key={loop.id} loop={loop} index={index} isPlaying={isPlaying} />
                )): <p>Loading...</p>}
            </tbody>
        </table>
    </>
  )
}

export default MusicPlaylist