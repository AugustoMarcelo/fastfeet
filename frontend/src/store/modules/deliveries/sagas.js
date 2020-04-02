import { all, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

export function* addDelivery({ payload }) {
  try {
    const { data } = payload;

    yield call(api.post, 'deliveries', data);

    toast.success('Encomenda cadastrada com sucesso');
  } catch (error) {
    toast.error(error.response.data.error);
  }
}

export function* updateDelivery({ payload }) {
  try {
    const { data, id } = payload;

    yield call(api.put, `deliveries/${id}`, data);

    toast.success('Encomenda atualizada com sucesso');
    history.push('/deliveries');
  } catch (error) {
    toast.error(error.response.data.error);
  }
}

export default all([
  takeLatest('@delivery/ADD_REQUEST', addDelivery),
  takeLatest('@delivery/UPDATE_REQUEST', updateDelivery),
]);
