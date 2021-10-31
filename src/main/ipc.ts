import { ipcMain } from 'electron';
import db from './db';

const registerIpc = () => {
  ipcMain.handle('checkForConfig', async () => {
    return db.configExists();
  });

  ipcMain.handle('saveConfig', async (_e, settings) => {
    if (!(await db.configExists())) {
      await db.createConfigTable();
      await db.createCustomersTable();
      await db.createChecksTable();
    }
    return db.saveConfig(settings);
  });

  ipcMain.handle('getConfig', async () => {
    const res = await db.getConfig();
    console.log('onGetConfig', res);
    return res;
  });
  ipcMain.handle('getCustomers', async () => {
    const res = await db.getCustomers();
    console.log('getCustomers', res);
    return res;
  });
  ipcMain.handle('saveCustomer', async (_e, customer) => {
    return db.saveCustomer(customer);
  });
  ipcMain.handle('getChecks', async () => {
    const res = await db.getChecks();
    console.log('getChecks', res);
    return res;
  });
  ipcMain.handle('saveCheck', async (_e, check) => {
    return db.saveCheck(check);
  });
};

export default registerIpc;
