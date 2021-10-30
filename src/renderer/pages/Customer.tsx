// create customer name / adress

// welcome the user and send him to customer

import { Button } from '@material-ui/core';
import { TextField, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useHistory } from 'react-router';
import api from '../api';
import Toast from '../components/Toast';
import promiseModal from '../helper/promiseModal';
import { handleInput } from '../utils';

export interface ICustomer {
  id?: number;
  lastName: string;
  firstName: string;
  street: string;
  city: string;
}

const Customer = () => {
  const { push, location } = useHistory();
  const { selectedCustomer } = (location.state as {
    selectedCustomer: Partial<ICustomer>;
  }) || {
    selectedCustomer: { lastName: '', firstName: '', street: '', city: '' },
  };
  const useCustomer = useState(selectedCustomer);
  const [customer] = useCustomer;

  // will need something like this for edit cusotmer later
  // useEffect(() => {
  //   api
  //     .getConfig()
  //     .then((res: any) => {
  //       return setCustomer(res[0]);
  //     })
  //     .catch(console.log);
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h1>Kunden anlegen</h1>
      <p>Bitte mach ein paar Angaben zum Kunden.</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const customerSaved = await api.saveCustomer(customer);
          if (customerSaved) {
            promiseModal(Toast, { type: 'success', message: 'gespeichert' });
            push('/');
          } else
            promiseModal(Toast, {
              type: 'error',
              message: 'nicht gespeichert',
            });
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="lastName"
              value={customer.lastName}
              onChange={(e) => handleInput(e, useCustomer)}
              label="Nachname"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="firstName"
              value={customer.firstName}
              onChange={(e) => handleInput(e, useCustomer)}
              label="Vorname"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="street"
              value={customer.street}
              onChange={(e) => handleInput(e, useCustomer)}
              label="Straße und Hausnummer"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="city"
              value={customer.city}
              onChange={(e) => handleInput(e, useCustomer)}
              label="Postleitzahl und Ort"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                display: 'grid',
                gridGap: '2em',
                justifyContent: 'end',
                gridAutoFlow: 'column',
              }}
            >
              <Button variant="contained" onClick={() => push('/')}>
                Abbrechen
              </Button>
              <Button type="submit" variant="contained">
                Speichern
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Customer;
