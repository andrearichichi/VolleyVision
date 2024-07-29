// index.js
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Manual from './Manual/Manual';
import AiPage from './Ai/AiPage'; // Importa il componente AiPage
import './index.css';
import logo from './Logo.png';

const App = () => {
  const [view, setView] = useState('home');

  const handleManualClick = () => {
    setView('manual');
  };

  const handleAIClick = () => {
    setView('ai');
  };

  if (view === 'manual') {
    return <Manual />;
  }

  if (view === 'ai') {
    return <AiPage />;
  }

  return (
    <div className="index-app-container">
      <img src={logo} alt="VolleyVisionAI Logo" className="index-logo" />
      <h1>Which functionality do you want to use?</h1>
      <div className="index-button-container">
        <button onClick={handleManualClick} className="index-choice-btn">Manual</button>
        <button onClick={handleAIClick} className="index-choice-btn">AI</button>
      </div>
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
