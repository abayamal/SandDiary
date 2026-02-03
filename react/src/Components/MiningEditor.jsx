import { TrashIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios';

export default function MiningEditor({miningRecord,deleteMiningRecord,changeMiningRecord}) {

    const [model,setModel] = useState({...miningRecord});

    const [nameOptions,setNameOptions] = useState([]);
    const volumes = [0.75,1];

    const fetchWorkers = async ()=>{
        try{
           const response = await axiosClient.get('/workers/options')
            setNameOptions(response.data);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchWorkers();
    },[])

    useEffect(()=>{
        changeMiningRecord(model);
    },[model])


  return (
    <>
        <div className='flex gap-4'>
            <div className="flex gap-4 flex-wrap flex-1">
                <div className='flex-[2] min-w-[200px]'>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                    </label>
                    <select
                    value={model.workerId}
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none"
                    onChange={(ev)=>setModel({...model,workerId:ev.target.value})}>
                        <option value="">Select worker</option>
                        {nameOptions.map((o)=>(
                            <option key={o.id} value={o.id}>
                                {o.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='flex-1 min-w-[200px]'>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Volume
                    </label>
                    <select
                    value={model.volume}
                    placeholder="Enter capacity"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none"
                    onChange={(ev)=>setModel({...model,volume:ev.target.value})}
                    >
                       <option value="">Select Volume</option>
                       {volumes.map((v)=>(
                        <option key={v} value={v}>{v}</option>
                       ))} 
                    </select>
                </div>
                <div className='flex-1 min-w-[200px]'>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Loads
                    </label>
                    <input
                    type="text"
                    value={model.numberOfLoads}
                    onChange={(ev)=>setModel({...model,numberOfLoads:ev.target.value})}
                    placeholder="Enter quantity"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none"
                    />
                </div>
            </div>
            <div className='flex items-end pb-2 flex-shrink-0'>
                <TrashIcon className='w-6 h-6 text-red-600 cursor-pointer' onClick={()=>deleteMiningRecord(model.id)}/>
            </div>
        </div>
    </>
  )
}
