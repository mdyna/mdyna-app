// eslint-disable-next-line
import { ipcRenderer } from 'electron';

const EVENTS = {
  EXPORT_BOARD: 'EXPORT_BOARD',
  IMPORT_FILES_REPLY: 'IMPORT_FILES_REPLY',
  IMPORT_FILES: 'IMPORT_FILES',
  CHANGED_CWD: 'CHANGED_CWD',
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
