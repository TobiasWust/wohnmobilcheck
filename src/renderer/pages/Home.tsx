import { Link } from 'react-router-dom';
import CheckTable from '../components/CheckTable';
import CustomerTable from '../components/CustomerTable';
// search customer
// customer table
// create customer

// search customer
// check table
// create check
const Home = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        minHeight: '100%',
      }}
    >
      <h1>
        <Link to="/settings">Wust</Link> Wohnwagen Checker
      </h1>
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
