import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import Login from '../pages/Login';
import Deliveries from '../pages/Deliveries';
import ManageDelivery from '../pages/Deliveries/ManageDelivery';
import Deliveryman from '../pages/Deliveryman';
import ManageDeliveryman from '../pages/Deliveryman/ManageDeliveryman';
import Recipients from '../pages/Recipients';
import ManageRecipients from '../pages/Recipients/ManageRecipient';
import Problems from '../pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/deliveries" exact component={Deliveries} isPrivate />
      <Route path="/deliveries/create" component={ManageDelivery} isPrivate />
      <Route path="/deliveries/edit/:id" component={ManageDelivery} isPrivate />
      <Route path="/deliveries" exact component={Deliveries} isPrivate />
      <Route path="/deliveryman" exact component={Deliveryman} isPrivate />
      <Route
        path="/deliveryman/create"
        component={ManageDeliveryman}
        isPrivate
      />
      <Route
        path="/deliveryman/edit/:id"
        component={ManageDeliveryman}
        isPrivate
      />
      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route path="/recipients/create" component={ManageRecipients} isPrivate />
      <Route
        path="/recipients/edit/:id"
        component={ManageRecipients}
        isPrivate
      />
      <Route path="/problems" component={Problems} isPrivate />
    </Switch>
  );
}
