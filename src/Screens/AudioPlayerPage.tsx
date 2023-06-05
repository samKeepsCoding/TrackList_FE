import React, { useEffect, useState } from 'react'
import AudioPlayer from '../Components/AudioPlayer'
import axios from 'axios'
import { CardType } from '../Types'

interface Loop {
    id: number;
    title: string;
    data: string;
}

const AudioPlayerPage: React.FC = () => {
    const [loop, setLoop] = useState<Loop | null>()
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

   useEffect(() => {
    const fetchLoop = async (id: string) => {
        try {
            const res = await axios.get('api/Loop/' + id);
            const loopData =(res.data);
            setLoop(loopData);
            if (loopData?.data) {
                const audioDataUrl = `data:audio/mp3;base64,${loopData.data}`;
                setAudioUrl(audioDataUrl);
            }
            
          } catch (err) {
            console.error("Error fetching loops:", err);
          }
    }

    fetchLoop('8');
    
   },[])
  return (
    <>
    <div className='w-full h-screen flex justify-center items-center'>
        {loop ? (
            <div>
                <h1>{loop.title}</h1>
                {audioUrl && <audio src={audioUrl} controls/>}
            </div>

        ): (<h1>Loading</h1>)}

    </div>
        
    </>
  )
}

export default AudioPlayerPage