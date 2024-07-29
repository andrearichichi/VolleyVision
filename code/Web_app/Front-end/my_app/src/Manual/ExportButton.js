// ExportButton.js
// Bottone per esportare i dati in formato JSON situato sopra la ricerca titoli

import React from 'react';
import { useUnifiedContext } from '../UnifiedContext';

const ExportButton = () => {
  const { shortcuts, playerList, actionList, activatedShortcuts, time } = useUnifiedContext();

  const handleExport = () => {
    const dataToExport = {
      playerList,
      actionList,
      videoTime: time,
      shortcuts: shortcuts.map(s => ({
        key: s.key,
        title: s.title,
        description: s.description
      })),
      activatedShortcuts: activatedShortcuts.map(as => ({
        key: as.key,
        title: as.title,
        description: as.description,
        time: as.time,
        rating: as.rating // Ensure ratings are included in the export
      }))
    };

    const fileName = "exported_data.json";
    const jsonStr = JSON.stringify(dataToExport, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button className="button-export" onClick={handleExport}>Export Data</button>
  );
};

export default ExportButton;
