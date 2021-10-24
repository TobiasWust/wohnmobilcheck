const { contextBridge, ipcRenderer } = require('electron');

const validChannels = ['checkForConfig', 'saveConfig'];

contextBridge.exposeInMainWorld('electron', {
  ipcRenderer: {
    checkForConfig() {
      ipcRenderer.send('checkForConfig');
    },
    saveConfig(config) {
      ipcRenderer.send('saveConfig', config);
    },
    getConfig() {
      ipcRenderer.send('getConfig');
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
