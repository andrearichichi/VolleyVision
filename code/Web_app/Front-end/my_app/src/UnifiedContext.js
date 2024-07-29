import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const UnifiedContext = createContext();

export const useUnifiedContext = () => useContext(UnifiedContext);

export const UnifiedProvider = ({ children, initialPlayers = [], initialActions = [], initialShortcuts = [], initialActivatedShortcuts = [] }) => {
  const [time, setTime] = useState(0);
  const [shortcuts, setShortcuts] = useState(initialShortcuts.map(shortcut => ({ ...shortcut, id: Date.now() + Math.random() })));
  const [activatedShortcuts, setActivatedShortcuts] = useState(initialActivatedShortcuts.map(shortcut => ({ ...shortcut, id: Date.now() + Math.random() })));
  const [playerList, setPlayerList] = useState(initialPlayers);
  const [actionList, setActionList] = useState(initialActions);
  const playerRef = useRef(null);

  const addShortcut = (shortcut) => {
    setShortcuts((prev) => [...prev, { ...shortcut, id: Date.now() + Math.random() }]);
  };

  const activateShortcut = (shortcut) => {
    setActivatedShortcuts((prev) => [
      ...prev, 
      {
        ...shortcut,
        id: Date.now() + Math.random(),
        time: time.toFixed(2),
      }
    ]);
  };

  const updateRatingForShortcut = (id, newRating) => {
    setActivatedShortcuts((prev) => prev.map(as => as.id === id ? { ...as, rating: newRating } : as));
  };

  const setPlayersAndActions = (newPlayers, newActions) => {
    setPlayerList(newPlayers);
    setActionList(newActions);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const player = playerRef.current;
      if (player && player.getCurrentTime) {
        setTime(player.getCurrentTime());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [setTime]);

  const value = {
    time,
    setTime,
    shortcuts,
    addShortcut,
    activatedShortcuts,
    activateShortcut,
    updateRatingForShortcut,
    playerList,
    actionList,
    setPlayersAndActions,
    playerRef,
  };

  return <UnifiedContext.Provider value={value}>{children}</UnifiedContext.Provider>;
};
