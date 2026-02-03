import React, { useState } from 'react'
import PageComponent from '../../Components/PageComponent'
import { v4 as uuidv4 } from 'uuid';
import { motion, AnimatePresence } from 'framer-motion';
import MiningEditor from '../../Components/MiningEditor'
import axiosClient from '../../../axios';

export default function DailyMiningCreate() {

    const [date,setDate] = useState('');
    const [errors,setErrors] = useState({});
    const [miningRecords,setMiningRecords] = useState([
        {
            id: uuidv4(),
            workerId: '',
            volume: '',
            numberOfLoads: ''
        }
    ]);

    const addMiningRecord = (ev) => {
        ev.preventDefault();
        setMiningRecords(prev => [
            ...prev,
            {
                id: uuidv4(),
                workerId: '',
                volume: '',
                numberOfLoads: ''
            }
        ]);
    }

    const changeMiningRecord = (record)=>{
        setMiningRecords((prev)=>
            prev.map(m=> (m.id === record.id ? record : m))
        );
    };

    const deleteMiningRecord = (id,index) => {
        setMiningRecords(prev => prev.filter(m => m.id !== id));

        //  Remove validation errors related to the deleted record as well
         setErrors(prev => {
            const newErrors = {};
            Object.keys(prev).forEach(key => {
                if (!key.startsWith(`records.${index}.`)) {
                    newErrors[key] = prev[key];
                }
            });
            return newErrors;
        });
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try{
            const response = await axiosClient.post('/mining-records',{
                date,
                records:miningRecords
            });
        }catch(error){
            if(error.response?.status === 422){
                setErrors(error.response.data.errors)
            }
        }
    }

    const clearFieldError = (index,field)=>{
        setErrors(prev=>{
            const newErrors = {...prev};
            delete newErrors[`records.${index}.${field}`];
            return newErrors;
        })
    }

    console.log(errors);

    return (
        <PageComponent title="Daily Mining Entry">
            <div className="max-w-3xl mx-auto mt-10 rounded-xl bg-white shadow-md p-6 sm:p-8">
                {/* Wrap the entire form with motion.div and layout for smooth layout animation */}
                <motion.form layout className="space-y-4" onSubmit={handleSubmit}>
                    
                    {/* Calendar / Date Field */}
                    <div className="flex gap-2 items-end">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Date
                            </label>
                            <input
                                type="date"
                                onChange={(ev)=>{
                                    setDate(ev.target.value)
                                    setErrors(prev=>{
                                        const newErrors = {...prev};
                                        delete newErrors[`date`];
                                        return newErrors;
                                    })
                                
                                }}
                                className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:outline-none"
                            />
                        
                        </div>

                        <div className='w-[70px]'>
                            <button
                                className="h-[42px] rounded-md bg-indigo-600 px-4 text-sm font-semibold text-white shadow hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={addMiningRecord}
                            >
                                ADD
                            </button>
                        </div>
                    </div>
                        {
                            errors.date?.[0] && (
                                <p className="text-sm text-red-600 mt-1 block">
                                    {errors.date[0]}
                                </p>
                            )
                        }
                    {miningRecords.length === 0 && (
                        <div className='text-center' style={{ color: '#868d98' }}>
                            No records found. Please click the "ADD" button to add a record.
                        </div>
                    )}


                    {/* Mining Records List */}
                    <AnimatePresence>
                        {miningRecords.map((m,index) => (
                            <motion.div
                                key={m.id}
                                layout            // smooth layout transition
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <MiningEditor
                                    miningRecord={m}
                                    deleteMiningRecord={deleteMiningRecord}
                                    changeMiningRecord={changeMiningRecord}
                                    errors={errors}
                                    index={index}
                                    clearFieldError={clearFieldError}

                                />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Save Button */}
                    <motion.button
                        type="submit"
                        layout       // animate position changes
                        className="w-full rounded-md bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-500 transition-colors"
                    >
                        Save
                    </motion.button>

                </motion.form>
            </div>
        </PageComponent>
    )
}
