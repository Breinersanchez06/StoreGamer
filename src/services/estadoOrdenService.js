const BASE_API_URL = 'https://6aa6bdc8d7765db9850793d7.mockapi.io';
const ESTADO_ORDEN_API_URL = `${BASE_API_URL}/estadoOrden`;

export const obtenerEstadosOrden = () => {
  return fetch(ESTADO_ORDEN_API_URL)
    .then((response) => response.json());
};

export const crearEstadoOrden = (estado) => {
  return fetch(ESTADO_ORDEN_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(estado)
  }).then((response) => response.json());
};
