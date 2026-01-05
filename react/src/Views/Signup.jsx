import React, { useState } from 'react'
import axiosClient from '../../axios';
import { useStateContext } from '../context/ContextProvider';
import { Navigate } from 'react-router-dom';

export default function Signup() {

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  const {userTokenSetter,userToken} = useStateContext();


  const onsubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axiosClient.post('/signup', {
        username,
        email,
        password,   
        password_confirmation: confirmPassword,
      });

      userTokenSetter(response.data.token);

    } catch (error) {
      if(error.response && error.response.status === 422){
        setErrors(error.response.data.errors); 
        
      }
    }

  }

  if(userToken){
    return <Navigate to='/' />;
  }
  


  return (
    <>
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Create a new account
      </h2>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6" onSubmit={onsubmit}>
          <div>
            <label htmlFor="name" className="block text-sm/6 font-medium text-gray-900">
              Full name
            </label>
            <div className="mt-2">
              <input
                id="name"
                name="name"
                type="text"
                onChange={ev=>setUsername(ev.target.value)}
                required
                autoComplete="name"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.username && <div className="text-red-600 mt-1 text-sm">{errors.username[0]}</div>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                onChange={ev=>setEmail(ev.target.value)}
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.email && <div className="text-red-600 mt-1 text-sm">{errors.email[0]}</div>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                onChange={ev=>setPassword(ev.target.value)}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.password && !errors.password[0].includes('confirmation') && (
              <div className="text-red-600 mt-1 text-sm">
                {errors.password[0]}
              </div>
            )}
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm/6 font-medium text-gray-900">
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                onChange={ev=>setConfirmPassword(ev.target.value)}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>

            {errors.password && errors.password[0].includes('confirmation') && (
              <div className="text-red-600 mt-1 text-sm">
                {errors.password[0]}
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-[.75rem] text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-[.875rem] focus-visible:outline-[.875rem] focus-visible:outline-offset-[.875rem] focus-visible:outline-indigo-[.875rem]"
            >
              Sign up
            </button>
          </div>
        </form>

        <p className="mt-[1rem] text-center text-sm/6 text-gray-[.875rem]">
          Already have an account?{' '}
          <a href="/login" className={`font-semibold ${'text-indigo'} hover:${'text-indigo'}`}>
            Sign in to your account
          </a>
        </p>
      </div> 
    </>
  )
}
