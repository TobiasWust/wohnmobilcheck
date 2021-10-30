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
  saveCustomer: (customer: ICustomer) => {
    return new Promise((resolve) => {
      if (edb.valid('customers')) {
        if (customer.id) {
          edb.updateRow(
            'customers',
            { id: customer.id },
            customer,
            (succ: boolean) => {
              resolve(succ);
            }
          );
        } else {
          edb.insertTableContent('customers', customer, (succ: boolean) => {
            resolve(succ);
          });
        }
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
