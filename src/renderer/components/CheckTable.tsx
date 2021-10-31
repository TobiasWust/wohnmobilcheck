import { Box, Button } from '@material-ui/core';
import { TextField } from '@mui/material';
import { DataGrid, GridValueFormatterParams } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import api from '../api';
import { ICheck } from '../pages/Check';
import useStore from '../store';

const columns = [
  { field: 'car', headerName: 'Fahrzeug', flex: 1 },
  {
    field: 'created',
    headerName: 'Angelegt',
    flex: 1,
    valueFormatter: (params: GridValueFormatterParams) =>
      new Date(params.value as string).toLocaleDateString(),
  },
];

const CheckTable = () => {
  const [checkFilter, setCheckFilter] = useState('');
  const [checks, setChecks] = useState<ICheck[]>([]);
  const [selectedCheck, setSelectedCheck] = useState<ICheck | null | undefined>(
    null
  );
  const [filteredChecks, setFilteredChecks] = useState<ICheck[]>([]);
  const selectedCustomer = useStore((state) => state.selectedCustomer);
  const { push } = useHistory();

  useEffect(() => {
    setFilteredChecks(
      checks.filter(
        (r) =>
          r.car.toLowerCase().includes(checkFilter.toLowerCase()) &&
          r.customerId === selectedCustomer.id
      )
    );
  }, [checks, checkFilter, selectedCustomer]);

  useEffect(() => {
    api
      .getChecks()
      .then((res: ICheck[]) => {
        return setChecks(res);
      })
      // eslint-disable-next-line no-console
      .catch(console.log);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // console.log('checks', checks);
  // console.log('filteredChecks', filteredChecks);
  // console.log('selectedCheck', selectedCheck);

  return (
    <div
      style={{
        height: '100%',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
      }}
    >
      <h2>{`Checks von ${selectedCustomer.lastName} ${selectedCustomer.firstName}`}</h2>
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr auto',
          gap: '1em',
        }}
      >
        <TextField
          label="Fahrzeuge durchsuchen"
          value={checkFilter}
          onChange={(e) => setCheckFilter(e.target.value)}
        />
        <DataGrid
          rows={filteredChecks}
          columns={columns}
          onSelectionModelChange={(e) => {
            setSelectedCheck(checks.find((c) => c.id === e[0]));
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
            onClick={() => push('/check', { selectedCheck })}
            disabled={!selectedCheck}
          >
            Check Bearbeiten
          </Button>
          <Button
            variant="contained"
            onClick={() => push('/check')}
            disabled={!selectedCustomer.id}
          >
            Check Hinzufügen
          </Button>
        </Box>
      </div>
    </div>
  );
};

export default CheckTable;
