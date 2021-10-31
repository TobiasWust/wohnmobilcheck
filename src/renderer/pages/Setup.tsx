// welcome the user and send him to settings

import { Button } from '@material-ui/core';
import { TextField, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useHistory } from 'react-router';
import api from '../api';
import Toast from '../components/Toast';
import promiseModal from '../helper/promiseModal';
import useStore from '../store';
import { handleInput } from '../utils';

const Setup = () => {
  const { push } = useHistory();
  const settings = useStore((state) => state.settings);
  const setSettings = useStore((state) => state.setSettings);

  const useSettings = [settings, setSettings];

  return (
    <div
      style={{
        padding: '3em',
      }}
    >
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
            <TextField
              id="phone"
              value={settings.phone}
              onChange={(e) => handleInput(e, useSettings)}
              label="Telefon"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="mail"
              value={settings.mail}
              onChange={(e) => handleInput(e, useSettings)}
              label="E-Mail"
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
