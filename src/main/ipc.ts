import { ipcMain } from 'electron';
import db from './db';

const registerIpc = () => {
  ipcMain.on('checkForConfig', async (event) => {
    // console.log('checking for existing config');
    event.reply('checkForConfig', db.configExists());
  });

  ipcMain.on('saveConfig', async (event, settings) => {
    // console.log('checking for existing config');
    if (!db.configExists()) {
      db.createConfigTable();
      db.createCustomersTable();
      db.createChecksTable();
    }
    event.reply('saveConfig', await db.saveConfig(settings));
  });
};

export default registerIpc;
