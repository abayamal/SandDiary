import React from 'react'
import { Link } from 'react-router-dom'

export default function ButtonCard(props) {
  const Wrapper = props.to ? Link : 'div';
  
  return (
    <>
    <Wrapper to={props.to} className='w-50 h-30 flex justify-center items-center flex-col rounded-md shadow-lg cursor-pointer hover:bg-[#0958c4] transition duration-300 group hover:scale-[1.03] hover:shadow-xl mr-5 mb-5' >    
        <div className="mt-2 mb-2">
            {props.children}
        </div>        
        <div className='mb-2 text-[#1f1f1f] group-hover:text-white font-medium'>{props.name}</div>
    </Wrapper>
    
    </>
  )
}
