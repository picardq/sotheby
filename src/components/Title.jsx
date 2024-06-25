import React from 'react';
import { ReactTyped } from 'react-typed';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Title = () => {
  return (
    <div className='text-white'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#e3e5d8] font-bold p-2'>
          {/*text*/}
        </p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
          Check information 
        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
            We guarantee you 
          </p>
          <ReactTyped
            className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
            strings={['quickness', 'reliability', 'reliability']}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-400'>Follow verified news with us</p>
        <Link to="/Resources/FactTool">
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "rgb(37, 99, 235)", color: "#ffffff", boxShadow: "0px 0px 20px rgba(0,0,0,0.3)" }}
            whileTap={{ scale: 0.95, backgroundColor: "#8a9446" }}
            className='bg-white text-black w-[200px] rounded-md font-medium my-6 mx-auto py-3 transition duration-300 ease-in-out'
          >
            Get Started
          </motion.button>
        </Link>
      </div>
    </div>
  );
};

export default Title;
