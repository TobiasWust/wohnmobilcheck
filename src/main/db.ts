const edb = require('electron-db');

const db = {
  configExists: () => edb.tableExists('config'),
  createConfigTable: () => {
    edb.createTable('config', (...args: any) => ({ ...args }));
  },
  saveConfig: (config: any) => {
    return new Promise((resolve) => {
      if (edb.valid('config')) {
        edb.insertTableContent('config', config, (succ: boolean) => {
          // succ - boolean, tells if the call is successful
          resolve(succ);
          // console.log(`Success: ${succ}`);
          // console.log(`Message: ${msg}`);
        });
      }
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
