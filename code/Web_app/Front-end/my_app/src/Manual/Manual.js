// Manual.js
import React, { useState } from 'react';
import ListConfiguration from './ListConfiguration';
import MyPlayer from './MyPlayer';
import View from './View';
import Listener from './Listener';
import { UnifiedProvider } from '../UnifiedContext';
import UploadConfiguration from './UploadConfiguration';
import './css/Manual.css';

const Manual = () => {
  const [videoFile, setVideoFile] = useState(null);
  const [configuringLists, setConfiguringLists] = useState(false);
  const [uploadingProject, setUploadingProject] = useState(false);
  const [players, setPlayers] = useState([]);
  const [actions, setActions] = useState([]);
  const [shortcuts, setShortcuts] = useState([]);
  const [activatedShortcuts, setActivatedShortcuts] = useState([]);
  const [isAppReady, setIsAppReady] = useState(false);

  const handleNewProject = () => {
    setConfiguringLists(true);
  };

  const handleUploadProject = () => {
    setUploadingProject(true);
  };

  const handleFinishLists = (newPlayers, newActions, file) => {
    setPlayers(newPlayers);
    setActions(newActions);
    setVideoFile(file);
    setConfiguringLists(false);
    setIsAppReady(true);
  };

  const handleFinishUpload = (jsonData, videoFile) => {
    setPlayers(jsonData.playerList);
    setActions(jsonData.actionList);
    setShortcuts(jsonData.shortcuts.map(shortcut => ({ ...shortcut, id: Date.now() + Math.random() })));
    setActivatedShortcuts(jsonData.activatedShortcuts.map(shortcut => ({ ...shortcut, id: Date.now() + Math.random() })));
    setVideoFile(videoFile);
    setUploadingProject(false);
    setIsAppReady(true);
  };

  if (configuringLists) {
    return <ListConfiguration onFinish={handleFinishLists} />;
  }

  if (uploadingProject) {
    return <UploadConfiguration onFinish={handleFinishUpload} />;
  }

  if (isAppReady) {
    return (
      <UnifiedProvider initialPlayers={players} initialActions={actions} initialShortcuts={shortcuts} initialActivatedShortcuts={activatedShortcuts}>
        <div className="app-container">
          <div className="left-component">
            <View />
          </div>
          <div className="right-container">
            <div className="player">
              <MyPlayer file={videoFile} />
            </div>
            <div className="listener">
              <Listener />
            </div>
          </div>
        </div>
      </UnifiedProvider>
    );
  }

  return (
    <div className="initial-choice-overlay">
      <div className="initial-choice">
        <button className="choice-btn" onClick={handleNewProject}>New Project...</button>
        <button className="choice-btn" onClick={handleUploadProject}>Upload Project...</button>
      </div>
    </div>
  );
};

export default Manual;
