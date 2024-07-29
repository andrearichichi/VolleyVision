// UploadConfiguration.js
import React, { useState } from 'react';
import './css/UploadConfiguration.css';

const UploadConfiguration = ({ onFinish }) => {
  const [jsonFile, setJsonFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);

  const handleJsonUpload = (event) => {
    setJsonFile(event.target.files[0]);
  };

  const handleVideoUpload = (event) => {
    setVideoFile(event.target.files[0]);
  };

  const handleFinishUpload = () => {
    if (jsonFile && videoFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const jsonData = JSON.parse(e.target.result);
        onFinish(jsonData, videoFile);
      };
      reader.readAsText(jsonFile);
    }
  };

  return (
    <div className="upload-config-overlay">
      <div className="upload-config-container">
        <div className="file-input">
          <label className="file-label">Carica il file JSON:</label>
          <input type="file" accept="application/json" onChange={handleJsonUpload} />
          {jsonFile && <p>JSON File: {jsonFile.name}</p>}
        </div>
        <div className="file-input">
          <label className="file-label">Carica il file video:</label>
          <input type="file" accept="video/*" onChange={handleVideoUpload} />
          {videoFile && <p>Video File: {videoFile.name}</p>}
        </div>
        <button className="finish-btn" onClick={handleFinishUpload} disabled={!jsonFile || !videoFile}>
          Finish Upload
        </button>
      </div>
    </div>
  );
};

export default UploadConfiguration;
