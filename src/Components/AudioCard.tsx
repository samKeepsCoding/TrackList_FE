import React, { useState } from 'react'
import { CardProps } from '../Types'
import { PanInfo, motion } from 'framer-motion';
import AudioPlayer from './AudioPlayer';
import producing from '../Assets/producing.jpg'


const AudioCard: React.FC<CardProps> = ({ card, removeCard, active }) => {
    const [leaveX, setLeaveX] = useState(0);
    const [leaveY, setLeaveY] = useState(0);

    const onDragEnd = (_e: any, info: PanInfo) => {
        if (info.offset.y < -100) {
            setLeaveY(-2000);
            removeCard(card, "superlike");
            return;
        }
        if (info.offset.x > 100) {
            setLeaveX(1000);
            removeCard(card, "like");
        }
        if (info.offset.x < -100) {
            setLeaveX(-1000);
            removeCard(card, "nope");
        }
    };
    const classNames = `absolute h-[360px] md:h-[400px] w-[260px] max-w-screen md:w-[300px] bg-white shadow-xl rounded-2xl flex flex-col justify-center items-center cursor-grab mb-8 text-TLBlack`

  return (
    <>
        {active ? (
            <motion.div
                drag={true}
                dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0}}
                onDragEnd={onDragEnd}
                initial={{
                    scale: 1,
                }}
                animate={{
                    scale: 1.05,
                    rotate: `${card.title.length % 2 === 0 ? 6 : -6}deg`,
                }}
                exit={{
                    x: leaveX,
                    y: leaveY,
                    opacity: 0,
                    scale: 0.5,
                    transition: { duration: 0.2 },
                }}
                className={`${classNames}`}
                data-testid="active-card"
            >
                <h1 className='text-black'>
                    {card.title}
                </h1>
                <AudioPlayer 
                    audioData={card.data}
                    wavHieght={160}
                />
                <p>See more from this 
                    <a href={`/producer/${card.userId}`}> Producer</a> 
                </p>
            </motion.div>
        ): (
            <div
          className={`${classNames} ${
            card.title.length % 2 === 0 ? "rotate-6" : "-rotate-6"
          }`}
        >
            
            <title>
                {card.title}
            </title>
        </div>
        )}
    </>
  )
}

export default AudioCard