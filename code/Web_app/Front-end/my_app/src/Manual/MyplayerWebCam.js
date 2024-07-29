// Player con webcam

import React, { useRef, useEffect } from 'react';
import './MyPlayer.css';
import { usePlayer } from './PlayerContext'; // Importa l'hook del contesto

function MyPlayer() {
  const videoRef = useRef(null); // Riferimento all'elemento video
  const { setTime } = usePlayer(); // Utilizza il contesto per setTime

  useEffect(() => {
    // Ottiene lo stream dalla webcam
    const getVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Errore nell'acquisizione dello stream della webcam:", err);
      }
    };

    getVideo();

    // Aggiorna il contesto con il tempo corrente del video
    // Nota: Questa parte potrebbe non essere necessaria o dover essere adattata
    // per lavorare con l'elemento video HTML nativo anziché con ReactPlayer
    const interval = setInterval(() => {
      if (videoRef.current) {
        // Il tempo potrebbe non essere disponibile in questo contesto come con ReactPlayer
        // setTime(videoRef.current.getCurrentTime());
      }
    }, 1000); // Aggiorna ogni secondo

    return () => clearInterval(interval);
  }, [setTime]);

  return (
    <div className="player-wrapper">
        <video
          ref={videoRef}
          className="react-player"
          width="100%"
          height="100%"
          controls
          autoPlay // Avvia automaticamente la riproduzione dello stream della webcam
        />
    </div>
  );
}

export default MyPlayer;
