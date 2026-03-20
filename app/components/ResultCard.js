import React, { useState } from 'react'

const ResultCard = ({result}) => {
  const [closedResult, setClosedResult] = useState(null);
  
  const isOpen = result && closedResult !== result;

  return (
    <div 
      className={`w-full max-w-4xl mx-auto transition-all duration-700 ease-in-out overflow-hidden transform ${
        isOpen ? 'max-h-[1000px] opacity-100 translate-y-0 mt-8' : 'max-h-0 opacity-0 -translate-y-4 mt-0'
      }`}
    >
      {result && (
        <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-teal-100 p-6 md:p-8 relative mb-8">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-[#134E4A] flex items-center gap-3">
              <span className="bg-[#E6FFFA] p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#14B8A6]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
              AI Analysis Report
            </h2>
            <button 
              onClick={() => setClosedResult(result)}
              className="text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer"
              title="Close Report"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Detected Item */}
            <div className="bg-[#F0FDF4] p-5 rounded-xl border border-green-100 hover:shadow-md transition-shadow">
              <span className="text-xs text-[#16A34A] font-bold uppercase tracking-wider mb-1 block">Detected Object</span>
              <p className="text-xl md:text-2xl text-[#134E4A] font-bold capitalize">{result.detected || 'Unknown'}</p>
            </div>
            
            {/* Category */}
            <div className="bg-blue-50 p-5 rounded-xl border border-blue-100 hover:shadow-md transition-shadow">
              <span className="text-xs text-blue-600 font-bold uppercase tracking-wider mb-1 block">Waste Category</span>
              <p className="text-xl md:text-2xl text-blue-900 font-bold capitalize">{result.category || 'Unknown'}</p>
            </div>
            
            {/* Risk Level */}
            <div className={`p-5 rounded-xl border hover:shadow-md transition-shadow ${
              result.riskLevel?.toLowerCase() === 'high' ? 'bg-red-50 border-red-100' : 
              result.riskLevel?.toLowerCase() === 'medium' ? 'bg-orange-50 border-orange-100' : 
              'bg-emerald-50 border-emerald-100'
            }`}>
              <span className={`text-xs font-bold uppercase tracking-wider mb-1 block ${
                result.riskLevel?.toLowerCase() === 'high' ? 'text-red-600' : 
                result.riskLevel?.toLowerCase() === 'medium' ? 'text-orange-600' : 
                'text-emerald-600'
              }`}>Risk Level</span>
              <div className="flex items-center gap-2">
                {result.riskLevel?.toLowerCase() === 'high' && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                )}
                <p className={`text-xl md:text-2xl font-bold capitalize ${
                  result.riskLevel?.toLowerCase() === 'high' ? 'text-red-900' : 
                  result.riskLevel?.toLowerCase() === 'medium' ? 'text-orange-900' : 
                  'text-emerald-900'
                }`}>{result.riskLevel || 'Unknown'}</p>
              </div>
            </div>
            
            {/* Disposal Method */}
            <div className="bg-slate-50 p-5 md:p-6 rounded-xl border border-slate-200 md:col-span-2 hover:shadow-md transition-shadow">
              <span className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Recommended Disposal Method
              </span>
              <p className="text-lg md:text-xl text-slate-700 font-medium leading-relaxed mt-2">{result.disposal || 'No disposal instructions available.'}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ResultCard