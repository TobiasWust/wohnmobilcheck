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
    api
      .checkForConfig()
      .then((hasConfig: boolean) => {
        if (hasConfig) return push('/');
        return push('/setup');
      })
      .catch(console.log);
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
