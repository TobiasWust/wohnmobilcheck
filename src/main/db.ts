import { ICustomer, IConfig } from '../renderer/interfaces/interfaces';
import { ICheck } from '../renderer/pages/Check';

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
  saveCheck: (check: ICheck) => {
    return new Promise((resolve) => {
      if (edb.valid('checks')) {
        if (check.id) {
          edb.updateRow('checks', { id: check.id }, check, (succ: boolean) => {
            resolve(succ);
          });
        } else {
          edb.insertTableContent('checks', check, (succ: boolean) => {
            resolve(succ);
          });
        }
      }
      resolve(false);
    });
  },
  getChecks: () => {
    return new Promise((resolve) => {
      edb.getAll('checks', (succ: boolean, data: ICheck[]) => {
        console.log('getChecks:', data);
        if (succ) resolve(data);
      });
      resolve(false);
    });
  },
};

export default db;
