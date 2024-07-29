//New Project informazioni da inserire


import './css/ListConfiguration.css';
import React, { useState } from 'react';

const ListConfiguration = ({ onFinish }) => {
  const [playerInput, setPlayerInput] = useState('');
  const [actionInput, setActionInput] = useState('');
  const [players, setPlayers] = useState([]);
  const [actions, setActions] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const addPlayers = () => {
    const playerNames = playerInput.split('\n').filter(name => name.trim() !== '');
    if (playerNames.length) {
      setPlayers(currentPlayers => [...currentPlayers, ...playerNames]);
      setPlayerInput('');
    }
  };

  const addActions = () => {
    const actionNames = actionInput.split('\n').filter(name => name.trim() !== '');
    if (actionNames.length) {
      setActions(currentActions => [...currentActions, ...actionNames]);
      setActionInput('');
    }
  };

  const handleKeyPress = (event, type) => {
    if (event.key === 'Enter' && event.shiftKey === false) {
      event.preventDefault();
      if (type === 'player') {
        addPlayers();
      } else if (type === 'action') {
        addActions();
      }
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="config-overlay">
      <div className="config-container">
        <div className="list-config">
          <div className="list-input">
            <textarea
              placeholder="giocatori..."
              value={playerInput}
              onChange={(e) => setPlayerInput(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'player')}
              rows="3"
            />
            <button onClick={addPlayers}>Aggiungi giocatori</button>
          </div>
          <div className="list-display">
            {players.map((player, index) => <div key={index}>{player}</div>)}
          </div>
        </div>
        <div className="list-config">
          <div className="list-input">
            <textarea
              placeholder="azioni..."
              value={actionInput}
              onChange={(e) => setActionInput(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, 'action')}
              rows="3"
            />
            <button onClick={addActions}>Aggiungi azioni</button>
          </div>
          <div className="list-display">
            {actions.map((action, index) => <div key={index}>{action}</div>)}
          </div>
        </div>
        <div className="file-input">
          <input type="file" accept=".mp4" onChange={handleFileChange} />
          {selectedFile && <p> File selected: {selectedFile.name}</p>}
        </div>
        <button className="finish-btn" onClick={() => onFinish(players, actions, selectedFile)}>
            Fine
        </button>
      </div>
    </div>
  );
};

export default ListConfiguration;
