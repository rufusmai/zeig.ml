import React from 'react'

type Props = {
  valid?: boolean
}

const Modal: React.FC<Props> = ({ valid, children }) => {
  return (
    <div className={`rounded-lg bg-white dark:bg-gray-800 border shadow-sm mt-2 p-3 ${valid || valid === undefined ? 'border-gray-400 dark:border-gray-500' : 'border-red-500 dark:border-red-500'}`}>
      {children}
    </div>
  )
}

export default Modal
