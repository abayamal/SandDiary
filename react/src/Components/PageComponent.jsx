import React from 'react'
import AddButton from './AddButton'

export default function PageComponent({title,children,actions}) {
  return (
   <>
        <header className="relative bg-white shadow-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
            {actions}
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-7xl px-4 py-1 sm:px-6 lg:px-8">{children}</div>
        </main>
   </>
  )
}
