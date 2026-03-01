import React, { useEffect, useState } from 'react'
import PageComponent from '../../Components/PageComponent'
import axiosClient from '../../../axios';
import { Link } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { EyeIcon, PencilSquareIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import AddButton from '../../Components/AddButton';
import PaginationLinks from '../../Components/PaginationLinks';
import ConfirmModel from '../../Components/ConfirmModel';
import { useStateContext } from '../../context/ContextProvider';

export default function DailyMiningList() {

    const [dailyRecords,setDailyRecords] = useState([]);
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(null);
    const [meta,setMeta] = useState({})
    const [open,setOpen] = useState(false);
    const [selectedId,setSelectedId] = useState(null);
    const {showToast} = useStateContext();

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

    const confirmDelete  = (id)=>{
        setSelectedId(id)
        setOpen(true);
    }

    const deleteRecord = async ()=>{
      if(!selectedId) return;
      try{
        await axiosClient.delete(`mining-records/${selectedId}`);
        setOpen(false);
        setSelectedId(null);
        showToast('Mining Record Deleted successfully!');
        fetchDailyRecords();
      }catch(error){
        console.log(error);
      }
    } 

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
                        <Link to={`/mining/daily/${record.id}/edit?mode=edit`}>
                            <PencilSquareIcon className='w-6 cursor-pointer' title='Edit'/>
                        </Link>
                        <Link to={`/mining/daily/${record.id}/view?mode=view`}>
                            <EyeIcon className='w-6 cursor-pointer' title='View'/>
                        </Link>
                        <TrashIcon className='w-6 cursor-pointer' title='Delete' onClick={()=>confirmDelete(record.id)}/>
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

        <ConfirmModel open={open} setOpen={setOpen} title={'Confirm Delete'} description={'Are you sure want to delete this record?'} label={'Delete'} action={deleteRecord}/>
    </PageComponent>
  )
}
