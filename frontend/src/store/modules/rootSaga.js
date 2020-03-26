import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import recipients from './recipients/sagas';

export default function* rootSaga() {
  return yield all([auth, recipients]);
}
