import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Header from "./Header";
import Footer from './Footer';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { signIn } = UserAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('')
    try {
      await signIn(email, password)
      navigate('/dashboard')
    } catch (e) {
      setError(e.message)
      console.log(e.message)
      
    }
  };
  return (
    <div>
    <Header />
      <div className='max-w-[700px] mx-auto my-0 p-4'>
        
        <div>
          <h1 className='text-2xl font-bold pb-2'>Sign in</h1>
          <p className='py-2'>
            Don't have an account yet?{' '}
            <Link to='/signup' className='underline'>
              Sign Up.
            </Link>
          </p>
        </div>
        <form  onSubmit={handleSubmit}>
          <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Email Address</label>
            <input
              className='border p-3 rounded'
              type='email'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Password</label>
            <input
              className='border p-3 rounded'
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className='border border-gray-500 bg-gray-600 hover:bg-gray-500 w-full p-4 my-2 text-white rounded'>
            Sign In
          </button>
        </form>
      </div>
      <Footer />
    </div>

  )
}

export default Signin