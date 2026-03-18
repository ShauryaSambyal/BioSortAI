import React from 'react'

const ImageUploader = () => {
  return (
    <>
        <div className='bg-black/80 backdrop-blur-xl border border-white/10 rounded-xl px-8 py-6 shadow-[0_20px_45px_rgba(0,0,0,0.6)] mt-5'>
            <div>
                <h1 className='text-3xl lg:text-4xl mt-10 text-center bg-linear-to-r from-white via-gray-500 font-bold to-white text-transparent bg-clip-text pb-6'>BioSort AI – Intelligent Biomedical Waste Segregation</h1>
                <p className='bg-linear-to-r from-white via-orange-400 to-white bg-clip-text text-transparent text-2xl text-center px-10 py-4 font-bold'>BioSort AI is an intelligent waste segregation assistant that analyzes biomedical waste images and provides accurate classification, recycling guidance, and safe disposal instructions to promote cleaner and safer waste management.</p>
            </div>
        
            <div className='flex justify-center items-center gap-4 mt-6'>
                <input type="file" className='bg-white border border-white/10 rounded-xl px-4 py-2 text-lg font-medium hover:text-gray-600 transition-colors cursor-pointer mr-2' />
                <button className='text-white border border-white/10 hover:bg-gray-500 rounded-xl px-4 py-2 text-lg font-medium hover:text-black transition-colors cursor-pointer'>Check</button>
            </div>

        </div>
    </>
  )
}

export default ImageUploader