import React from 'react'
import {  CheckIcon } from '@heroicons/react/24/solid'
import { useStateContext } from '../context/ContextProvider'
import { motion, AnimatePresence } from "framer-motion";


export default function Toast() {

    const {showToast,toast} = useStateContext()
  return (
    <AnimatePresence>
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className='w-[300px] p-3 fixed bottom-2 rounded-md right-2 bg-green-600 text-white'
        >
          <CheckIcon className='w-5 inline mr-3 text-white'/>
          {toast.message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
