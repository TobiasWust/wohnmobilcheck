import { Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import CheckTable from '../components/CheckTable';
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
        minHeight: '100%',
      }}
    >
      <div>
        <h1>Wust Wohnwagen Checker</h1>
        <Button variant="contained" onClick={() => push('/settings')}>
          Firmendaten ändern
        </Button>
      </div>
      <div style={{ display: 'grid', gridAutoFlow: 'column', gap: '2em' }}>
        <div>
          <CustomerTable />
        </div>
        <div>
          <CheckTable />
        </div>
      </div>
    </div>
  );
};

export default Home;
