import React from 'react'

interface ErrorComponentProps {
    error: string;
}

const ErrorComponent:React.FC<ErrorComponentProps> = ({error}) => {
  return (
    <div className='min-h-40 text-red-300 flex h-full items-center justify-center'><p>{error}</p></div>
  )
}

export default ErrorComponent