import {useEffect, useState} from 'react';



const useAudioPlayer = (audioElement: any) => {

    const [playerState, setPlayerState] = useState({
        isPlaying: true,
        progress: 0,
        speed: 1,

    });

    const handlePlay = () => {
        setPlayerState({
            ...playerState,
            isPlaying: !playerState.isPlaying,
        })
    };

    useEffect(() => {
        playerState.isPlaying 
        ? audioElement.current.play() 
        : audioElement.current.pause();
    }, []);

    const handleOnTimeUpdate = () => {
        const progress = (audioElement.current.currentTime / audioElement.current.duration) * 100 ;
        setPlayerState({
            ...playerState,
            progress
        })
    };

    const handleAudioProgress = (event: React.ChangeEvent<HTMLInputElement>) => {
        const manualChange = Number(event.target.value);
    
        if (!isNaN(manualChange)) {
            const currentTime = (audioElement.current.duration / 100) * manualChange;
            audioElement.current.currentTime = currentTime;
            setPlayerState({
                ...playerState,
                progress: manualChange,
            });
        }
    };

    const handleAudioSpeed = (event: any) => {
        const speed = Number(event.target.value);
        audioElement.current.playbackRate = speed;
        setPlayerState({
            ...playerState,
            speed,
        })
    };



    return {
        playerState,
        handlePlay,
        handleOnTimeUpdate,
        handleAudioProgress,
        handleAudioSpeed,
    }
};

export default useAudioPlayer;