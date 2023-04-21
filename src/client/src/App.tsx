import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AdminPage from './pages/admin/AdminPage';
import UserPage from './pages/user/UserPage';

const App: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin">
          <AdminPage />
        </Route>
        <Route path="/user">
          <UserPage />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;