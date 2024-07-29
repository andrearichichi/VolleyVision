import React, { useState } from 'react';
import MainPlayer from './MainPlayer';
import AiConfiguration from './AiConfiguration';
import './css/AiPage.css';
import { UnifiedProvider } from '../UnifiedContext';

const AiPage = () => {
  const [videoUrl, setVideoUrl] = useState(null);

  const handleFinishUpload = (url) => {
    setVideoUrl(url);
  };

  return (
    <UnifiedProvider>
      <div className="ai-page-container">
        {videoUrl ? (
          <MainPlayer files={[videoUrl]} />
        ) : (
          <AiConfiguration onFinish={handleFinishUpload} />
        )}
      </div>
    </UnifiedProvider>
  );
};

export default AiPage;
