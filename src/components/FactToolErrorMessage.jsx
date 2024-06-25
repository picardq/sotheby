import React from 'react';

const FactToolErrorMessage = ({ errorMessage }) => {
  return (
    <div className="text-center">
      {errorMessage && (
        <p className="text-red-500 font-semibold mt-4">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FactToolErrorMessage;
