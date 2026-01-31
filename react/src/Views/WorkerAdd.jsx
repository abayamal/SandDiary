import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import PageComponent from '../Components/PageComponent'
import { useState } from 'react'
import axiosClient from '../../axios';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';
import WorkerForm from '../Components/WorkerForm';

export default function WorkerAdd() {

  const navigate = useNavigate();

  const [errors,setErrors] = useState({});
  const {showToast} = useStateContext();

  const [values,setValues] = useState({
    name:"",
    nic:"",
    phone:"",
    rateForCube:"", 
    rateForTractorLoad:"",
  });


  const onsubmit = async (ev)=>{
    ev.preventDefault();
    try{
      const response = await axiosClient.post('/worker',{
        name:values.name,
        nic:values.nic,
        phone:values.phone,
        rateForCube:values.rateForCube,
        rateForTractorLoad:values.rateForTractorLoad
      });

      showToast("Worker created successfully!");
      navigate('/workers');

    }catch(error){
      if(error.response && error.response.status === 422){
        setErrors(error.response.data.errors);
      }
    }
  }

 

  return (
    <PageComponent title="Add Worker">
      <div className='max-w-xl mx-auto'>
        <WorkerForm values={values} setValues={setValues} errors={errors}  onsubmit={onsubmit} submitLabel="create" cancelPath={"/workers"}/>
      </div>
    </PageComponent>
  )
}
