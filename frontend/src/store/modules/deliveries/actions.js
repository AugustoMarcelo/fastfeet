export function addDeliveryRequest(data) {
  return {
    type: '@delivery/ADD_REQUEST',
    payload: { data },
  };
}

export function updateDeliveryRequest(data, id) {
  return {
    type: '@delivery/UPDATE_REQUEST',
    payload: { data, id },
  };
}
