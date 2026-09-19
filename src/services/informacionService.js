const BASE_API_URL = 'https://6aa6bdc8d7765db9850793d7.mockapi.io';
const INFORMACION_API_URL = `${BASE_API_URL}/informacion`;

export const obtenerInformacionGeneral = () => {
  return fetch(INFORMACION_API_URL)
    .then((response) => response.json());
};
