import React from 'react'

const ImageUploader = () => {
  return (
    <>
        <div className='border border-white/10 rounded-xl px-8 py-6 mt-5'>
            <div>
                <h1 className='text-3xl lg:text-4xl mt-10 text-center font-bold text-[#134E4A] pb-6'>BioSort AI – Intelligent Biomedical Waste Segregation</h1>
                <p className='text-[#475569] text-2xl text-center px-10 py-4 font-bold'>BioSort AI is an intelligent waste segregation assistant that analyzes biomedical waste images and provides accurate classification, recycling guidance, and safe disposal instructions to promote cleaner and safer waste management.</p>
            </div>
        
            <div className='flex justify-center items-center gap-4 mt-6'>
                <input type="file" style={{background: "white", border: "2px dashed #14B8A6"}} className=' rounded-xl px-4 py-2 text-lg font-medium hover:text-gray-600 transition-colors cursor-pointer mr-2' />
                <button className='text-white 
                bg-[#16A34A] border border-white/10 hover:bg-[#15803D] rounded-xl px-4 py-2 text-lg font-medium hover:text-white transition-colors cursor-pointer'>Check</button>
            </div>

        </div>
    </>
  )
}

export default ImageUploader