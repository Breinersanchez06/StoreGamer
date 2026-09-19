const BASE_API_URL = 'https://6aa6bdc8d7765db9850793d7.mockapi.io';
const CLIENTE_API_URL = `${BASE_API_URL}/cliente`;

export const obtenerClientes = () => {
  return fetch(CLIENTE_API_URL)
    .then((response) => response.json());
};

export const crearCliente = (cliente) => {
  return fetch(CLIENTE_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente)
  }).then((response) => response.json());
};

export const actualizarCliente = (id, cliente) => {
  return fetch(`${CLIENTE_API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(cliente)
  }).then((response) => response.json());
};

export const eliminarCliente = (id) => {
  return fetch(`${CLIENTE_API_URL}/${id}`, {
    method: 'DELETE'
  }).then((response) => response.json());
};
