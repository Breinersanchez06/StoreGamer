const BASE_API_URL = 'https://6aa6bdc8d7765db9850793d7.mockapi.io';
const CATEGORIA_API_URL = `${BASE_API_URL}/categoria`;

export const obtenerCategorias = () => {
  return fetch(CATEGORIA_API_URL)
    .then((response) => response.json());
};

export const crearCategoria = (categoria) => {
  return fetch(CATEGORIA_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoria)
  }).then((response) => response.json());
};

export const actualizarCategoria = (id, categoria) => {
  return fetch(`${CATEGORIA_API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categoria)
  }).then((response) => response.json());
};

export const eliminarCategoria = (id) => {
  return fetch(`${CATEGORIA_API_URL}/${id}`, {
    method: 'DELETE'
  }).then((response) => response.json());
};
