import { useState } from 'react';
import { formatPrice } from '../utils/formatters';

export default function Checkout({ cart, user, onConfirm, onBack }) {
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const total = cart.reduce((sum, item) => sum + Number(item.precio) * Number(item.quantity || 1), 0);

  const handleConfirm = async () => {
    setLoading(true);
    await onConfirm();
    setCompleted(true);
    setLoading(false);
  };

  if (completed) {
    return (
      <section className="admin-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PEDIDO</p>
            <h2>Compra realizada</h2>
          </div>
        </div>

        <div className="state-message" style={{ maxWidth: '760px', margin: '40px auto 0' }}>
          <h3 style={{ color: '#d6f36b', marginBottom: '12px' }}>¡Gracias por tu compra!</h3>
          <p>Tu pedido fue registrado correctamente para {user?.nombre || 'cliente'}.</p>
          <p style={{ marginTop: '10px' }}>Se ha enviado la confirmación y el estado del pedido queda en pendiente.</p>
          <button className="primary-button" type="button" onClick={onBack} style={{ marginTop: '22px' }}>
            Volver al catálogo
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="admin-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">CHECKOUT</p>
          <h2>Proceso de compra</h2>
        </div>
      </div>

      <div style={{ maxWidth: '760px', margin: '40px auto 0', display: 'grid', gap: '18px' }}>
        <div className="inventory-list">
          {cart.map((item, index) => (
            <div key={`${item.id}-${index}`} className="inventory-row">
              <div>
                <strong>{item.nombre}</strong>
                <span>{item.quantity || 1} unidad(es) · {formatPrice(item.precio)}</span>
              </div>
              <span>{formatPrice(Number(item.precio) * Number(item.quantity || 1))}</span>
            </div>
          ))}
        </div>

        <div className="cart-total" style={{ paddingTop: '22px' }}>
          <span>Total</span>
          <strong>{formatPrice(total)}</strong>
        </div>

        <div style={{ display: 'grid', gap: '12px' }}>
          <button className="primary-button" type="button" onClick={handleConfirm} disabled={loading || !cart.length}>
            {loading ? 'Procesando...' : 'Realizar compra'}
          </button>
          <button className="delete-button" type="button" onClick={onBack}>
            Volver al carrito
          </button>
        </div>
      </div>
    </section>
  );
}
