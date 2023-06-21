import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { useParams } from 'react-router-dom';
import AudioPlayer from './AudioPlayer';

import { IoPlay, IoPause } from "react-icons/io5";
import CurrentTrack from './CurrentTrack';
import useAudioPlayer from '../Hooks/useAudioPlayer';
import ProducerPlaylistRow from './ProducerPlaylistRow';

import { playPause, setActiveLoop, setCurrentLoops } from '../redux/Features/Player/playerSlice';
import { PlayerState } from '../Types';
import { useGetProducerLoopsQuery } from '../redux/Services/tracklistCore';
import { RootState } from '../redux/store';

interface PlaylistProps {
  producerId: string;
};

interface Loop {
    title: string;
    data: string;
    userId: number;
    id: number;
}

const ProducerPlaylist: React.FC<PlaylistProps> = ({ producerId }) => {

    // const [producerLoops, setProducerLoops] = useState<Loop[]>([]);

    // const { id: producerId } = useParams<{ id: string }>();

    const { isPlaying} = useSelector((state: RootState) => state.player)
    const dispatch = useDispatch();

    const { data: producerLoops, isLoading, isError } = useGetProducerLoopsQuery(producerId);

    useEffect(() => {
        if (producerLoops) {
            dispatch(setCurrentLoops(producerLoops))

        }
    },[producerLoops, dispatch])


    if (isLoading) {
        return <p>Loading</p>
    }

    if (isError) {
        return <p>Error occured while fetching producer loops</p>
    }
   
  return (
    <> 
        <table className='table-auto w-full text-center font-thin border-separate border-spacing-2'>
            <thead>
            <tr className=' text-sm font-thin '>
                <th className='text-start'>TITLE</th>
                <th>KEY</th>
                <th>BPM</th>
                <th></th>
            </tr>
            </thead>
            <tbody className='space-y-6'>
                {producerLoops ? producerLoops.map((loop, index: number) => (
                    <>
                    
                        <ProducerPlaylistRow key={loop.id} loop={loop} isPlaying={isPlaying} index={index}/>
                    
                    </>
            )) : (<p>Loading...</p>)}
            </tbody>
        </table>
        {/* {currentTrack ? (
            <CurrentTrack track={currentTrack}/>
        ): null} */}
    </>
  );
};

export default ProducerPlaylist;
