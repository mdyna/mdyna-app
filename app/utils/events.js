// eslint-disable-next-line
import { ipcRenderer } from 'electron';
import { toast } from 'react-toastify';

const EVENTS = {
  EXPORT_BOARD: 'EXPORT_BOARD',
  IMPORT_FILES_REPLY: 'IMPORT_FILES_REPLY',
  IMPORT_FILES: 'IMPORT_FILES',
  CHANGED_CWD: 'CHANGED_CWD',
  CHECK_UPDATES: 'CHECK_UPDATES',
  UPDATE_AVAILABLE: 'UPDATE_AVAILABLE',
  UPDATE_NOT_AVAILABLE: 'UPDATE_NOT_AVAILABLE',
};

export const changeCwdEvent = () => {
  ipcRenderer.send(EVENTS.CHANGED_CWD);
};

export const callFolderPicker = (board) => {
  ipcRenderer.send(EVENTS.EXPORT_BOARD, board);
};

export const importFiles = () => {
  ipcRenderer.send(EVENTS.IMPORT_FILES);
};

export const importFilesListener = (callback) => {
  ipcRenderer.on(EVENTS.IMPORT_FILES_REPLY, async (e, importedCards) => {
    callback(importedCards);
  });
};

export const updatesListener = () => {
  ipcRenderer.send(EVENTS.CHECK_UPDATES);
  ipcRenderer.on(EVENTS.UPDATE_AVAILABLE, () => {
    toast.warn('Update available !');
  });
  ipcRenderer.on(EVENTS.UPDATE_NOT_AVAILABLE, () => {
    toast.success('MDyna is up to date');
  });
};
