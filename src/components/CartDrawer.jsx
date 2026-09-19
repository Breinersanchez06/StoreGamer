import { useState, useEffect } from 'react';
import placeholderImage from '../assets/console-placeholder.svg';
import { formatPrice, resolveImage } from '../utils/formatters';

function CartItem({ item, index, onRemove, onUpdateQuantity }) {
  const [imageSrc, setImageSrc] = useState(resolveImage(item.imagen));

  useEffect(() => {
    setImageSrc(resolveImage(item.imagen));
  }, [item.imagen]);

  return (
    <div className="cart-item">
      <img src={imageSrc} alt="" onError={() => setImageSrc(placeholderImage)} />
      <div>
        <strong>{item.nombre}</strong>
        <span>{formatPrice(item.precio)} × {item.quantity || 1}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <button type="button" onClick={() => onUpdateQuantity(index, -1)}>-</button>
        <button type="button" onClick={() => onUpdateQuantity(index, 1)}>+</button>
        <button type="button" onClick={() => onRemove(index)}>×</button>
      </div>
    </div>
  );
}

export default function CartDrawer({ items, onClose, onRemove, onUpdateQuantity, onCheckout, user }) {
  const total = items.reduce((sum, item) => sum + Number(item.precio) * Number(item.quantity || 1), 0);

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <aside className="cart-drawer" onClick={(event) => event.stopPropagation()}>
        <div className="drawer-heading">
          <div><p className="eyebrow">TU SELECCIÓN</p><h2>Carrito</h2></div>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        {items.length ? (
          <>
            {items.map((item, index) => (
              <CartItem
                key={`${item.id}-${index}`}
                item={item}
                index={index}
                onRemove={onRemove}
                onUpdateQuantity={onUpdateQuantity}
              />
            ))}
            <div className="cart-total"><span>Total</span><strong>{formatPrice(total)}</strong></div>
            <button className="checkout-button" onClick={onCheckout} disabled={!user}>
              {user ? 'Continuar compra' : 'Inicia sesión para comprar'}
              <span>↗</span>
            </button>
          </>
        ) : (
          <div className="empty-cart"><span>◌</span><p>Tu carrito está vacío.</p><small>Agrega una consola para comenzar.</small></div>
        )}
      </aside>
    </div>
  );
}
