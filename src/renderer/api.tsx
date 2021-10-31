// eslint-disable @typescript-eslint/no-explicit-any
declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        on: any;
        once: any;
        saveConfig: any;
        checkForConfig: any;
        getConfig: any;
        saveCustomer: any;
        getCustomers: any;
        saveCheck: any;
        getChecks: any;
        print: any;
      };
    };
  }
}

const api = window.electron.ipcRenderer;

export default api;
