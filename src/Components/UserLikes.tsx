import React, { useEffect } from 'react'
import { useGetUserProfileQuery } from '../redux/Services/tracklistCore';
import { useParams } from 'react-router-dom';
import HomeSideBar from './HomeSideBar';
import '../index.css'
import MusicPlaylist from './MusicPlaylist';


const UserLikes= () => {
    const { id: userId } = useParams<{ id: string }>();
    

    const { data: profile, isLoading, isError } = useGetUserProfileQuery(userId || "");
    
  return (
    <>
        <div className='w-full min-h-screen flex justify-start'>
            <HomeSideBar/>
            {profile && !isLoading ? (
                    <main className='w-full flex flex-col items-start justify-start py-8 px-3 md:px-8 space'>
                        <h1 className='mb-4 text-4xl'>Likes</h1>
                        <div className="lineYellow"></div>
                        <MusicPlaylist loops={profile.likedLoops}/>
                    </main>
            ): <p>Loading...</p>}
            </div>
    </>
  )
}

export default UserLikes