import { useEffect } from 'react';
import {
  MemoryRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import api from './api';
import './App.global.css';
import Check from './pages/Check';
import Customer from './pages/Customer';
import Home from './pages/Home';
import Setup from './pages/Setup';
import useStore from './store';

const Loader = () => {
  const { push } = useHistory();
  const setSettings = useStore((state) => state.setSettings);

  useEffect(() => {
    api
      .checkForConfig()
      .then((hasConfig: boolean) => {
        if (hasConfig) {
          api
            .getConfig()
            .then((res: any) => {
              setSettings(res[0]);
              return push('/');
            })
            .catch(console.log);
        }
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
        <Route exact path="/customer" component={Customer} />
        <Route exact path="/check" component={Check} />
      </Switch>
    </Router>
  );
}
