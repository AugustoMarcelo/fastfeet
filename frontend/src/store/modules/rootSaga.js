import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import recipients from './recipients/sagas';
import deliveryman from './deliveryman/sagas';
import deliveries from './deliveries/sagas';

export default function* rootSaga() {
  return yield all([auth, recipients, deliveryman, deliveries]);
}
