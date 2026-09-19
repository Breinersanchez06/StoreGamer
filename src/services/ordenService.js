const BASE_API_URL = 'https://6aa6bdc8d7765db9850793d7.mockapi.io';
const ORDEN_API_URL = `${BASE_API_URL}/orden`;

export const obtenerOrdenes = () => {
  return fetch(ORDEN_API_URL)
    .then((response) => response.json());
};

export const crearOrden = (orden) => {
  return fetch(ORDEN_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orden)
  }).then((response) => response.json());
};

export const actualizarOrden = (id, orden) => {
  return fetch(`${ORDEN_API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orden)
  }).then((response) => response.json());
};

export const eliminarOrden = (id) => {
  return fetch(`${ORDEN_API_URL}/${id}`, {
    method: 'DELETE'
  }).then((response) => response.json());
};
