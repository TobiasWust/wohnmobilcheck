import { IConfig } from '../renderer/pages/Setup';

const edb = require('electron-db');

const db = {
  configExists: () => edb.tableExists('config'),
  createConfigTable: () => {
    edb.createTable('config', () => {});
  },
  saveConfig: (config: IConfig) => {
    return new Promise((resolve) => {
      if (edb.valid('config')) {
        edb.clearTable('config', (succ1: boolean) => {
          if (succ1) {
            edb.insertTableContent('config', config, (succ: boolean) => {
              resolve(succ);
            });
          }
        });
      }
      resolve(false);
    });
  },
  getConfig: () => {
    return new Promise((resolve) => {
      edb.getAll('config', (succ: boolean, data: IConfig[]) => {
        console.log('db tries to get cnfig', succ, data);
        if (succ) resolve(data);
      });
      resolve(false);
    });
  },
  createCustomersTable: () => {
    edb.createTable('customers', (...args: any) => ({ ...args }));
  },
  createChecksTable: () => {
    edb.createTable('checks', (...args: any) => ({ ...args }));
  },
};

export default db;
