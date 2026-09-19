const BASE_API_URL = 'https://6aa6bdc8d7765db9850793d7.mockapi.io';
const USUARIO_API_URL = `${BASE_API_URL}/usuario`;

export const obtenerUsuarios = () => {
  return fetch(USUARIO_API_URL)
    .then((response) => response.json());
};

export const loginUsuario = (usuario) => {
  return fetch(USUARIO_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario)
  }).then((response) => response.json());
};
