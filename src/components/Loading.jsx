import React from 'react'

const Loading = () => {
  return (
    <div className="z-50 fixed inset-0 bg-white flex flex-col items-center justify-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-800 border-solid mb-6"></div>
      <h1 className="text-normal font-bold text-2xl">Tunggu yaa...</h1>
    </div>
  )
}

export default Loading
