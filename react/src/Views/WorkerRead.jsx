import React, { useEffect, useState } from 'react'
import PageComponent from '../Components/PageComponent'
import WorkerForm from '../Components/WorkerForm';
import axiosClient from '../../axios';
import { useParams } from 'react-router-dom';

export default function WorkerRead() {

    const [values,setValues] = useState({});
    const [errors,setErrors] = useState({});
    const {id} = useParams();

    //fetch selected worker details
    const fetchWorkerDetails = async ()=>{
        try{
            const response = await axiosClient.get(`/worker/${id}`);
            setValues(response.data.data);
        }catch(error){
            console.log(error);
        }
    }

    useEffect(()=>{
        fetchWorkerDetails();
    },[])

    console.log(values);

  return (
    <PageComponent title="View Worker">
        <div className='max-w-xl mx-auto'>
            <WorkerForm values={values} setValues={setValues} errors={errors}  onsubmit={onsubmit} cancelPath={"/workers/list"}/>
        </div>
    </PageComponent>
  )
}
