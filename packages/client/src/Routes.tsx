import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HomeScreen } from './screens/HomeScreen';

// TODO add an about/contact

export function Routes() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <HomeScreen />
        </Route>
      </Switch>
    </Router>
  );
}
