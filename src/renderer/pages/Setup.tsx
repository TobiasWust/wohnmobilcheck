// welcome the user and send him to settings

import { Button } from '@material-ui/core';
import { TextField, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import api from '../api';
import Toast from '../components/Toast';
import promiseModal from '../helper/promiseModal';
import { handleInput } from '../utils';

export interface IConfig {
  companyName: string;
  street: string;
  city: string;
}

const Setup = () => {
  const { push } = useHistory();
  const useSettings = useState({
    companyName: '',
    street: '',
    city: '',
  });
  const [settings, setSettings] = useSettings;

  useEffect(() => {
    api
      .getConfig()
      .then((res: any) => {
        return setSettings(res[0]);
      })
      .catch(console.log);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h1>Einstellungen</h1>
      <p>Bitte mach ein paar Angaben zu deiner Firma.</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const configSaved = await api.saveConfig(settings);
          if (configSaved) {
            promiseModal(Toast, { type: 'success', message: 'gespeichert' });
            push('/');
          } else promiseModal(Toast, { type: 'error', message: 'nicht' });
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              id="companyName"
              value={settings.companyName}
              onChange={(e) => handleInput(e, useSettings)}
              label="Name der Firma"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="street"
              value={settings.street}
              onChange={(e) => handleInput(e, useSettings)}
              label="Straße und Hausnummer"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="city"
              value={settings.city}
              onChange={(e) => handleInput(e, useSettings)}
              label="Postleitzahl und Ort"
              required
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
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

export default Setup;
