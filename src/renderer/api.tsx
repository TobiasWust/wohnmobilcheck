declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    electron: {
      ipcRenderer: {
        saveConfig: any;
        on: any;
        checkForConfig: any;
      };
    };
  }
}

const api = window.electron.ipcRenderer;

export default api;
