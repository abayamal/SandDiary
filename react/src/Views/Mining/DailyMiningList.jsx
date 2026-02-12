import React, { useEffect, useState } from 'react'
import PageComponent from '../../Components/PageComponent'
import axiosClient from '../../../axios';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { EyeIcon, PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import AddButton from '../../Components/AddButton';
import PaginationLinks from '../../Components/PaginationLinks';

export default function DailyMiningList() {

    const [dailyRecords,setDailyRecords] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [meta,setMeta] = useState({})

    const formatDate = (dateString) => {
      return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }).format(new Date(dateString));
    };

    const changeUrl = (url) => {
      if (!url) return; 
      fetchDailyRecords(url);
    };  

    const fetchDailyRecords = async (url='/mining-records')=>{
       const controller = new AbortController();

      setLoading(true);
        try{
            const response = await axiosClient.get(url,{
              signal:controller.signal
            });
            setDailyRecords(response.data.data);
            setMeta(response.data.meta);
        }catch(error){
            setError('Failed to load records');
        }finally{
          setLoading(false);
        }

        return ()=> controller.abort();
    }

    useEffect(()=>{
        fetchDailyRecords();
    },[])

  return (
    <PageComponent title="Daily Mining Records"  actions={
        <AddButton label="Add Record" to="/mining/daily/create" />
      }>
      { loading ? <div className='flex justify-center items-center h-64'>
        <ClipLoader size={40} /> 
      </div> : dailyRecords.length === 0 ? <div className='text-center py-10 text-gray-500'>No records found</div> : <table className="min-w-full text-sm mt-2">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Workers</th>
              <th className="px-4 py-2">Total Volume (Cube)</th>
              <th className="px-4 py-2">Actions</th>

            </tr>
          </thead>
          <tbody>
            {
              dailyRecords?.map(record=>{
                return (
                  <tr key={record.id} className="odd:bg-white even:bg-gray-50">
                    <td className="px-4 py-2">{formatDate(record.date)}</td>
                    <td className="px-4 py-2">{record.workers}</td>
                    <td className="px-4 py-2">{record.volume}</td>
                    <td className='px-4 py-2 space-x-3'>
                      <div className='flex gap-2 justify-center'>
                        <Link to="">
                            <PencilSquareIcon className='w-6 cursor-pointer' title='Edit'/>
                        </Link>
                        <Link to="">
                            <EyeIcon className='w-6 cursor-pointer' title='View'/>
                        </Link>
                        <TrashIcon className='w-6 cursor-pointer' title='Delete'/>
                      </div>
                    </td>
                  </tr>
                );
              })
            }
          
          </tbody>
        </table> 
      
      }
        {dailyRecords.length > 0 ? <PaginationLinks meta={meta} changeUrl={changeUrl}/> : null}
    </PageComponent>
  )
}
