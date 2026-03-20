import React from 'react'

const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-8 p-8 w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-teal-100 mb-8 transition-all animate-in fade-in zoom-in duration-500">
      <div className="relative flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#14B8A6] border-l-4 border-l-transparent border-r-4 border-r-transparent"></div>
        <div className="absolute inset-0 flex justify-center items-center">
          <div className="h-6 w-6 rounded-full bg-teal-100 animate-pulse"></div>
        </div>
      </div>
      <p className="mt-5 text-lg text-[#134E4A] font-bold tracking-wide animate-pulse">Analyzing Biomedical Waste...</p>
      <p className="text-sm text-gray-500 mt-2">This may take a few moments</p>
    </div>
  )
}

export default LoadingSpinner