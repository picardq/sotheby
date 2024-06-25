import React from 'react';

const FactToolForm = ({ text, handleChange, handleSubmit, isSubmitting }) => {
  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-gray-800 shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4" style={{ border: '2px solid #dedede' }}>
      <h2 className="text-center text-white text-3xl font-semibold mb-6">Fact Tool</h2>
      <label htmlFor="text" className="block text-gray-300 text-sm font-bold mb-2">
        Verification
      </label>
      <textarea
        id="text"
        name="text"
        className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg leading-tight focus:outline-none focus:ring focus:ring-blue-500 border-2 border-gray-600"
        rows="8"
        value={text}
        onChange={handleChange}
        disabled={isSubmitting}
        placeholder="Enter the link you want to verify..."
        style={{ resize: 'none' }}
      />
      <div className="text-center mt-4">
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg focus:outline-none transition duration-300 ease-in-out"
          disabled={isSubmitting}
          style={{ boxShadow: "0px 0px 20px rgba(0,0,0,0.3)" }}
        >
          {isSubmitting ? 'Submitting...' : 'Submit'}
        </button>
      </div>
    </form>
  );
};

export default FactToolForm;
