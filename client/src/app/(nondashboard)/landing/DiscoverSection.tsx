"use client"

import React from 'react'
import {motion} from 'framer-motion'
import Image from 'next/image'

const containerVariants = {
    hidden: {opacity: 0},
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    }
}

const itemVariants = {
    hidden: {opacity: 0, y: 20},
    visible: {opacity: 1, y: 0},
}

const DiscoverSection = () => {
  return (
    <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true , amount: 0.8 }}
        variants={containerVariants}
        className="py-12 bg-white mb-16"
    >
    <div className='max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16'>
        <motion.h2
            variants={itemVariants}
            className='my-12 text-center'
    
        >
            <h2 className='text-3xl font-semibold  leading-tight text-gray=800'>Discover</h2>
            <p className='mt-4 text-lg text-gray-600'>
                Find your perfect rental apartment with ease and confidence!
            </p>
            <p className='mt-2 text-gray-500 max-w-3xl mx-auto'>
                Our platform offers a wide range of rental listings, advanced search filters, and user reviews to help you make informed decisions. 
                Whether you're looking for a cozy studio or a spacious family home, we've got you covered.
            </p>
        </motion.h2>
        <div className='grid gridcols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 text-center'>
            {[
                {
                    imageSrc: "/landing-icon-wand.png",
                    title: "Search Rentals",
                    Description: "Easily search for rental apartments based on your preferences, including location, price range, and amenities.",
                },
                {
                    imageSrc: "/landing-icon-calendar.png",
                    title: "Book Your Rental",
                    Description: "Book your rental apartment directly through our platform, ensuring a seamless and secure transaction."
                },
                {
                    imageSrc: "/landing-icon-heart.png",
                    title: "Enjoy Your Stay",
                    Description: "Enjoy your stay in your new rental apartment, with the peace of mind that comes from knowing you've made an informed choice.",
                },
            ].map((card, index) => (
                <motion.div key={index} variants={itemVariants}>
                    <DiscovCard {...card} />
                </motion.div>
            ))}  
        </div>
    </div>
    </motion.div>
  );
};

const DiscovCard = ({
    imageSrc,
    title,
    Description,
} : {
    imageSrc : string;
    title : string;
    Description : string;
}) => (
    <div className='px-4 py-12 shadow-lg rounded-lg bg-primary-50 md:h-72'> 
        <div className='bg-primary-700 p-[0.6rem] rounded-full mb-4 h-10 w-10 mx-auto'>
            <Image
                src = {imageSrc}
                width={30}
                height={30}
                className='w-full h-full'
                alt={title} />
        </div>
        <h3 className='mt-4 text-xl font-medium text-gray-800'>{title}</h3>
        <p className='mt-2 text-base text-gray-500'>{Description}</p>
    </div>
);
 
export default DiscoverSection;