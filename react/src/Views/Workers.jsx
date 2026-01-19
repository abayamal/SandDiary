import React from 'react'
import PageComponent from '../Components/PageComponent'
import ButtonCard from '../Components/ButtonCard'
import { UserPlusIcon } from '@heroicons/react/24/outline'
import { PencilSquareIcon } from '@heroicons/react/24/solid'


export default function Workers() {
  return (
        <PageComponent title="Workers">
            <div className=' flex flex-wrap justify-center align-center mt-2' >
                <ButtonCard name="Add Worker" to="/worker/add">
                    <UserPlusIcon className="h-8 w-8 text-[#4a91f1] group-hover:text-white" />
                </ButtonCard>     
            </div>
        </PageComponent>
  )
}
