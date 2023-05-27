import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

const ProducerProfile: React.FC = () => {

    const { id } = useParams<{ id: string }>();
    const [producerInfo, setProducerInfo] = useState({});

    useEffect(() => {
        const fetchProducerProfile = async (userId: string) => {
            try {
                const res = await axios.get('api/Profiles/' + userId);
                setProducerInfo(res.data);
                console.log(producerInfo)
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
        <main className='flex justify-center items-center w-full h-screen'>
            <h1>{id}</h1>
        </main>
    </>
  )
}

export default ProducerProfile