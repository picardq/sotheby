import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Link = () => {
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true); // Стан для відображення помилки
  const [isSubmitting, setIsSubmitting] = useState(false); // Стан для відображення загрузки

  const handleSubscribe = async () => {
    try {
      if (!isValidEmail || !email.trim()) {
        return;
      }

      setIsSubmitting(true);

      const response = await fetch('http://localhost:4444/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      setIsSubmitting(false);

      if (response.ok) {
        alert('You have been subscribed successfully!');
        setEmail(''); 
      } else {
        const data = await response.json();
        alert(`Subscription failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('An error occurred while subscribing.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setEmail(value);
    validateEmail(value); 
  };

  const validateEmail = (email) => {
    
    const isValid = /\S+@\S+\.\S+/.test(email);
    setIsValidEmail(isValid);
  };

  return (
    <div className='w-full py-16 text-white px-4'>
      <div className='max-w-[1240px] mx-auto grid lg:grid-cols-3'>
        <div className='lg:col-span-2 my-4'>
          <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>
            Want tips & tricks to optimize your flow?
          </h1>
          <p>Sign up to our newsletter and stay up to date.</p>
        </div>
        <div className='my-4'>
          <div className='flex flex-col sm:flex-row items-center justify-between w-full'>
            <input
              className={`p-3 flex w-full rounded-md text-black ${isValidEmail ? '' : 'border-red-500'}`}
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={handleChange}
            />
            <motion.button
              whileHover={{
                scale: 1.05,
                backgroundColor: '#1f3fa5',
                color: '#ffffff',
                boxShadow: '0px 0px 20px rgba(0,0,0,0.3)',
              }}
              whileTap={{ scale: 0.95, backgroundColor: '#1a2c67' }}
              className='bg-white text-black rounded-md font-medium w-[200px] ml-4 my-6 px-6 py-3 transition duration-300 ease-in-out'
              onClick={handleSubscribe}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Subscribing...' : 'Notify'}
            </motion.button>
          </div>
          {!isValidEmail && (
            <p className='text-red-500 text-sm mt-1'>
              Please enter a valid email address.
            </p>
          )}
          <p>
            We care about the protection of your data. Read our{' '}
            <motion.span
              initial={{ color: '#717446' }}
              whileHover={{ color: '#ffffff' }}
              transition={{ duration: 0.3 }}
            >
              <a
                href='https://policies.google.com/privacy?hl=en-US'
                target='_blank'
                rel='noopener noreferrer'
                className='text-[#60a5fa] hover:text-white transition duration-300 ease-in-out'
              >
                Privacy Policy
              </a>
            </motion.span>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Link;
