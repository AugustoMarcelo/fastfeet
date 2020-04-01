import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import recipients from './recipients/sagas';
import deliveryman from './deliveryman/sagas';

export default function* rootSaga() {
  return yield all([auth, recipients, deliveryman]);
}
