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
    <div>
      <h1>Wohnwage Checker</h1>
      <div className="Hello">
        <CustomerTable />
        {/* <CheckTable /> */}
      </div>
      <Button onClick={() => push('/settings')}>Settings</Button>
    </div>
  );
};

export default Home;
