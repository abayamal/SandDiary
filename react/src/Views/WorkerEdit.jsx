import React, { useEffect, useState } from 'react'
import PageComponent from '../Components/PageComponent'
import WorkerForm from '../Components/WorkerForm'
import { useNavigate, useParams } from 'react-router-dom'
import axiosClient from '../../axios';
import { useStateContext } from '../context/ContextProvider';

export default function WorkerEdit() {

    const [values,setValues] = useState({});
    const [errors,setErrors] = useState({});
    const { id } = useParams();
    const { showToast } = useStateContext();
    const navigate = useNavigate();

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

    //update worker details

    const onsubmit = async (ev)=>{
        ev.preventDefault();
        try{
            const response = await axiosClient.put(`/worker/${id}`,{
                name:values.name,
                nic:values.nic,
                phone:values.phone,
                rateForCube:values.rateForCube,
                rateForTractorLoad:values.rateForTractorLoad
            })

             showToast("Worker updated successfully!");
             navigate('/workers/list');
        }catch(error){
            if(error.response && error.response.status === 422){
                setErrors(error.response.data.errors);
            }
        }
    }


  return (
    <PageComponent title="Edit Worker">
        <div className='max-w-xl mx-auto'>
            <WorkerForm values={values} setValues={setValues} errors={errors}  onsubmit={onsubmit} submitLabel="Update" cancelPath={"/workers/list"}/>
        </div>
    </PageComponent>
  )
}
