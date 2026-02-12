import React from 'react'
import PageComponent from '../../Components/PageComponent'
import ButtonCard from '../../Components/ButtonCard'
import { DocumentPlusIcon, UserPlusIcon } from '@heroicons/react/24/outline'

export default function Mining() {
  return (
    <PageComponent title="Mining Operations">
        <div className=' flex flex-wrap justify-center align-center mt-2' >
            <ButtonCard name="Daily Mining Records" to="/mining/daily">
                <DocumentPlusIcon className="h-8 w-8 text-[#4a91f1] group-hover:text-white" />
            </ButtonCard>     
        </div>
    </PageComponent>
  )
}
