import React, { useState } from 'react';
import analysis from '../assets/images/analysis.jpg';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

const About = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={analysis} alt='/' />
        <div className='flex flex-col justify-center'>
          <p className='text-[#e3e5d8] font-bold '></p>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>About Us</h1>
          <p>
            An independent endeavor, Sotheby's keeps an eye on the most pertinent global news.
            We carefully examine all available sources of information and give you the resources you need to tell the truth from falsehoods.
          </p>
          <p>
            Our group is committed to truthfulness and openness.
            We think that the key to assisting you in making wise decisions is giving you access to validated facts and the resources to support them.
          </p>
          <Link to="/Contact">
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#ffffff", color: "#000000", boxShadow: "0px 0px 20px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className={`bg-black text-white w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3 ${isHovered ? 'text-black bg-white' : ''}`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Contact 
            </motion.button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
