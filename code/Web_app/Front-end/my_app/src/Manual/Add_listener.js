import React, { useState } from 'react';
import './css/Add_listener.css';
import { useUnifiedContext } from '../UnifiedContext';

const AddListenerComponent = ({ onAddListener }) => {
  const { addShortcut, playerList, actionList } = useUnifiedContext();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [shortcut, setShortcut] = useState('');
  const initialShortcuts = [
    { key: 'Cmd+a', name: 'Cmd + A' },
    { key: 'Cmd+b', name: 'Cmd + B' },
    { key: 'Cmd+c', name: 'Cmd + C' },
    { key: 'Cmd+d', name: 'Cmd + D' },
    { key: 'Cmd+e', name: 'Cmd + E' },
    { key: 'Cmd+f', name: 'Cmd + F' },
    { key: 'Cmd+g', name: 'Cmd + G' },
    { key: 'Cmd+h', name: 'Cmd + H' },
    { key: 'Cmd+i', name: 'Cmd + I' },
  ];
  const [availableShortcuts, setAvailableShortcuts] = useState(initialShortcuts);

  const handleSubmit = () => {
    if (title && description && shortcut) {
      const shortcutDetails = { key: shortcut, title, description };
      onAddListener(shortcutDetails);
      addShortcut(shortcutDetails);
      setTitle('');
      setDescription('');
      setShortcut('');
      setAvailableShortcuts((prev) => prev.filter(option => option.key !== shortcut));
    }
  };

  return (
    <div className="add-listener-comp">
      <select
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      >
        <option value="">Seleziona un giocatore</option>
        {playerList.map((player, index) => (
          <option key={index} value={player}>
            {player}
          </option>
        ))}
      </select>
      <select
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      >
        <option value="">Seleziona un'azione</option>
        {actionList.map((action, index) => (
          <option key={index} value={action}>
            {action}
          </option>
        ))}
      </select>
      <select
        value={shortcut}
        onChange={(e) => setShortcut(e.target.value)}
        disabled={availableShortcuts.length === 0}
      >
        <option value="">Seleziona una scorciatoia</option>
        {availableShortcuts.map(option => (
          <option key={option.key} value={option.key}>
            {option.name}
          </option>
        ))}
      </select>
      <button onClick={handleSubmit}>Aggiungi Listener</button>
    </div>
  );
};

export default AddListenerComponent;
