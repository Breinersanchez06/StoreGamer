import { useEffect, useState } from 'react';
import { obtenerInformacionGeneral } from '../../services/informacionService';

export default function GestionInformacion() {
  const [informacion, setInformacion] = useState({});

  const cargarInformacion = async () => {
    const data = await obtenerInformacionGeneral();
    setInformacion(Array.isArray(data) && data.length ? data[0] : data || {});
  };

  useEffect(() => {
    cargarInformacion();
  }, []);

  return (
    <section className="admin-section">
      <div className="section-heading">
        <div><p className="eyebrow">INFORMACIÓN</p><h2>Gestión de información</h2></div>
      </div>

      <div className="inventory-list">
        <div className="inventory-row">
          <div>
            <strong>Nombre</strong>
            <span>{informacion.nombre || 'StoreGamer'}</span>
          </div>
        </div>
        <div className="inventory-row">
          <div>
            <strong>Versión</strong>
            <span>{informacion.version || '1.0.0'}</span>
          </div>
        </div>
        <div className="inventory-row">
          <div>
            <strong>Descripción</strong>
            <span>{informacion.descripcion || 'Tienda de productos gamer'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
