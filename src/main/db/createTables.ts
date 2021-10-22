const db = require('electron-db');

db.createTable('customers', (succ: boolean, msg: string) => {
  console.log('test');
  // succ - boolean, tells if the call is successful
  console.log(`Success: ${succ}`);
  console.log(`Message: ${msg}`);
});
