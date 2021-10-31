// create check name / adress

// welcome the user and send him to check

import { Button } from '@material-ui/core';
import { TextField, Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import api from '../api';
import CheckItem from '../components/CheckItem';
import Toast from '../components/Toast';
import promiseModal from '../helper/promiseModal';
import useStore from '../store';
import { handleInput } from '../utils';

const Check = () => {
  const { push } = useHistory();
  const selectedCustomer = useStore((state) => state.selectedCustomer);
  const selectedCheck = useStore((state) =>
    state.selectedCheck.id
      ? state.selectedCheck
      : {
          ...state.selectedCheck,
          created: new Date().toISOString(),
          customerId: selectedCustomer.id,
        }
  );
  const customers = useStore((state) => state.customers);

  const customer = useMemo(
    () => customers.find((c) => c.id === selectedCheck.customerId),
    [selectedCheck.customerId, customers]
  );

  const useCheck = useState(selectedCheck);
  const [check, setCheck] = useCheck;

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
      <p>{`Kunde: ${customer?.lastName} ${customer?.firstName}`}</p>
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
            <h2>Dokumente</h2>
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="fjn"
              value={check.values.fjn}
              label="Fahrzeugschein verglichen mit FJN"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="hu"
              value={check.values.hu}
              label="HU Unterlagen"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="gasbuch"
              value={check.values.gasbuch}
              label="Gasprüfbuch und Plakette"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="zgg"
              value={check.values.zgg}
              label="Fahrzeugschein ZGG Führerscheinklasse"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <h2>Sicherheitsausstattung</h2>
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="warndreieck"
              value={check.values.warndreieck}
              label="Warndreieck"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>{' '}
          <Grid item xs={12}>
            <CheckItem
              id="keile"
              value={check.values.keile}
              label="Vorlegekeile"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="erstehilfe"
              value={check.values.erstehilfe}
              label="Erste Hilfe Kasten"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <h2>Außenprüfung</h2>
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="licht"
              value={check.values.licht}
              label="Lichttest / Beleuchtung"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="scheinwerfer"
              value={check.values.scheinwerfer}
              label="Scheinwerfereinstellug"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="sichtaussen"
              value={check.values.sichtaussen}
              label="Sichtprüfung außen"
              details="Unfallschaden, Hagelschade, geklebte Teile"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="sichtfahrzeug"
              value={check.values.sichtfahrzeug}
              label="Sichtprüfung Fahrzeugtechnik"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="sichtoben"
              value={check.values.sichtoben}
              label="Sichtprüfung oben"
              details="Ausbauten, Befestigungen Dachluken"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="sichtunten"
              value={check.values.sichtunten}
              label="Sichtprüfung Unterboden"
              details="Rost, Versiegelung, Schmutz, Anbauteile"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="sichtbremse"
              value={check.values.sichtbremse}
              label="Sichtprüfung Bremse"
              details="Bremse, Bremsleitungen, Schläuche, Bowdenzügen"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="auflaufbremse"
              value={check.values.auflaufbremse}
              label="Prüfung Auflaufbremse"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="daempfer"
              value={check.values.daempfer}
              label="Prüfung Dämpfer"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="azv"
              value={check.values.azv}
              label="Prüfung AZV"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="reifen"
              value={check.values.reifen}
              label="Sichtprüfung Bereifung"
              details="Alter, Größe, Traglast, Risse, Profil"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="frontscheibe"
              value={check.values.frontscheibe}
              label="Sichtprüfung Frontscheibe"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="fenster"
              value={check.values.fenster}
              label="Sichtprüfung weitere Fenster"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="gewicht"
              value={check.values.gewicht}
              label="Gewichtsprüfung"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="wasserfull"
              value={check.values.wasserfull}
              label="Sichtprüfung Wassereinfüllstutzen"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="sichtgas"
              value={check.values.sichtgas}
              label="Sichtprüfung Gas"
              details="Gasflaschen, Schlauch, Druckminderer, Aufbewahrungskasten"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <h2>Innenprüfung</h2>
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="smell"
              value={check.values.smell}
              label="Geruch"
              type="rating"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="dusche"
              value={check.values.dusche}
              label="Dusche"
              type="rating"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="innengas"
              value={check.values.innengas}
              label="Gas"
              type="rating"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="heizung"
              value={check.values.heizung}
              label="Heizung"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="toilet"
              value={check.values.toilet}
              label="Prüfung Kassetten-Toilette"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="herd"
              value={check.values.herd}
              label="Funktionsprüfung Gasherd"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="fridge"
              value={check.values.fridge}
              label="Funktionsprüfung Kühlschrank"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="water"
              value={check.values.water}
              label="Prüfung Wasser"
              details="Tank, Leitungen, Abwassertank"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="dichtwater"
              value={check.values.dichtwater}
              label="Dichtigkeisprüfung Wasser"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="dichtgas"
              value={check.values.dichtgas}
              label="Dichtigkeisprüfung Gas"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <h2>Ergebnise</h2>
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="success"
              value={check.values.success}
              label="Prüfung bestanden"
              type="checkbox"
              onChange={handleCheck}
            />
          </Grid>
          <Grid item xs={12}>
            <CheckItem
              id="zustand"
              value={check.values.zustand}
              label="Gesamtzustand"
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
                padding: '2em',
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
