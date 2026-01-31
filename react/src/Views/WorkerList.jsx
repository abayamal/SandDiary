import React, { useEffect, useState } from 'react'
import PageComponent from '../Components/PageComponent'
import axiosClient from '../../axios'
import { EyeDropperIcon, EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import ClipLoader from "react-spinners/ClipLoader";
import PaginationLinks from '../Components/PaginationLinks';
import { Link } from 'react-router-dom';


export default function WorkerList() {

  const [workers,setWorkers] = useState([]);
  const [loading,setLoading] = useState(false);
  const [meta,setMeta] = useState({});

    const fetchData = async (url = '/worker')=>{
        setLoading(true);
        try{
          const res = await axiosClient.get(url);
          setWorkers(res.data.data);
          setMeta(res.data.meta)
        }catch(error){

        }finally{
          setLoading(false)
        }
    }

    useEffect(()=>{
      fetchData();
    },[]) 

  const changeUrl = (url) => {
    if (!url) return; 
    fetchData(url);
  };  

  return (
    <PageComponent title="Workers List">
      {}
      { loading ? 
      <div className='flex justify-center items-center h-64'>
        <ClipLoader size={40} /> 
      </div>
      : workers.length === 0 ? <div className='text-center py-10 text-gray-500'>No workers found</div> : <table className="min-w-full text-sm mt-2">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Nic</th>
              <th className="px-4 py-2">Phone</th>
              <th className="px-4 py-2">Rate For Cube</th>
              <th className="px-4 py-2">Rate For Tractor Load</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {
              workers.map(worker=>{
                return (
                  <tr className="odd:bg-white even:bg-gray-50" key={worker.id}>
                    <td className="px-4 py-2">{worker.name}</td>
                    <td className="px-4 py-2">{worker.nic}</td>
                    <td className="px-4 py-2">{worker.phone}</td>
                    <td className="px-4 py-2">LKR.{worker.rateForCube}</td>
                    <td className="px-4 py-2">LKR.{worker.rateForTractorLoad}</td>
                    <td className="px-4 py-2">
                      <div className='flex gap-2 justify-center'>
                        <Link to={`/workers/edit/${worker.id}`}>
                          <PencilSquareIcon className='w-6 cursor-pointer' title='Edit'/>
                        </Link>
                        <EyeIcon className='w-6 cursor-pointer' title='View'/>
                        <TrashIcon className='w-6 cursor-pointer' title='Delete'/>
                      </div>
                    </td>
                  </tr>
                );
              })
            }
          
          </tbody>
        </table>}
        {workers.length > 0 ? <PaginationLinks meta={meta} changeUrl={changeUrl}/> : null}
        
      
    </PageComponent>
  )
}
