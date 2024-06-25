import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import { motion } from 'framer-motion';

const ContactForm = () => {
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    // Validate form fields
    const name = form.current.from_name.value.trim();
    const email = form.current.from_email.value.trim();
    const message = form.current.message.value.trim();

    if (!name || !email || !message) {
      setStatus('Please fill in all fields.');
      return;
    }

    setIsSubmitting(true);

    emailjs
      .sendForm('service_d1qgmna', 'template_2wixdjn', form.current, 'xrcf2x1qc41-zZV1S')
      .then(
        (result) => {
          setStatus('Message sent successfully!');
          console.log('SUCCESS!', result.text);
        },
        (error) => {
          setStatus('Failed to send message. Please try again later.');
          console.log('FAILED...', error.text);
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="py-8">
      <div className="max-w-md mx-auto">
        <form
          ref={form}
          onSubmit={sendEmail}
          className="bg-gray-800 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4"
          style={{ border: '2px solid #dedede' }}
        >
          <h2 className="text-center text-white text-3xl font-semibold mb-8">Contact Us</h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-white text-sm font-semibold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="from_name"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg leading-tight focus:outline-none focus:ring focus:ring-blue-500 border-2 border-gray-600"
              disabled={isSubmitting}
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-white text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="from_email"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg leading-tight focus:outline-none focus:ring focus:ring-blue-500 border-2 border-gray-600"
              disabled={isSubmitting}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-white text-sm font-semibold mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg leading-tight focus:outline-none focus:ring focus:ring-blue-500 border-2 border-gray-600"
              rows="5"
              disabled={isSubmitting}
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div className="flex justify-center">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, backgroundColor: "#3182CE", boxShadow: "0px 0px 20px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.95, backgroundColor: "#2C5282" }}
              className={`bg-blue-500 hover:bg-blue-600 text-white py-3 px-16 rounded-lg focus:outline-none transition duration-300 ease-in-out ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </motion.button>
          </div>
          {status && (
            <div className="text-center mt-2">
              <p className={`inline-block ${status.includes('successfully') ? 'text-green-500' : 'text-red-500'}`}>{status}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactForm;
