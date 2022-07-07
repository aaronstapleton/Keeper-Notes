import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
import Header from './Header';
import Footer from './Footer';

const Signup = () => {
    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const [error,setError] = React.useState('');

    const { createUser } = UserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await createUser(email,password);
            await navigate("/dashboard")
        }catch (e){
            setError(e.message);
            console.log(e.message);
        }

    };

  return (
    <div>
      <Header />
      <div className='max-w-[700px] mx-auto my-0 p-4'>
        <div>
          <h1 className='text-2xl font-bold pb-2'>Sign up for a free account</h1>
          <p className='py-2'>
            Already have an account?{' '}
            <Link to='/' className='underline'>
              Sign in.
            </Link>
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Email Address</label>
            <input
              className='border p-3 rounded'
              type='email'
              onChange={(e)=>{
                  setEmail(e.target.value);
              }}
            />
          </div>
          <div className='flex flex-col py-2'>
            <label className='py-2 font-medium'>Password</label>
            <input
              className='border p-3 rounded'
              type='password'
              onChange={(e)=>{
                  setPassword(e.target.value);
              }}
            />
          </div>
          <button className='border border-gray-500 bg-gray-600 hover:bg-gray-500 w-full p-4 my-2 text-white rounded'>
            Sign Up
          </button>
        </form>
      </div>
      <Footer />
    </div>

  )
}

export default Signup