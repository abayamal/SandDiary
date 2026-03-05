import { ChevronDownIcon } from '@heroicons/react/24/outline'
import React from 'react'

export default function VehicleForm({values,setValues,onsubmit,errors,clearFields}) {

    const vehicleTypes = ['Tractor','Lorry'];
    const volumes = [0.75,1];

    const handleChange = (ev)=>{
        setValues(prev=>({...prev,
            [ev.target.name]:ev.target.value
        }));
    }

  return (
    <div className=' flex flex-wrap justify-center align-center mt-2' >
        <div className="w-full max-w-3xl mx-auto mt-10 rounded-xl bg-white shadow-md p-6 sm:p-8">
            <form className='mx-auto px-5' onSubmit={onsubmit}>
            <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                    <div className="mt-2 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                        <div className="sm:col-span-6">
                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                            Number
                        </label>
                        <div className="mt-2">
                            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                            <input
                                id="number"
                                name="number"
                                type="text"
                                value={values.number || ''}
                                onChange={handleChange}
                                placeholder="RG-7859"
                                className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                            />
                            </div>
                            {errors?.number && <div className='text-red-600 mt-1 text-sm'>{errors.number[0]}</div>}
                        </div>
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                Type
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                id="type"
                                name="type"
                                value={values.type || ''}
                                onChange={handleChange}
                                autoComplete="country-name"
                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                <option>Select Type</option>
                                    {
                                        vehicleTypes.map(type=>(
                                            <option key={type} value={type}>{type}</option>
                                        ))
                                    }
                                </select>
                                <ChevronDownIcon
                                aria-hidden="true"
                                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                />
                            </div>
                            {errors?.type && <div className='text-red-600 mt-1 text-sm'>{errors.type[0]}</div>}

                        </div>
                        <div className="sm:col-span-6">
                        <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                            Owner
                        </label>
                        <div className="mt-2">
                            <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                            <input
                                id="owner"
                                name="owner"
                                value={values.owner || ''}
                                onChange={handleChange}
                                type="text"
                                placeholder="Amila"
                                className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                            />
                            </div>
                            {errors?.owner && <div className='text-red-600 mt-1 text-sm'>{errors.owner[0]}</div>}

                        </div>
                        </div>
                        <div className="sm:col-span-6">
                            <label htmlFor="country" className="block text-sm/6 font-medium text-gray-900">
                                Volume
                            </label>
                            <div className="mt-2 grid grid-cols-1">
                                <select
                                id="volume"
                                name="volume"
                                value={values.volume || ''}
                                onChange={handleChange}
                                autoComplete="country-name"
                                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                >
                                    <option value="">Select Volume</option>
                                    {
                                        volumes.map(volume=>(
                                            <option key={volume} value={volume}>{volume}</option>
                                        ))
                                    }
                                </select>
                                <ChevronDownIcon
                                aria-hidden="true"
                                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                                />
                            </div>
                            {errors?.volume && <div className='text-red-600 mt-1 text-sm'>{errors.volume[0]}</div>}
                            
                        </div>
                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm/6 font-semibold text-gray-900" onClick={clearFields}>
                            Cancel
                            </button>
                            <button
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                            Save
                            </button>
                    </div>
                </div>
            </div>
            </form>
        </div>
    </div>
  )
}
