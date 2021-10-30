// create check name / adress

// welcome the user and send him to check

import { Button } from '@material-ui/core';
import { TextField, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useHistory } from 'react-router';
import api from '../api';
import Toast from '../components/Toast';
import promiseModal from '../helper/promiseModal';
import { handleInput } from '../utils';

export interface ICheck {
  id?: number;
  car: string;
}

const Check = () => {
  const { push, location } = useHistory();
  const { selectedCheck } = (location.state as {
    selectedCheck: Partial<ICheck>;
  }) || {
    selectedCheck: { lastName: '', firstName: '', street: '', city: '' },
  };
  const useCheck = useState(selectedCheck);
  const [check] = useCheck;

  return (
    <div>
      <h1>Check anlegen</h1>
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
