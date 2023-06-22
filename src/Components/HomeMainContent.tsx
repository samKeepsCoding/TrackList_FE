import React, { useEffect, useState } from 'react'
import '../Styles/home.css'
import axios from 'axios';
import AudioCard from './AudioCard';
import { CardType, HistoryType, ResultType, SwipeType } from '../Types';
import { AnimatePresence } from 'framer-motion';
import Counter from './Counter';
import { AiOutlineUndo } from 'react-icons/ai'

const HomeMainContent = () => {

  const [loops, setLoops] = useState<CardType[]>([])
  const [result, setResult] = useState<ResultType>({
    like: 0,
    nope: 0,
    superlike: 0,
  });
  const [history, setHistory] = useState<HistoryType[]>([])


  const activeIndex = loops.length - 1;

  useEffect(() => {
    const fetchLoops = async () => {
      try {
        const res = await axios.get('api/Loop');
        setLoops(res.data);
      } catch (err) {
        console.error("Error fetching loops:", err);
      }
    };
    fetchLoops();
    console.log(loops)
  },[])


  const removeCard = (oldCard: CardType, swipe: SwipeType) => {
    setHistory((current) => [...current, { ...oldCard, swipe }]);
    setLoops((current) =>
      current.filter((card) => {
        return card.id !== oldCard.id;
      })
    );
    setResult((current) => ({ ...current, [swipe]: current[swipe] + 1 }));
  };

  const undoSwipe = () => {
    const newCard = history.pop();
    if (newCard) {
      const { swipe } = newCard;
      setHistory((current) => current.filter((card) => {
        return card.id !== newCard.id;
      }))
      setResult((current) => ({...current, [swipe]: current[swipe] -1 }))
      setLoops((current) => [...current, newCard]);
    }
  };

  return (
    <>
        <main className='flex justify-center items-center relative w-full h-screen overflow-hidden'>
            {loops.map((loop, index) => {
              return(
                <AnimatePresence key={index}>
                  <AudioCard 
                    key={loop.title} 
                    active={index === activeIndex} 
                    removeCard={removeCard}
                    card={loop}

                  />
                </AnimatePresence>
              )
            })}
          {loops.length === 0 ? (
            <span className="text-white text-xl">End of Stack</span>
          ) : null}

          <div className='absolute bottom-0 w-full flex justify-center items-center space-x-6 p-3 '>
            <div className='flex flex-col justify-start items-center space-y-2 text-TLBlack'>
              <button 
                className='w-14 h-14 text-xl font-medium rounded-full inline-flex justify-center items-center md:bg-white bg-TLYellow disabled:cursor-not-allowed'
                onClick={undoSwipe}
              >
                  <AiOutlineUndo size={30}/>
              </button>
              <span className='text-xs text-white'>Undo</span>
            </div>
            <Counter label="Likes" count={result.like} />
            <Counter label='Nopes' count={result.nope}/>
            {/* <Counter label="Superlike" count={result.superlike}/> */}
          </div>
        </main>
    </>
  )
}

export default HomeMainContent