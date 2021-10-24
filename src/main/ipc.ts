import { ipcMain } from 'electron';
import db from './db';

const registerIpc = () => {
  ipcMain.handle('checkForConfig', async () => {
    return db.configExists();
  });

  ipcMain.handle('saveConfig', async (_e, settings) => {
    if (!db.configExists()) {
      db.createConfigTable();
      db.createCustomersTable();
      db.createChecksTable();
    }
    return db.saveConfig(settings);
  });

  ipcMain.handle('getConfig', async () => {
    const res = await db.getConfig();
    console.log('onGetConfig', res);
    return res;
  });
};

export default registerIpc;
