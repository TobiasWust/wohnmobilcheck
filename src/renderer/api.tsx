declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    electron: {
      ipcRenderer: {
        on: any;
        once: any;
        saveConfig: any;
        checkForConfig: any;
        getConfig: any;
      };
    };
  }
}

const api = window.electron.ipcRenderer;

export default api;
