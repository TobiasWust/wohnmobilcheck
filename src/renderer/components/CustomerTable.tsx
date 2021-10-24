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
    <div>
      <h1>Kunden</h1>
      <div style={{ height: 300, width: '100%' }}>
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
        <Button onClick={() => push('/customer')}>Kunden Hinzufügen</Button>
      </div>
    </div>
  );
};

export default CustomerTable;
