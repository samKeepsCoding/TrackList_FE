import React from 'react'

interface CounterProps {
    label: string;
    count: number;
  }

const Counter: React.FC<CounterProps> = ({ count, label }) => {
  return (
    <div className='flex flex-col items-center space-y-2 text-TLBlack '>
        <div className='w-14 h-14 text-xl font-medium rounded-full inline-flex justify-center items-center md:bg-white bg-TLYellow'
        >
            {count}
        </div>
        <span className='text-xs text-white'>{label}</span>
    </div>
  )
}

export default Counter