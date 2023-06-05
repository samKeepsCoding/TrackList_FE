import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import '../index.css'
import HomeSideBar from '../Components/HomeSideBar';
import profilePicture from '../Assets/profilePicture.jpg'
import ProducerPlaylist from '../Components/ProducerPlaylist';

interface ProducerInfo {
    id: number;
    userName: string;
    likedLoops: any[];
    profilePicData: string;
}

const ProducerProfile: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const [producerInfo, setProducerInfo] = useState<ProducerInfo | null>(null);

    useEffect(() => {
        const fetchProducerProfile = async (userId: string) => {
            try {
                const res = await axios.get<ProducerInfo>('/api/Profiles/' + userId);
                setProducerInfo(res.data)
            } catch (err) {
                console.error("Error fetching this producer's profile", err);
            }
        };
        
        if (id) {

            fetchProducerProfile(id);
        }

    }, [id]);



    
  return (
    <>
        <div className="w-full min-h-screen flex justify-start overflow-y-scroll">
            <HomeSideBar/>
        {producerInfo ? (
            <main className=" w-full flex flex-col items-start justify-start py-8 px-3 md:px-8 space-y-10 mt-[3rem] min-h-screen">
                <section className="w-full flex items-start justify-start space-x-4">
                    {producerInfo.profilePicData ? (
                    <img
                        src={`data:image/jpeg;base64,${producerInfo.profilePicData}`}
                        alt="Profile"
                        className="w-[210px] h-[210px] md:w-[310px] md:h-[310px] rounded-lg"
                    />
                    ) : (
                    <img
                        src={profilePicture}
                        alt="Profile"
                        className="w-[210px] h-[210px] md:w-[310px] md:h-[310px] rounded-lg"
                    />
                    )}

                    <div className="flex flex-col items-start w-full h-full py-6">
                        <div>
                            <h3 className="text-TLYellow font-medium flex-wrap text-">PRODUCER</h3>
                            <h1 className="text-xl md:text-5xl font-semibold">{producerInfo.userName}</h1>
                        </div>
                        <button className="rounded-lg flex justify-center py-1 px-4 text-lg font-bold text-TLBlack bg-TLYellow hover:bg-TLBlack hover:text-TLYellow border border-TLYellow mt-auto">FOLLOW</button>
                    </div>
                </section>

                <div className="lineYellow"></div>

                {/* TODO Fetch bio data */}
                <article className="text-start text-sm w-full flex justify-center items-center">
                    <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris nec pulvinar ligula. Nulla facilisi. Proin feugiat nunc in ex posuere bibendum. Sed ac velit quis enim aliquam viverra. Mauris sed quam magna. Integer sagittis bibendum ultrices. Nunc at posuere tortor. Sed ultricies sem sed massa luctus, at consequat enim sagittis. Nullam in velit magna.
                    </p>
                </article>

                <div className="lineYellow"></div>

                <ProducerPlaylist id={id ?? ""}/>
            </main>
        ) : (
            <p>Loading ...</p>
            )}
        </div>
    </>
  )
}

export default ProducerProfile