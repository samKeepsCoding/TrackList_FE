import axios from 'axios';
import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import PlaylistRow from './PlaylistRow';
import AudioPlayer from './AudioPlayer';
import { IoPlay, IoPause } from "react-icons/io5";
import CurrentTrack from './CurrentTrack';
import useAudioPlayer from '../Hooks/useAudioPlayer';

interface PlaylistProps {
  id: string;
};

interface Loop {
    title: string;
    data: string
}



const ProducerPlaylist: React.FC<PlaylistProps> = ({ id }) => {

  const [producerLoops, setProducerLoops] = useState<Loop[]>([]);
  const [currentTrack, setCurrentTrack] = useState<Loop>()

  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  const { id: producerId } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchProducerLoops = async (userId: string) => {
      try {
        const res = await axios.get(`/api/Loop/userLoops/${userId}`);
        console.log(res.data)
        setProducerLoops(res.data);
        console.log("fetcheeeed");
      } catch (err) {
        console.error("Error fetching loops:", err);
      }
    };

    if (producerId) {
      fetchProducerLoops(producerId);
    }

  }, [producerId]);

  const handlePlay = (track: Loop) => {
    setCurrentTrack(track);
  };


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
                {producerLoops ? producerLoops.map((loop, index) => (
                    <tr key={index}>
                        <td className='text-start flex items-center '>
                            <IoPlay 
                                size={15} 
                                className='mr-2'
                                onClick={() => handlePlay(loop)}
                            />
                            {loop.title}
                        </td>
                        <td className=''>F# min</td>
                        <td>134</td>
                    </tr>
                )) : (<p>Loading...</p>)}
            </tbody>
        </table>
        {currentTrack ? (
            <CurrentTrack track={currentTrack}/>
        ): null}
    </>
  );
};

export default ProducerPlaylist;
