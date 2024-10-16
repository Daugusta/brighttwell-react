import React, { useState, useEffect } from 'react';

const ProgressBar = ({ progressValue }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(progressValue);
  }, [progressValue]);

  return (
    <div className="mb-4">
      <progress
        className=" h-10 w-full focus:outline-none focus:border-green-200 px-2 mt-2 text-sm"
        value={progress}
        max="100"
      ></progress>
    </div>
  );
};

export default ProgressBar;
