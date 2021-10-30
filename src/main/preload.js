const { contextBridge, ipcRenderer } = require('electron');

const validChannels = ['checkForConfig', 'saveConfig'];

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    async checkForConfig() {
      return ipcRenderer.invoke('checkForConfig');
    },
    async saveConfig(config) {
      return ipcRenderer.invoke('saveConfig', config);
    },
    async getConfig() {
      return ipcRenderer.invoke('getConfig');
    },
    async getCustomers() {
      return ipcRenderer.invoke('getCustomers');
    },
    async saveCustomer(customer) {
      return ipcRenderer.invoke('saveCustomer', customer);
    },
    async getChecks() {
      return ipcRenderer.invoke('getChecks');
    },
    async saveChecks(check) {
      return ipcRenderer.invoke('saveChecks', check);
    },
    on(channel, func) {
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
    once(channel, func) {
      if (validChannels.includes(channel)) {
        // Deliberately strip event as it includes `sender`
        ipcRenderer.once(channel, (event, ...args) => func(...args));
      }
    },
  },
});
