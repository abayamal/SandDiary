import React, { useEffect, useState } from 'react'
import PageComponent from '../../Components/PageComponent'
import AddButton from '../../Components/AddButton'
import axiosClient from '../../../axios'
import { Link } from 'react-router-dom';
import { EyeIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import PaginationLinks from '../../Components/PaginationLinks';
import ClipLoader from 'react-spinners/ClipLoader';

export default function VehicleList() {

    const [vehicles,setVehicles] = useState([]);
    const [meta,setMeta] = useState({});
    const [loading,setLoading] = useState(false);

    const fetchRecords = async (url='/vehicle')=>{
        setLoading(true)
        try{
            const response = await axiosClient.get(url)
            setVehicles(response.data.data);
            setMeta(response.data.meta);
        }catch(error){
            
        }finally{
          setLoading(false);
        }
    }

    useEffect(()=>{
      fetchRecords();
    },[]);

    console.log(meta);

    const changeUrl = (url)=>{
      if(!url) return;
      fetchRecords(url);
    }

  return (
    <PageComponent title="Vehicles List" actions={
        <AddButton label="Add Vehicle" to="/vehicles/add"/>
    }>
      {loading ? 
       <div className='flex justify-center items-center h-64'>
        <ClipLoader size={40} /> 
       </div> : vehicles.length === 0 ? <div className='text-center py-10 text-gray-500'>No workers found</div>
        :  
        <table className="min-w-full text-sm mt-2">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2">Vehicle Number</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Owner</th>
              <th className="px-4 py-2">Volume</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
          {
            vehicles.map(vehicle=>{
              return(
                <tr className="odd:bg-white even:bg-gray-50" key={vehicle.id}>
                  <td className="px-4 py-2">{vehicle.number}</td>
                  <td className="px-4 py-2">{vehicle.owner}</td>
                  <td className="px-4 py-2">{vehicle.type}</td>
                  <td className="px-4 py-2">{vehicle.volume}</td>
                  <td className="px-4 py-2">
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
        
          {vehicles.length >  0 ? <PaginationLinks meta={meta} changeUrl={changeUrl}/> : null }
    </PageComponent>
  )
}
