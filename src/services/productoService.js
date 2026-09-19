const BASE_API_URL = 'https://6aa6bdc8d7765db9850793d7.mockapi.io';
const PRODUCTO_API_URL = `${BASE_API_URL}/producto`;

export const obtenerProductos = () => {
  return fetch(PRODUCTO_API_URL)
    .then((response) => response.json());
};

export const crearProducto = (producto) => {
  return fetch(PRODUCTO_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  }).then((response) => response.json());
};

export const actualizarProducto = (id, producto) => {
  return fetch(`${PRODUCTO_API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto)
  }).then((response) => response.json());
};

export const eliminarProducto = (id) => {
  return fetch(`${PRODUCTO_API_URL}/${id}`, {
    method: 'DELETE'
  }).then((response) => response.json());
};
