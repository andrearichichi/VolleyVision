import React, { useState } from 'react';
import './css/AiConfiguration.css';

const AiConfiguration = ({ onFinish }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [uploadError, setUploadError] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleVideoUpload = (event) => {
    setVideoFile(event.target.files[0]);
    setUploadError(''); // Clear any previous errors
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleFinishUpload = async () => {
    if (!videoFile) {
      setUploadError('Please select a video file to upload.');
      return;
    }
    if (!selectedOption) {
      setUploadError('Please select a recognition option.');
      return;
    }

    setIsLoading(true); // Set loading state
    const formData = new FormData();
    formData.append('file', videoFile);
    formData.append('recognitionOption', selectedOption);

    try {
      const uploadResponse = await fetch("http://127.0.0.1:8000/ai-video/", {
        method: "POST",
        body: formData,
      });

      if (uploadResponse.ok) {
        const blob = await uploadResponse.blob();
        const videoUrl = URL.createObjectURL(blob);
        onFinish(videoUrl);  // Pass the blob URL to the player
      } else {
        const errorData = await uploadResponse.json();
        setUploadError(errorData.message || 'Error uploading file');
      }
    } catch (error) {
      setUploadError('An error occurred while uploading the file');
    } finally {
      setIsLoading(false); // Clear loading state
    }
  };

  return (
    <div className="ai-config-overlay">
      <div className="ai-config-container">
        <div className="file-input">
          <label className="file-label">Upload Video File:</label>
          <input type="file" accept="video/*" onChange={handleVideoUpload} />
          {videoFile && <p>Video File: {videoFile.name}</p>}
        </div>
        <div className="recognition-options">
          <label htmlFor="recognitionSelect">Select Recognition Option:</label>
          <select id="recognitionSelect" value={selectedOption} onChange={handleOptionChange}>
            <option value="" disabled>Select an option</option>
            <option value="ballRecognition">Ball</option>
            <option value="playerRecognition">Players</option>
          </select>
        </div>
        <button className="finish-btn" onClick={handleFinishUpload} disabled={!videoFile || !selectedOption}>
          Finish Upload
        </button>
        {uploadError && <p className="error-message">{uploadError}</p>}
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-message">
              Applying Model...
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AiConfiguration;
