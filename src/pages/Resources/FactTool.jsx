import React, { useState } from 'react';
import FactToolForm from '../../components/FactToolForm';
import FactToolResult from '../../components/FactToolResult';
import FactToolErrorMessage from '../../components/FactToolErrorMessage';

const FactTool = () => {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setErrorMessage('Please enter some text.');
      return;
    }

    if (!text.startsWith('http://') && !text.startsWith('https://')) {
      setErrorMessage('Please enter a valid URL.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Network response was not ok');
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setErrorMessage(`An error occurred: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen py-8">
      <div className="w-full max-w-md mx-auto">
        <FactToolForm
          text={text}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
        <FactToolErrorMessage errorMessage={errorMessage} />
        {result && <FactToolResult result={result} />}
      </div>
    </div>
  );
};

export default FactTool;
