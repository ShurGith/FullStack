import {type PropsWithChildren} from 'react'

export default function ErrorMessage({children}: PropsWithChildren) {
  return (
    <div className='bg-red-500 text-xl text-center uppercase font-medium mb-2 text-white py-4 rounded-md'>
      {children}
    </div>
  )
}
