import { useEffect } from 'react';
import {
  MemoryRouter as Router,
  Switch,
  Route,
  useHistory,
} from 'react-router-dom';
import './App.global.css';
import CustomerTable from './components/CustomerTable';
import Setup from './pages/Setup';

declare global {
  interface Window {
    electron?: any;
  }
}

const Hello = () => {
  const { push } = useHistory();

  useEffect(() => {
    window.electron.ipcRenderer.on('checkForConfig', (arg: boolean) => {
      if (!arg) push('/Welcome');
    });

    window.electron.ipcRenderer.checkForConfig();
  }, [push]);

  return (
    <div>
      <h1>Wohnwage Checker</h1>
      <div className="Hello">
        <CustomerTable />
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Hello} />
        <Route path="/Setup" component={Setup} />
      </Switch>
    </Router>
  );
}
