import { Box, Button } from '@material-ui/core';
import { TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import api from '../api';
import { ICustomer } from '../interfaces/interfaces';
import useStore from '../store';

const columns = [
  { field: 'lastName', headerName: 'Name', width: 150 },
  { field: 'firstName', headerName: 'Vorname', width: 150 },
  { field: 'street', headerName: 'Straße', width: 150 },
  { field: 'city', headerName: 'Stadt', width: 150 },
];

const CustomerTable = () => {
  const [customerFilter, setCustomerFilter] = useState('');
  const customers = useStore((state) => state.customers);
  const setCustomers = useStore((state) => state.setCustomers);
  const selectedCustomer = useStore((state) => state.selectedCustomer);
  const setSelectedCustomer = useStore((state) => state.setSelectedCustomer);
  const resetSelectedCheck = useStore((state) => state.resetSelectedCheck);
  const resetSelectedCustomer = useStore(
    (state) => state.resetSelectedCustomer
  );
  const [filteredCustomers, setFilteredCustomers] = useState<ICustomer[]>([]);
  const { push } = useHistory();

  useEffect(() => {
    setFilteredCustomers(
      customers.filter(
        (r) =>
          r.lastName.toLowerCase().includes(customerFilter.toLowerCase()) ||
          r.firstName.toLowerCase().includes(customerFilter.toLowerCase())
      )
    );
  }, [customers, customerFilter]);

  useEffect(() => {
    api
      .getCustomers()
      .then((res: ICustomer[]) => {
        return setCustomers(res);
      })
      // eslint-disable-next-line no-console
      .catch(console.log);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log('customers', customers);
  // console.log('filteredCustomers', filteredCustomers);
  // console.log('selectedCustomer', selectedCustomer);

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
          rows={[{ id: 0, lastName: 'Alle anzeigen' }, ...filteredCustomers]}
          columns={columns}
          autoPageSize
          selectionModel={selectedCustomer.id || 0}
          onSelectionModelChange={(e) => {
            resetSelectedCheck();
            const customer = customers.find((c) => c.id === e[0]);
            if (customer) setSelectedCustomer(customer);
            else resetSelectedCustomer();
          }}
          hideFooterSelectedRowCount
        />
        <Box
          sx={{
            display: 'grid',
            gridGap: '2em',
            justifyContent: 'end',
            gridAutoFlow: 'column',
          }}
        >
          <Button
            variant="contained"
            onClick={() => push('/customer')}
            disabled={!selectedCustomer}
          >
            {`${
              selectedCustomer
                ? `${selectedCustomer?.lastName} ${selectedCustomer?.firstName}`
                : ''
            } Bearbeiten`}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              resetSelectedCustomer();
              push('/customer');
            }}
          >
            Kunde Hinzufügen
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default CustomerTable;
