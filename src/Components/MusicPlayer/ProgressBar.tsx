import React, { FormEventHandler, useEffect, useRef, useState } from 'react';
import '../../Assets/progressBar.css'

interface ProgressBarProps {
    // value: number;
    // min: number;
    // max: number;
    percentage: number;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProgressBar: React.FC<ProgressBarProps> = ({percentage = 0, onChange}) => {

// const getTime = (time: number) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;
  const [position, setPosition] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);
  const [progressBarWith, setProgressBarWidth] = useState(0);

  const rangeRef = useRef<HTMLInputElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rangeRef.current && thumbRef.current) {
      const rangeWidth = rangeRef.current.getBoundingClientRect().width;
      const thumbWidth = thumbRef.current.getBoundingClientRect().width;
      const centerThumb = (thumbWidth / 100) * percentage * -1;
      const centerProgressBar = thumbWidth + (rangeWidth / 100) * percentage - (thumbWidth / 100) * percentage
      setPosition(percentage)
      setMarginLeft(centerThumb)
      setProgressBarWidth(centerProgressBar)
    }
  }, [percentage])

  return (
    <div className='hidden sm:flex items-center'>
        <div className={`w-[${progressBarWith}] bg-TLYellow progress-bar-cover`}>
        </div>
        <div 
          className={`thumb left-[${position}] marginLeft-[${marginLeft}]`}
          ref={thumbRef}

        ></div>
        <input 
          type='range'
          value={position}
          ref={rangeRef}
          step='0.01'
          onChange={onChange}
          // className="md:block w-24 md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg"
          className='range'

        />
        {/* <p className="text-white">{max === 0 ? '0:00' : getTime(max - value)}</p> */}
    </div>
  )
}

export default ProgressBar