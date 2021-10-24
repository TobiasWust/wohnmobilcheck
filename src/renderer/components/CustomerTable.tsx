import { Button } from '@material-ui/core';
import { TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import api from '../api';
import { ICustomer } from '../pages/Customer';

const columns = [
  { field: 'lastName', headerName: 'Name', width: 150 },
  { field: 'firstName', headerName: 'Vorname', width: 150 },
  { field: 'street', headerName: 'Straße', width: 150 },
  { field: 'city', headerName: 'Stadt', width: 150 },
];

const CustomerTable = () => {
  const [customerFilter, setCustomerFilter] = useState('');
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const { push } = useHistory();

  useEffect(() => {
    api
      .getCustomers()
      .then((res: any) => {
        return setCustomers(res);
      })
      .catch(console.log);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <div
      style={{
        height: '100%',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
      }}
    >
      <h2>Kunden</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          gap: '1em',
        }}
      >
        <TextField
          label="Namen durchsuchen"
          value={customerFilter}
          onChange={(e) => setCustomerFilter(e.target.value)}
        />
        <DataGrid
          rows={customers.filter(
            (r) =>
              r.lastName.toLowerCase().includes(customerFilter.toLowerCase()) ||
              r.firstName.toLowerCase().includes(customerFilter.toLowerCase())
          )}
          columns={columns}
        />
        <Button variant="contained" onClick={() => push('/customer')}>
          Kunde Hinzufügen
        </Button>
      </div>
    </div>
  );
};

export default CustomerTable;
