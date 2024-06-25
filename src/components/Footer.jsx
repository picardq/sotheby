import React from 'react';
import { Instagram, Facebook, Twitter, GitHub } from "react-feather";
import IconButton from './IconButton';

const Footer = () => {
  return (
    <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300'>
      <div>
        <h1 className='w-full text-3xl font-bold text-[#e3e5d8]'>Sotheby's</h1>
        <p className='py-4'>Sotheby's is a separate initiative that is entirely student-run.</p>
        <div className='flex justify-between md:w-[75%] my-6'>
          <IconButton text="Instagram" color="bg-gradient-to-tr from-yellow-500 to-purple-500 via-pink-500">
            <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
              <Instagram size={30} />
            </a>
          </IconButton>
          <IconButton text="Facebook" color="bg-blue-500">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <Facebook size={30} />
            </a>
          </IconButton>
          <IconButton text="Twitter" color="bg-sky-500">
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Twitter size={30} />
            </a>
          </IconButton>
          <IconButton text="GitHub" color="bg-gray-700">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <GitHub size={30} />
            </a>
          </IconButton>
        </div>
      </div>
      <div className='lg:col-span-2 flex justify-between mt-6'>
        <div>
          <h6 className='font-medium text-gray-400'>Solutions</h6>
          <ul>
            <li className='py-2 text-sm'>
              <a href='/'>Commerce</a>
            </li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium text-gray-400'>Support</h6>
          <ul>
            <li className='py-2 text-sm'>
              <a href='/'>Documentation</a>
            </li>
            <li className='py-2 text-sm'>
              <a href='/'>Guides</a>
            </li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium text-gray-400'>Company</h6>
          <ul>
            <li className='py-2 text-sm'>
              <a href='/'>About</a>
            </li>
            <li className='py-2 text-sm'>
              <a href='/'>Who we are</a>
            </li>
            <li className='py-2 text-sm'>
              <a href='/'>Blog</a>
            </li>
          </ul>
        </div>
        <div>
          <h6 className='font-medium text-gray-400'>Legal</h6>
          <ul>
            <li className='py-2 text-sm'>
              <a href='https://policies.google.com/terms?hl=en-US' target='_blank' rel='noopener noreferrer'>Terms</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
