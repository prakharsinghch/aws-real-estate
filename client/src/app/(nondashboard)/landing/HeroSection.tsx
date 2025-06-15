"use client";

import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const HeroSection = () => {
  return (
    <div className="relative h-screen">
      <Image
        src="/landing-splash.jpg"
        alt="Rentiful Rental Platform Hero Section"
        fill
        className="object-cover object-center"
        priority
      />
    <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <motion.div
            initial={{ opacity: 0  ,y:20 }}
            animate={{ opacity: 1 , y:0 }}
            transition={{duration :0.8}}    
            className='absolute top-1/3 transform -translate-x-1/2 text-center w-full'
        >
            <div className='max-w-4-xl mx-auto px-16 sm:px-12'>
                <h1 className='text-white text-5xl font-bold  mb-4'>
                    Start your journey to find the perfect place to call home.
                </h1>
                <p className='text-xl text-white mb-8'>
                    Explore our listings and discover your dream rental apartment today! 
                </p>
                <div className='flex justify-center'>
                    <Input 
                        type="text"
                        value="search query"
                        onChange={() => {}}
                        placeholder='Seach by City, Neighborhood, or Address'
                        className='w-full max-w-lg rounded-none rounded-l-xl border-none bg-white h-12'
                    />
                    <Button 
                        onClick={() => {}}
                        className='bg-secondary-500  text-white rounded-none rounded-r-xl border-none hover:bg-secondary-600 h-12'>
                            Search
                        </Button>
                </div>
            </div>

        </motion.div>
    </div>

  )
}

export default HeroSection








