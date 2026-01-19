import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import PageComponent from '../Components/PageComponent'
import { useState } from 'react'
import axiosClient from '../../axios';
import { Link, useNavigate } from 'react-router-dom';
import { useStateContext } from '../context/ContextProvider';

export default function WorkerAdd() {

  const navigate = useNavigate();

  const [name,setName] = useState();
  const [nic,setNic] = useState();
  const [phone,setPhone] = useState();
  const [rateForCube,setRateForCube] = useState();
  const [rateForTractorLoad,setRateForTractorLoad] = useState();
  const [errors,setErrors] = useState({});
  const {showToast} = useStateContext();

  // function async onsubmit(ev){
  //   ev.preventDefault();
    
  // }

  const onsubmit = async (ev)=>{
    ev.preventDefault();
    try{
      const response = await axiosClient.post('/worker',{
        name,
        nic,
        phone,
        rateForCube,
        rateForTractorLoad
      });

      console.log('post submit');

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
        <form className='mx-auto px-5' onSubmit={onsubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                    Name
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        onChange={(ev)=>setName(ev.target.value)}
                        placeholder="janesmith"
                        className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      />
                    </div>
                  </div>
                  {errors?.name && <div className='text-red-600 mt-1 text-sm'>{errors.name[0]}</div>}
                </div>
                <div className="sm:col-span-6">
                  <label htmlFor="nic" className="block text-sm/6 font-medium text-gray-900">
                    Nic 
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <input
                        id="nic"
                        name="nic"
                        type="text"
                        onChange={(ev)=>setNic(ev.target.value)}
                        placeholder="951710407V"
                        className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      />
                    </div>
                  </div>
                  {errors?.nic && <div className='text-red-600 mt-1 text-sm'>{errors.nic[0]}</div>}
                </div>
                <div className="sm:col-span-6">
                  <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                    Phone
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <input
                        id="phone"
                        name="phone"
                        type="text"
                        onChange={(ev)=>setPhone(ev.target.value)}
                        placeholder="071370242"
                        className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      />
                    </div>
                  </div>
                  {errors?.phone && <div className='text-red-600 mt-1 text-sm'>{errors.phone[0]}</div>}

                </div>
                <div className="sm:col-span-6">
                  <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                    Daily rate per cube
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <input
                        id="rateForCube"
                        name="rateForCube"
                        type="text"
                        onChange={(ev)=>setRateForCube(ev.target.value)}
                        placeholder="5000"
                        className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      />
                    </div>
                  </div>
                  {errors?.rateForCube && <div className='text-red-600 mt-1 text-sm'>{errors.rateForCube[0]}</div>}
                </div>
                <div className="sm:col-span-6">
                  <label htmlFor="username" className="block text-sm/6 font-medium text-gray-900">
                    Daily rate per Tractor Load
                  </label>
                  <div className="mt-2">
                    <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                      <input
                        id="rateForTractorLoad"
                        name="rateForTractorLoad"
                        type="text"
                        onChange={(ev)=>setRateForTractorLoad(ev.target.value)}
                        placeholder="4000"
                        className="block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6"
                      />
                    </div>
                  </div>
                  {errors?.rateForTractorLoad && <div className='text-red-600 mt-1 text-sm'>{errors.rateForTractorLoad[0]}</div>}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            {/* <Link to="/workers"> */}
              <button type="button" className="text-sm/6 font-semibold text-gray-900 mr-2" onClick={()=>navigate("/workers")}>
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            {/* </Link> */}
          </div>
        </form>
      </div>
    </PageComponent>
  )
}
