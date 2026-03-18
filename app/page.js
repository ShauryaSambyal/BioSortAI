'use client'
import React from 'react'
import ImageUploader from './components/ImageUploader';
import Header from './components/Header';

const page = () => {
  return (
    <>
      <div className='min-h-screen overflow-hidden text-black px-8'>
        <Header />
        <ImageUploader />
      </div>
    </>
  )
}

export default page