
import Background from '../Assets/james-stamler-k3heD_KwH0A-unsplash.jpg';

const Landing = () => {
  return (
    <>
      <section 
        className="relative w-full h-screen flex justify-center items-center bg-center bg-cover "
        style={{ backgroundImage: `url(${Background})` }}
      >
        <div className='absolute top-0 left-0 w-full h-full opacity-60 bg-TLBlack'></div>

        <div className=' flex flex-col justify-center items-center z-30 px-4 '>
          <h1 className='font-bold text-4xl md:text-6xl lg:text-8xl italic text-center'>
            Compose 
            <span className='text-TLYellow'> C</span>onnect
            Create 
          </h1> 
          <a href='/register' className='w-full flex justify-center mt-8'>
            <button className='rounded-full flex justify-center w-full max-w-sm py-3 text-2xl font-bold md:hover:bg-white text-TLBlack bg-TLYellow hover:white'>Create account</button>
          </a>
          <a href='/login' className='w-full flex md:hidden justify-center mt-3'>
            <button className='rounded-full flex justify-center w-full max-w-sm py-3 text-2xl font-bold md:hover:bg-white text-TLBlack bg-TLYellow hover:white'>Login </button>
          </a>
        </div>
      </section>
    </>
  )
}

export default Landing