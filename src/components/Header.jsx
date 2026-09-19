import { Link, useLocation } from 'react-router-dom';

export default function Header({ cartCount, onCartOpen }) {
  const location = useLocation();

  return (
    <header className="site-header">
      <Link className="brand" to="/">
        <span className="brand-mark">SG</span>
        <span>STORE<span>GAMER</span></span>
      </Link>
      <nav className="main-nav" aria-label="Navegación principal">
        <Link className={location.pathname === '/' ? 'active' : ''} to="/">Catálogo</Link>
        <Link className={location.pathname === '/admin' ? 'active' : ''} to="/admin">Inventario</Link>
      </nav>
      <button className="cart-button" onClick={onCartOpen} aria-label="Abrir carrito">
        <span className="cart-icon">▣</span>
        <span>Mi carrito</span>
        <strong>{cartCount}</strong>
      </button>
    </header>
  );
}
