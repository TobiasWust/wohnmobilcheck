import { ICustomer } from '../renderer/pages/Customer';
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
  saveCustomer: (config: IConfig) => {
    return new Promise((resolve) => {
      if (edb.valid('customers')) {
        edb.insertTableContent('customers', config, (succ: boolean) => {
          resolve(succ);
        });
      }
      resolve(false);
    });
  },
  getCustomers: () => {
    return new Promise((resolve) => {
      edb.getAll('customers', (succ: boolean, data: ICustomer[]) => {
        console.log('getCustomers:', data);
        if (succ) resolve(data);
      });
      resolve(false);
    });
  },
};

export default db;
