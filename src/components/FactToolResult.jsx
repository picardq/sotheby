import React, { useState } from 'react';

const FactToolResult = ({ result }) => {
  const { label, probability, confidence, title, keywords, summary, url } = result;
  const realConfidence = confidence.REAL * 100;
  const fakeConfidence = confidence.FAKE * 100;
  const textColorClass = label.toLowerCase() === 'real' ? 'text-green-500' : 'text-red-500';

  const [showExtended, setShowExtended] = useState(false);

  const toggleExtendedView = () => {
    setShowExtended(!showExtended);
  };

  return (
    <div className="flex justify-center items-start py-8">
      <div className="w-full max-w-4xl mx-auto p-4">
        <div className="max-w-screen-md mx-auto text-center text-white">
          <p className="font-semibold">
            The model predicts that this news is: <span className={`font-bold ${textColorClass}`}>{label}</span>
          </p>
          <p className="font-semibold">
            Probability of being REAL: <span className="font-bold text-green-500">{probability.REAL}%</span>
          </p>
          <p className="font-semibold">
            Probability of being FAKE: <span className="font-bold text-red-500">{probability.FAKE}%</span>
          </p>
          <div className="mt-4">
            {!showExtended ? (
              <div className="flex justify-center mb-4">
                <button
                  className="text-white underline hover:text-gray-300 transition duration-300 ease-in-out"
                  onClick={toggleExtendedView}
                >
                  View Details
                </button>
              </div>
            ) : (
              <ExtendedDetailsTable
                title={title}
                keywords={keywords}
                summary={summary}
                url={url}
                realConfidence={realConfidence}
                fakeConfidence={fakeConfidence}
                confidence={confidence}
                toggleExtendedView={toggleExtendedView}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const ExtendedDetailsTable = ({ title, keywords, summary, url, realConfidence, fakeConfidence, confidence, toggleExtendedView }) => {
  return (
    <div className="max-w-screen-md mx-auto text-left text-white mt-4">
      <table className="w-full table-fixed divide-y divide-gray-200">
        <tbody>
          <tr>
            <td className="font-semibold border border-gray-400 px-4 py-2 w-1/4">Title:</td>
            <td className="border border-gray-400 px-4 py-2">{title}</td>
          </tr>
          <tr>
            <td className="font-semibold border border-gray-400 px-4 py-2">Keywords:</td>
            <td className="border border-gray-400 px-4 py-2">{keywords.join(', ')}</td>
          </tr>
          <tr>
            <td className="font-semibold border border-gray-400 px-4 py-2">Summary:</td>
            <td className="border border-gray-400 px-4 py-2">{summary}</td>
          </tr>
          <tr>
            <td className="font-semibold border border-gray-400 px-4 py-2">URL:</td>
            <td className="border border-gray-400 px-4 py-2">
              <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline break-words">
                {url}
              </a>
            </td>
          </tr>
          <tr>
            <td className="font-semibold border border-gray-400 px-4 py-2">Confidence:</td>
            <td className="border border-gray-400 px-4 py-2">
              <div className="flex items-center mb-2">
                <span className="text-white mr-2">REAL:</span>
                <div className="bg-green-300 h-2 w-full rounded-full overflow-hidden">
                  <div className="bg-green-500 h-2" style={{ width: `${realConfidence}%` }}></div>
                </div>
                <span className="text-green-500 ml-2 font-bold">{confidence.REAL.toFixed(2)}</span>
              </div>
              <div className="flex items-center">
                <span className="text-white mr-2">FAKE:</span>
                <div className="bg-red-300 h-2 w-full rounded-full overflow-hidden">
                  <div className="bg-red-500 h-2" style={{ width: `${fakeConfidence}%` }}></div>
                </div>
                <span className="text-red-500 ml-2 font-bold">{confidence.FAKE.toFixed(2)}</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-center mt-4">
        <button
          className="text-white underline hover:text-gray-300 transition duration-300 ease-in-out"
          onClick={toggleExtendedView}
        >
          Hide Details
        </button>
      </div>
    </div>
  );
};

export default FactToolResult;
