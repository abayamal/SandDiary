import React, { useState } from 'react'
import axiosClient from '../../axios';
import { useStateContext } from '../context/ContextProvider';
import { Navigate } from 'react-router-dom';

export default function Login() {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [errors,setErrors] = useState({});

  const {userTokenSetter,userToken} = useStateContext();

  async function onSubmit(e){
    e.preventDefault();
    try{
        const response = await axiosClient.post('/login',{
          email,
          password
        })

        userTokenSetter(response.data.token);
    
    }catch(err){
      if(err.response){
        setErrors(err.response.data.errors);  
      }
    }
  }

  if(userToken){
    return <Navigate to='/'/>
  }

  return (
    <>
      <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Login to your account
      </h2>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form action="#" method="POST" className="space-y-6" onSubmit={onSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm/6 font-medium text-gray-900">
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                onChange={(ev)=>setEmail(ev.target.value)}
                required
                autoComplete="email"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email[0]}</p>}
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm/6 font-medium text-gray-900">
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                onChange={(ev)=>setPassword(ev.target.value)}
                required
                autoComplete="current-password"
                className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
              />
            </div>
            {errors.password && <p className="mt-2 text-sm text-red-600">{errors.password[0]}</p>}
            {errors.common && <p className="mt-2 text-sm text-red-600">{errors.common[0]}</p>}

          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-[1rem] text-center text-sm/6 text-gray-[.875rem]">
          New here? {' '}
          <a href="/signup" className={`font-semibold ${'text-indigo'} hover:${'text-indigo'}`}>
            Create an account
          </a>
        </p>
    
      </div> 
    </>
  )
}