import { useEffect, useState } from 'react';
import placeholderImage from '../../assets/console-placeholder.svg';
import { formatPrice, resolveImage } from '../../utils/formatters';

export default function ProductCard({ product, onAdd }) {
  const available = product.estado !== false && Number(product.stock) > 0;
  const [imageSrc, setImageSrc] = useState(resolveImage(product.imagen));

  useEffect(() => {
    setImageSrc(resolveImage(product.imagen));
  }, [product.imagen]);

  return (
    <article className="console-card">
      <div className="console-visual">
        <span className="platform-label">{product.categoria || 'Gaming'}</span>
        <img src={imageSrc} alt={product.nombre} loading="lazy" onError={() => setImageSrc(placeholderImage)} />
        <span className={`stock-badge ${available ? '' : 'sold-out'}`}>{available ? `${product.stock} disponibles` : 'Agotado'}</span>
      </div>
      <div className="console-info">
        <p className="product-kicker">STOREGAMER SELECT</p>
        <h3>{product.nombre}</h3>
        <p className="product-description">{product.descripcion}</p>
        <div className="card-bottom">
          <strong>{formatPrice(product.precio)}</strong>
          <button disabled={!available} onClick={() => onAdd(product)}>{available ? 'Agregar +' : 'Sin stock'}</button>
        </div>
      </div>
    </article>
  );
}
