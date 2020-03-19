import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
import Deliveries from '../pages/Deliveries';
import Deliveryman from '../pages/Deliveryman';
import Recipients from '../pages/Recipients';
import Problems from '../pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/deliveries" component={Deliveries} isPrivate />
      <Route path="/deliveryman" component={Deliveryman} isPrivate />
      <Route path="/recipients" component={Recipients} isPrivate />
      <Route path="/problems" component={Problems} isPrivate />
    </Switch>
  );
}
