import { TrashIcon } from '@heroicons/react/24/outline'
import React, { useEffect, useState } from 'react'
import axiosClient from '../../axios';

export default function MiningEditor({miningRecord,deleteMiningRecord,changeMiningRecord,errors,index,clearFieldError}) {

    const [model,setModel] = useState({...miningRecord});
    const [loading,setLoading] = useState(false);

    const [nameOptions,setNameOptions] = useState([]);
    const volumes = [0.75,1];

    const fetchWorkers = async ()=>{
        setLoading(true);
        try{
           const response = await axiosClient.get('/workers/options')
            setNameOptions(response.data);
            setLoading(false);
        }catch(error){
            console.error('Failed to load workers', error);
        }finally{
            setLoading(false)
        }
    }

    const commitChange = () => changeMiningRecord(model);

    useEffect(()=>{
        fetchWorkers();
    },[])

    useEffect(() => {
        setModel({ ...miningRecord });
    }, [miningRecord]);

    const fieldError = (field) =>
    errors?.[`records.${index}.${field}`]?.[0];

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
                    onChange={(ev)=>{
                        setModel({...model,workerId:ev.target.value})
                        clearFieldError(index,'workerId');
                    }
                
                    }
                    onBlur={commitChange}>
                        <option value="">{loading ? 'Loading Workers...' : 'Select Worker'}</option>
                        {nameOptions.map((o)=>(
                            <option key={o.id} value={o.id}>
                                {o.name}
                            </option>
                        ))}
                    </select>
                {fieldError('workerId') && (
                <p className="text-sm text-red-600 mt-1">
                    {fieldError('workerId')}
                </p>
                )}
                </div>
                <div className='flex-1 min-w-[200px]'>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Volume
                    </label>
                    <select
                    value={model.volume}
                    placeholder="Enter capacity"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none"
                    onChange={(ev)=>{
                        setModel({...model,volume:Number(ev.target.value)})
                        clearFieldError(index,'volume');
                    }}
                    onBlur={commitChange}
                    >
                       <option value="">Select Volume</option>
                       {volumes.map((v)=>(
                        <option key={v} value={v}>{v}</option>
                       ))} 
                    </select>
                    {fieldError('volume') && (
                    <p className="text-sm text-red-600 mt-1">
                        {fieldError('volume')}
                    </p>
                    )}
                </div>
                <div className='flex-1 min-w-[200px]'>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Loads
                    </label>
                    <input
                    type="text"
                    value={model.numberOfLoads}
                    onChange={(ev)=>{
                        setModel({...model,numberOfLoads:ev.target.value})
                        clearFieldError(index,'numberOfLoads');
                    }}
                    onBlur={commitChange}
                    placeholder="Enter quantity"
                    className={`w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none`}
                    />
                     {fieldError('numberOfLoads') && (
                    <p className="text-sm text-red-600 mt-1">
                        {fieldError('numberOfLoads')}
                    </p>
                    )}
                </div>
            </div>
            <div className='flex items-end pb-2 flex-shrink-0'>
                <TrashIcon className='w-6 h-6 text-red-600 cursor-pointer' onClick={()=>deleteMiningRecord(model.id,index)}/>
            </div>
        </div>
    </>
  )
}
