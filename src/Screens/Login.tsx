import React from 'react'

interface LoginProps {
  setToken: (token: string | null) => void;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
  return (
    <div className='text-white'>Login</div>
  )
}

export default Login