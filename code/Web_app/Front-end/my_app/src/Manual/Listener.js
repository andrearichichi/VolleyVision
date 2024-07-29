import React, { useState } from 'react';
import './css/Listener.css';
import AddListener from './Add_listener';
import Summary from './Summary';

const Listener = () => {
  // Usa uno stato iniziale come array vuoto
  const [listenersData, setListenersData] = useState([]);

  // Aggiungi i nuovi dati all'array esistente
  const handleAddListenerData = (newData) => {
    setListenersData(currentListenersData => [...currentListenersData, newData]);
  };

  return (
    <div className="listener-inner">
      <div className="summary-listener">
        <Summary data={listenersData} />
      </div>
      <div className="add-listener">
        <AddListener onAddListener={handleAddListenerData} />
      </div>
    </div>
  );
}

export default Listener;
