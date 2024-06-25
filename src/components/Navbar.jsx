import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom'; // Ensure Link is imported correctly
import { useSelector, useDispatch } from 'react-redux';
import { selectIsAuth, logout } from './../redux/slices/auth'; 

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [nav, setNav] = useState(false); 

  const handleNav = () => {
    setNav(!nav);
  };

  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4 text-white'>
      <h1 className='w-full text-3xl font-bold text-[#e3e5d8]'>
        <Link to='/'>Sotheby's</Link>
      </h1>
      <ul className='hidden md:flex flex-grow justify-end items-center'>
        <li className='p-4'><Link to='/Resources/FactTool'>Resources</Link></li>
        <li className='p-4'><Link to='/News'>News</Link></li>
        <li className='p-4'><Link to='/Contact'>Contact</Link></li>
        {!isAuth ? (
          <>
            <li className='p-4'>
              <Link
                to='/Login'
                className='bg-[#4361ee] text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition duration-300'
              >
                Login
              </Link>
            </li>
            <li className='p-4'>
              <Link
                to='/Registration'
                className='bg-[#e543ee] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300'
              >
                Registration
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className='p-4'>
              <Link
                to='/add-post' // Ensure this path matches your routing configuration
                className='flex items-center bg-[#4361ee] text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300'
                style={{ minWidth: '150px' }}
              >
                Write an article
              </Link>
            </li>
            <li className='p-4'>
              <button
                onClick={onClickLogout} // Bind the onClickLogout function
                className='bg-[#4361ee] text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300'
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#101511] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <li className='w-full text-3xl font-bold text-[#e3e5d8] m-4'>
          <Link to='/'>Sotheby's</Link>
        </li>
        <li className='p-4 border-b border-gray-600'><Link to='/Resources/FactTool'>Resources</Link></li>
        <li className='p-4 border-b border-gray-600'><Link to='/News'>News</Link></li>
        <li className='p-4'><Link to='/Contact'>Contact</Link></li>
        {!isAuth ? (
          <>
            <li className='p-4'>
              <Link
                to='/Login'
                className='bg-[#4361ee] text-white px-4 py-2 rounded-lg hover:bg-green-400 transition duration-300'
              >
                Login
              </Link>
            </li>
            <li className='p-2'>
              <Link
                to='/Registration'
                className='bg-[#e543ee] text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300'
              >
                Registration
              </Link>
            </li>
          </>
        ) : (
          <>
            <li className='p-4'>
              <Link
                to='/add-post' // Ensure this path matches your routing configuration
                className='flex items-center bg-[#4361ee] text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition duration-300'
                style={{ minWidth: '150px' }}
              >
                Write an article
              </Link>
            </li>
            <li className='p-2'>
              <button
                onClick={onClickLogout} // Bind the onClickLogout function
                className='bg-[#4361ee] text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300'
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
