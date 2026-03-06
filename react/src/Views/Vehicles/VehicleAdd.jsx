import React, { useState } from 'react'
import PageComponent from '../../Components/PageComponent'
import VehicleForm from '../../Components/VehicleForm'
import axiosClient from '../../../axios';
import { useStateContext } from '../../context/ContextProvider';
import BackButton from '../../Components/BackButton';

export default function VehicleAdd() {

    const [errors,setErrors] = useState({});
    const {showToast} = useStateContext();

    const [values,setValues] = useState({
        number:"",
        type:"",
        owner:"",
        volume:""
    });

    const onsubmit = async (ev)=>{
        ev.preventDefault();
        setErrors({});
        try{
          const response = await axiosClient.post('/vehicle',{
            number:values.number,
            type:values.type,
            owner:values.owner,
            volume:values.volume,
          });
          showToast("Vehicle added successfully");
          
        }catch(error){
          if(error.response && error.response.status === 422){
            setErrors(error.response.data.errors);
          }
        }
    }

    //For cancel button
    const clearFields = ()=>{
      setValues({
        number:"",
        type:"",
        owner:"",
        volume:""
      });
    }

  return (
    <PageComponent title="Add Vehicles" actions={
      <BackButton fallback="/vehicles/list" />
    }>
         <VehicleForm values={values} setValues={setValues} onsubmit={onsubmit} errors={errors} clearFields={clearFields}/>
    </PageComponent>
  )
}
