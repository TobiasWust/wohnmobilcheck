// create check name / adress

// welcome the user and send him to check

import { Button } from '@material-ui/core';
import { Box } from '@mui/system';
import { useMemo } from 'react';
import { useHistory } from 'react-router';
import api from '../api';
import CheckItem from '../components/CheckItem';
import CompanyAdress from '../components/CompanyAdress';
import CustomerAdress from '../components/CustomerAdress';
import useStore from '../store';

const Protocol = () => {
  const { push } = useHistory();
  const customers = useStore((state) => state.customers);
  const checks = useStore((state) => state.checks);
  const id = useStore((state) => state.selectedCheck.id);

  const check = useMemo(() => checks.find((e) => e.id === id), [checks, id]);

  const customer = useMemo(
    () => customers.find((c) => c.id === check?.customerId),
    [customers, check]
  );

  if (!check) return <div>Error</div>;
  if (!customer) return <div>Error</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <CompanyAdress />
        <CustomerAdress customer={customer} />
      </div>
      <h1>Prüfprotokoll</h1>
      <p>
        <strong>Fahrzeug:</strong> {check.car}
      </p>
      <div style={{ display: 'grid' }}>
        <h2>Dokumente</h2>
        <CheckItem
          id="fjn"
          value={check.values.fjn}
          label="Fahrzeugschein verglichen mit FJN"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="hu"
          value={check.values.hu}
          label="HU Unterlagen"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="gasbuch"
          value={check.values.gasbuch}
          label="Gasprüfbuch und Plakette"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="zgg"
          value={check.values.zgg}
          label="Fahrzeugschein ZGG Führerscheinklasse"
          type="checkbox"
          disabled
        />
        <h2>Sicherheitsausstattung</h2>
        <CheckItem
          id="warndreieck"
          value={check.values.warndreieck}
          label="Warndreieck"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="keile"
          value={check.values.keile}
          label="Vorlegekeile"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="erstehilfe"
          value={check.values.erstehilfe}
          label="Erste Hilfe Kasten"
          type="checkbox"
          disabled
        />
        <h2>Außenprüfung</h2>
        <CheckItem
          id="licht"
          value={check.values.licht}
          label="Lichttest / Beleuchtung"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="scheinwerfer"
          value={check.values.scheinwerfer}
          label="Scheinwerfereinstellug"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="sichtaussen"
          value={check.values.sichtaussen}
          label="Sichtprüfung außen"
          details="Unfallschaden, Hagelschade, geklebte Teile"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="sichtfahrzeug"
          value={check.values.sichtfahrzeug}
          label="Sichtprüfung Fahrzeugtechnik"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="sichtoben"
          value={check.values.sichtoben}
          label="Sichtprüfung oben"
          details="Ausbauten, Befestigungen Dachluken"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="sichtunten"
          value={check.values.sichtunten}
          label="Sichtprüfung Unterboden"
          details="Rost, Versiegelung, Schmutz, Anbauteile"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="sichtbremse"
          value={check.values.sichtbremse}
          label="Sichtprüfung Bremse"
          details="Bremse, Bremsleitungen, Schläuche, Bowdenzügen"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="auflaufbremse"
          value={check.values.auflaufbremse}
          label="Prüfung Auflaufbremse"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="daempfer"
          value={check.values.daempfer}
          label="Prüfung Dämpfer"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="azv"
          value={check.values.azv}
          label="Prüfung AZV"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="reifen"
          value={check.values.reifen}
          label="Sichtprüfung Bereifung"
          details="Alter, Größe, Traglast, Risse, Profil"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="frontscheibe"
          value={check.values.frontscheibe}
          label="Sichtprüfung Frontscheibe"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="fenster"
          value={check.values.fenster}
          label="Sichtprüfung weitere Fenster"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="gewicht"
          value={check.values.gewicht}
          label="Gewichtsprüfung"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="wasserfull"
          value={check.values.wasserfull}
          label="Sichtprüfung Wassereinfüllstutzen"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="sichtgas"
          value={check.values.sichtgas}
          label="Sichtprüfung Gas"
          details="Gasflaschen, Schlauch, Druckminderer, Aufbewahrungskasten"
          type="checkbox"
          disabled
        />
        <h2>Innenprüfung</h2>
        <CheckItem
          id="smell"
          value={check.values.smell}
          label="Geruch"
          type="rating"
          disabled
        />
        <CheckItem
          id="dusche"
          value={check.values.dusche}
          label="Dusche"
          type="rating"
          disabled
        />
        <CheckItem
          id="innengas"
          value={check.values.innengas}
          label="Gas"
          type="rating"
          disabled
        />
        <CheckItem
          id="heizung"
          value={check.values.heizung}
          label="Heizung"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="toilet"
          value={check.values.toilet}
          label="Prüfung Kassetten-Toilette"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="herd"
          value={check.values.herd}
          label="Funktionsprüfung Gasherd"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="fridge"
          value={check.values.fridge}
          label="Funktionsprüfung Kühlschrank"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="water"
          value={check.values.water}
          label="Prüfung Wasser"
          details="Tank, Leitungen, Abwassertank"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="dichtwater"
          value={check.values.dichtwater}
          label="Dichtigkeitsprüfung Wasser"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="dichtgas"
          value={check.values.dichtgas}
          label="Dichtigkeitsprüfung Gas"
          type="checkbox"
          disabled
        />
        <h2>Ergebnise</h2>
        <CheckItem
          id="success"
          value={check.values.success}
          label="Prüfung bestanden"
          type="checkbox"
          disabled
        />
        <CheckItem
          id="zustand"
          value={check.values.zustand}
          label="Gesamtzustand"
          type="rating"
          disabled
        />
        <Box
          className="no-print"
          sx={{
            display: 'grid',
            gridGap: '2em',
            justifyContent: 'end',
            gridAutoFlow: 'column',
            padding: '2em',
          }}
        >
          <Button variant="contained" onClick={() => push('/')}>
            Schließen
          </Button>
          <Button variant="contained" onClick={() => api.print()}>
            Drucken
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default Protocol;
