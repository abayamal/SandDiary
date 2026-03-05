import React from 'react'
import PageComponent from '../../Components/PageComponent'
import ButtonCard from '../../Components/ButtonCard'
import {  TruckIcon } from '@heroicons/react/24/outline'

export default function Vehicles() {
  return (
    <PageComponent title="Vehicles">
        <div className=' flex flex-wrap justify-center align-center mt-2' >
            <ButtonCard name="Add Vehicles" to="/Vehicles/add">
                <TruckIcon className="h-8 w-8 text-[#4a91f1] group-hover:text-white" />
            </ButtonCard>     
        </div>
    </PageComponent>
  )
}
