// create check name / adress

// welcome the user and send him to check

import { Button } from '@material-ui/core';
import { TextField, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import api from '../api';
import CheckItem from '../components/CheckItem';
import Toast from '../components/Toast';
import promiseModal from '../helper/promiseModal';
import useStore from '../store';
import { handleInput } from '../utils';

const Check = () => {
  const { push } = useHistory();
  const selectedCheck = useStore((state) => state.selectedCheck);
  const setSelectedCheck = useStore((state) => state.setSelectedCheck);
  const selectedCustomer = useStore((state) => state.selectedCustomer);

  const useCheck = useState(selectedCheck);
  const [check, setCheck] = useCheck;

  useEffect(() => {
    if (selectedCheck.id) return;
    if (selectedCustomer.id)
      setSelectedCheck({
        ...selectedCheck,
        created: new Date().toString(),
        customerId: selectedCustomer.id,
      });
  }, [selectedCheck, selectedCustomer, setSelectedCheck]);

  const handleCheck = (e: any) => {
    setCheck({
      ...check,
      values: {
        ...check.values,
        [e.id]: e,
      },
    });
  };

  return (
    <div>
      <h1>Check {selectedCheck.id ? 'bearbeiten' : 'anlegen'}</h1>
      <p>
        {`Kunde: ${selectedCustomer.lastName} ${selectedCustomer.firstName}`}
      </p>
      <p>{`Check angelegt: ${new Date(
        check.created as string
      ).toLocaleDateString()}`}</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const checkSaved = await api.saveCheck(check);
          if (checkSaved) {
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
              id="car"
              value={check.car}
              onChange={(e) => handleInput(e, useCheck)}
              label="Fahrzeug"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <h2>Außencheck</h2>
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="smell"
              value={check.values.smell}
              label="Geruchsprobe"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="sack"
              value={check.values.sack}
              label="Sackprobe"
              type="rating"
              onChange={handleCheck}
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

export default Check;
