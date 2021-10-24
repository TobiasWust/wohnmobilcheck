import { ipcMain } from 'electron';
import db from './db';

const registerIpc = () => {
  ipcMain.on('checkForConfig', async (event) => {
    event.reply('checkForConfig', db.configExists());
  });

  ipcMain.on('saveConfig', async (event, settings) => {
    if (!db.configExists()) {
      db.createConfigTable();
      db.createCustomersTable();
      db.createChecksTable();
    }
    event.reply('saveConfig', await db.saveConfig(settings));
  });

  ipcMain.on('getConfig', async (event) => {
    console.log('onGetConfig');
    event.reply('getConfig', await db.getConfig());
  });
};

export default registerIpc;
