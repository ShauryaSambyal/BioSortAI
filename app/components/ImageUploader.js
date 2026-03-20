'use client'
import React, { useState } from 'react'
import ResultCard from './ResultCard'
import LoadingSpinner from './LoadingSpinner'
//I want to pass the result to ResultCard component

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!file) return;

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("data", file);

      const res = await fetch("https://api-biosort.onrender.com/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing image:", error);
    } finally {
      setLoading(false);
    }
  };
  console.log(result)
  return (
    <>
        <div className='border border-white/10 rounded-xl px-4 sm:px-8 py-6 mt-5 w-full'>
            <div>
                <h1 className='text-2xl sm:text-3xl lg:text-4xl mt-6 sm:mt-10 text-center font-bold text-[#134E4A] pb-4 sm:pb-6'>BioSort AI – Intelligent Biomedical Waste Segregation</h1>
                <p className='text-[#475569] text-base sm:text-xl lg:text-2xl text-center px-1 sm:px-10 py-2 sm:py-4 font-medium sm:font-bold leading-relaxed'>BioSort AI is an intelligent waste segregation assistant that analyzes biomedical waste images and provides accurate classification, recycling guidance, and safe disposal instructions to promote cleaner and safer waste management.</p>
            </div>
        
            <div className='flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4 sm:gap-6 mt-8 w-full max-w-3xl mx-auto'>
                <input 
                  type="file" 
                  onChange={(e) => setFile(e.target.files[0])} 
                  style={{background: "white", border: "2px dashed #14B8A6"}} 
                  className='flex-1 w-full rounded-xl px-4 py-3 sm:py-4 text-sm sm:text-base font-medium file:cursor-pointer file:border-0 file:bg-teal-50 file:text-teal-700 file:font-semibold file:px-4 file:py-2 file:mr-4 file:rounded-lg hover:file:bg-teal-100 transition-all cursor-pointer text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500/50' 
                />
                <button 
                  onClick={handleAnalyze} 
                  disabled={loading || !file}
                  className={`w-full sm:w-auto px-8 py-3 sm:py-4 rounded-xl text-lg font-bold text-white transition-all duration-300 shadow-md whitespace-nowrap ${
                    loading || !file 
                    ? 'bg-gray-400 cursor-not-allowed opacity-70' 
                    : 'bg-[#16A34A] border border-white/10 hover:bg-[#15803D] hover:shadow-lg hover:-translate-y-0.5 cursor-pointer'
                  }`}
                >
                  {loading ? 'Analyzing...' : 'AI Analyze'}
                </button>
            </div>

        </div>
        {loading && <LoadingSpinner />}
        <ResultCard result={result} />
    </>
  )
}

export default ImageUploader