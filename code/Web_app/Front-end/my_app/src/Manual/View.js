import React, { useState, useEffect } from 'react';
import './css/View.css';
import { useUnifiedContext } from '../UnifiedContext';
import ExportButton from './ExportButton';

const ViewComponent = () => {
  const { time, setTime, shortcuts, activatedShortcuts, activateShortcut, updateRatingForShortcut } = useUnifiedContext();
  const [searchText, setSearchText] = useState('');
  const [searchField, setSearchField] = useState('title');
  const [searchResults, setSearchResults] = useState([]);
  const [ratings, setRatings] = useState({});
  const [groupByTitle, setGroupByTitle] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const { playerRef } = useUnifiedContext();

  const handleUpload = async () => {
    setIsLoading(true);
    const videoFile = playerRef.current.getInternalPlayer().src;

    const response = await fetch(videoFile);
    const blob = await response.blob();
    const file = new File([blob], "video.mp4", { type: "video/mp4" });

    const formData = new FormData();
    formData.append("file", file);
    formData.append("shortcuts", JSON.stringify(activatedShortcuts));

    const uploadResponse = await fetch("http://127.0.0.1:8000/upload-video/", {
      method: "POST",
      body: formData,
    });

    if (uploadResponse.ok) {
      const blob = await uploadResponse.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'final_clip.mp4');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } else {
      console.error('Upload failed:', await uploadResponse.json());
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const results = searchText.trim()
      ? activatedShortcuts.filter(shortcut =>
          shortcut[searchField].toLowerCase().startsWith(searchText.toLowerCase())
        )
      : activatedShortcuts;
    setSearchResults(results);
  }, [activatedShortcuts, searchText, searchField]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const modifierKey = event.metaKey ? 'Cmd+' : event.ctrlKey ? 'Ctrl+' : '';
      const key = event.code;
      const adaptedKey = key.startsWith('Key') ? key.replace('Key', '') : key;
      const keyCombination = `${modifierKey}${adaptedKey}`;
    
      const foundShortcut = shortcuts.find((shortcut) => shortcut.key.toUpperCase() === keyCombination.toUpperCase());
      if (foundShortcut) {
        event.preventDefault();
        const newActivatedShortcut = {  
          id: Date.now() + Math.random(),
          title: foundShortcut.title,
          description: foundShortcut.description,
          time: time.toFixed(2), 
          rating: ratings[foundShortcut.id] || 0
        };
        activateShortcut(newActivatedShortcut);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, time, ratings, activateShortcut]);

  const handleSetTime = (clickedTime) => {
    setTime(Number(clickedTime));
  };

  const handleRatingChange = (id, newRating) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [id]: newRating,
    }));
    updateRatingForShortcut(id, newRating);
  };

  const groupedShortcuts = searchResults.reduce((acc, shortcut) => {
    const key = groupByTitle ? shortcut.title : shortcut.description;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(shortcut);
    return acc;
  }, {});

  return (
    <div className="view-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-message">
            Videoclip creating...
          </div>
        </div>
      )}
      <div className="button-container-info"> {/* Add this container */}
        <ExportButton />
        <button onClick={handleUpload} className="upload-button">Create VideoClip</button>
      </div>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder={`Search by ${searchField}...`}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="search-input"
        />
        <select
          value={searchField}
          onChange={(e) => setSearchField(e.target.value)}
          className="search-selector"
        >
          <option value="title">Title</option>
          <option value="description">Description</option>
        </select>
        <button onClick={() => setSearchResults(activatedShortcuts)} className="search-button">
          Search
        </button>
        <button onClick={() => setGroupByTitle(prev => !prev)} className="group-toggle-button">
          View {groupByTitle ? 'Description' : 'Title'}
        </button>
      </div>
      <div className="view-list">
        {Object.keys(groupedShortcuts).map((key, index) => (
          <details key={index} className="view-item">
            <summary className="view-title">{key} ({groupedShortcuts[key].length})</summary>
            {groupedShortcuts[key].map((shortcut, sIndex) => (
              <div key={sIndex} className="view-detail">
                <div className="view-description">
                  {groupByTitle ? shortcut.description : shortcut.title}
                </div>
                <div className="view-time" onClick={() => handleSetTime(shortcut.time)}>
                  {shortcut.time}
                </div>
                <div className="view-rating">
                  {[1, 2, 3, 4, 5].map(star => (
                    <div 
                      key={star}
                      className={`star-rating ${ratings[shortcut.id] >= star ? 'selected' : ''}`}
                      onClick={() => handleRatingChange(shortcut.id, star)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </details>
        ))}
      </div>
    </div>
  );
};

export default ViewComponent;
