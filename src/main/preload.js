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
