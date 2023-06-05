import React, { useEffect, useRef, useState } from 'react';
import Wavesurfer from 'wavesurfer.js';
import '../Styles/audioPlayer.css'
import { IoPlay, IoPause } from "react-icons/io5";

type AudioPlayerProps = {
    audioData: string;
    wavHieght: number;
  };

const AudioPlayer: React.FC<AudioPlayerProps> = ({audioData, wavHieght}) => {

    const wavesurferRef = useRef<WaveSurfer | null>(null);

    // Create Wavesurfer instance
    const [wavesurferObj, setWavesurferObj] = useState();

    const [playing, setPlaying] = useState(false) // to keep track whether audio is currently playing or not
    const [volume, setVolume] = useState(1); // to control volume level of the audio. 0-mute, 1-max
    const [duration, setDuration] = useState(0); // duration is used to set the default region of selection for trimming the audio
    const [audioUrl, setAudioUrl] = useState<string>('');

    useEffect(() => {
        
        const wavesurfer = Wavesurfer.create({
            container: '#waveform',
            waveColor: '#FEE715',
            progressColor: '#101820',
            cursorColor: 'black',
            barWidth: 3,
            barRadius: 3,
            cursorWidth: 1,
            height: wavHieght,
            barGap: 3,
            hideScrollbar: true,
            
        });

        // Load audio data
        
        const url = `data:audio/mp3;base64,${audioData}`
        setAudioUrl(url);

          wavesurfer.load(url);
          wavesurferRef.current = wavesurfer;

        

        return () => {
            if (wavesurferRef.current) {
                wavesurferRef.current.destroy();
            }
        };
    }, [audioData]);

    const handlePlay = () => {
        if(wavesurferRef.current) {
            wavesurferRef.current.play();
            setPlaying(true);
        }
    }

    const handlePause = () => {
        if (wavesurferRef.current) {
            wavesurferRef.current.pause();
            setPlaying(false)
        }
    }


  return (
    <>
        <div className='flex flex-col w-full text-TLBlack p-4' >
                <div id="waveform" />
            <div className='flex w-full h-full justify-center items-center '>
                {!playing ? (
                    <IoPlay onClick={handlePlay} size={50} className='md:hover:scale-125 cursor-pointer ease-in-out duration-100 ml-2'/>
                ): (
                    <IoPause onClick={handlePause} size={50} className='md:hover:scale-125 cursor-pointer ease-in-out duration-100'/>
                )}
            </div>
        </div>
    </>
  )
}

export default AudioPlayer