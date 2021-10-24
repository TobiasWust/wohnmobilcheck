import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import CustomerTable from '../components/CustomerTable';
// search customer
// customer table
// create customer

// search customer
// check table
// create check
const Home = () => {
  const { push } = useHistory();
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        height: '100vh',
        padding: '3em',
        boxSizing: 'border-box',
      }}
    >
      <div>
        <h1>Wohnwagen Checker</h1>
        <Button variant="contained" onClick={() => push('/settings')}>
          Firmendaten ändern
        </Button>
      </div>
      <div style={{ display: 'grid', gridAutoFlow: 'column', gap: '2em' }}>
        <div>
          <CustomerTable />
        </div>
        <div>
          <CustomerTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
