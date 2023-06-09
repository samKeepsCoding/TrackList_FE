import React, { FormEventHandler } from 'react'

interface ProgressBarProps {
    value: number;
    min: number;
    onInput: any;
    max: number;


}

const ProgressBar: React.FC<ProgressBarProps> = ({value, min, onInput, max}) => {

const getTime = (time: number) => `${Math.floor(time / 60)}:${(`0${Math.floor(time % 60)}`).slice(-2)}`;
  return (
    <div className='hidden sm:flex items-center'>
        <input 
            type="range" 
            step='any'
            value={value}
            min={min}
            max={max}
            onInput={onInput}
            className="md:block w-24 md:w-56 2xl:w-96 h-1 mx-4 2xl:mx-6 rounded-lg"

        />
        <p className="text-white">{max === 0 ? '0:00' : getTime(max)}</p>
    </div>
  )
}

export default ProgressBar