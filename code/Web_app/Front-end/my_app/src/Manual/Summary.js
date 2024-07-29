import React from 'react';
import './css/Summary.css';
import { useUnifiedContext } from '../UnifiedContext';

const Summary = () => {
  const { shortcuts } = useUnifiedContext();

  return (
    <div className="summary-list">
      {shortcuts.map((listener, index) => (
        <div key={index} className="summary-item">
          <div className="summary-detail">
            <span className="summary-title">{listener.title}</span>
            <span className="summary-description">{listener.description}</span>
            <span className="summary-shortcut">{listener.key}</span>
          </div>
          <button className="manual-add-btn">Manual Add</button>
        </div>
      ))}
    </div>
  );
}

export default Summary;
