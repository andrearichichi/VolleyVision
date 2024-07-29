// MyPlayer.js
// Pagina per la visualizzazione del video e per il disegno sullo stesso
import React, { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { ReactSketchCanvas } from 'react-sketch-canvas';
import './css/MyPlayer.css';
import { useUnifiedContext } from '../UnifiedContext';

const MyPlayer = ({ file }) => {
  const { time, playerRef } = useUnifiedContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [isBuffering, setIsBuffering] = useState(false);

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  useEffect(() => {
    const player = playerRef.current;
    if (player && player.seekTo && !isPlaying) {
      player.seekTo(time, 'seconds');
    }
  }, [time, isPlaying, playerRef]);

  const handleBuffer = () => {
    setIsBuffering(true);
  };

  const handleBufferEnd = () => {
    setIsBuffering(false);
  };

  return (
    <div className="player-wrapper">
      <ReactPlayer
        ref={playerRef}
        className="react-player"
        url={videoUrl}
        width="100%"
        height="100%"
        controls={true}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onBuffer={handleBuffer}
        onBufferEnd={handleBufferEnd}
      />
      {isBuffering && <div className="loading-spinner">Loading...</div>}
      <button onClick={() => setShowCanvas(!showCanvas)} className="canvas-button">Draw In</button>
      {showCanvas && (
        <ReactSketchCanvas
          style={{ position: 'absolute', top: '5.5%', right: '1%', width: '61.8%', height: '50%' }}
          strokeWidth={5}
          strokeColor="blue"
          canvasColor="rgba(0,0,0,0.2)"
        />
      )}
    </div>
  );
};

export default MyPlayer;
