import { useEffect } from 'react';
import {
  MemoryRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import api from './api';
import './App.global.css';
import Home from './pages/Home';
import Setup from './pages/Setup';

const Loader = () => {
  const { push } = useHistory();

  useEffect(() => {
    api.once('checkForConfig', (hasConfig: boolean) => {
      console.log('has Config?', hasConfig);
      if (hasConfig) push('/');
      else push('/setup');
    });

    api.checkForConfig();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <h1>Loading</h1>
    </div>
  );
};

export default function App() {
  return (
    <Router initialEntries={['/loader']}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/loader" component={Loader} />
        <Route exact path="/settings" component={Setup} />
      </Switch>
    </Router>
  );
}
