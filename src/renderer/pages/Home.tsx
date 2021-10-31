import { Link } from 'react-router-dom';
import CheckTable from '../components/CheckTable';
import CustomerTable from '../components/CustomerTable';
import useStore from '../store';
// search customer
// customer table
// create customer

// search customer
// check table
// create check
const Home = () => {
  const settings = useStore((state) => state.settings);
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        minHeight: '100%',
      }}
    >
      <h1>
        <Link to="/settings">{settings.companyName}</Link> Wohnwagen Checker
        <small>v0.1.0</small>
      </h1>
      <div
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2em' }}
      >
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
