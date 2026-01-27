import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'


export default function PaginationLinks({meta,changeUrl}) {

    console.log(meta);

    const clickPagination = (url)=>{
        changeUrl(url);
    }


  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{meta.from}</span> to <span className="font-medium">{meta.to}</span> of{' '}
            <span className="font-medium">{meta.total}</span> results
          </p>
        </div>
        <div>
          <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-xs">
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5" />
            </a>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
    
            {meta?.links?.map((link,index)=>{
                 let label = link.label;

                if (label === "&laquo; Previous") label = "Previous";
                if (label === "Next &raquo;") label = "Next";
               return (
                <a
                    key={index}
                    href={link.url ?? "#"}
                    aria-current={link.active ? "page" : undefined}
                    className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold
                    ${link.active
                        ? "z-10 bg-indigo-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"}
                    ${!link.url ? "cursor-not-allowed opacity-50" : ""}
                    `}
                    onClick={(e) => {
                        e.preventDefault();
                        if(link.url){
                            clickPagination(link.url);
                        }

                    }}
                >
                    {label}
                </a>
               );
            })}
          
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 inset-ring inset-ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  )
}
