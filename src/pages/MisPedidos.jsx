import { useEffect, useState } from 'react';
import { obtenerOrdenes } from '../services/ordenService';

export default function MisPedidos({ user }) {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarOrdenes = async () => {
      try {
        const data = await obtenerOrdenes();
        const misOrdenes = (data || []).filter((orden) => {
          const usuario = String(orden.usuario || orden.cliente || '').toLowerCase();
          const nombre = String(user?.nombre || '').toLowerCase();
          return usuario === nombre || (!usuario && nombre === 'admin');
        });
        setOrdenes(misOrdenes);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      cargarOrdenes();
    }
  }, [user]);

  if (!user) {
    return (
      <section className="admin-section">
        <div className="state-message">Debes iniciar sesión para ver tus pedidos.</div>
      </section>
    );
  }

  return (
    <section className="admin-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">HISTORIAL</p>
          <h2>Mis pedidos</h2>
        </div>
      </div>

      {loading ? (
        <div className="state-message">Cargando pedidos...</div>
      ) : ordenes.length === 0 ? (
        <div className="state-message">Todavía no tienes pedidos realizados.</div>
      ) : (
        <div className="inventory-list" style={{ marginTop: '28px' }}>
          {ordenes.map((orden) => (
            <div key={orden.id} className="inventory-row">
              <div>
                <strong>Pedido #{orden.id}</strong>
                <span>{orden.estado || 'pendiente'} · {new Date(orden.fecha || Date.now()).toLocaleDateString()}</span>
              </div>
              <div style={{ textAlign: 'right' }}>
                <strong>${Number(orden.total || 0).toFixed(2)}</strong>
                <span>{Array.isArray(orden.items) ? orden.items.length : 0} producto(s)</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
