import { Loader2 } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='fixed inset-0 flex gap-2 items-center justify-center bg-background'>
        <Loader2 className='w-6 h-6 animate-spin text-primary-700'/>
        <span className='text-sm font-medium text-primary-gray-500'> </span>
    </div>  
  )
}

export default Loading