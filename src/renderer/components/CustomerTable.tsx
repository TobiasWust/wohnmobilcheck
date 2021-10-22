import { TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useState } from 'react';

const rows = [
  { id: 1, name: 'Wust', firstname: 'Tobias' },
  { id: 2, name: 'Ruppert', firstname: 'Hann' },
  { id: 3, name: 'Vogel', firstname: 'Anne' },
];

const columns = [
  { field: 'name', headerName: 'Name', width: 150 },
  { field: 'firstname', headerName: 'Vorname', width: 150 },
];

const CustomerTable = () => {
  const [customer, setCustomer] = useState('');
  return (
    <div>
      <h1>Kunden</h1>
      <div style={{ height: 300, width: '100%' }}>
        <TextField
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
        <DataGrid
          rows={rows.filter(
            (r) =>
              r.name.toLowerCase().includes(customer.toLowerCase()) ||
              r.firstname.toLowerCase().includes(customer.toLowerCase())
          )}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default CustomerTable;
