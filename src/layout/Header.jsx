import { Link, useLocation } from 'react-router-dom';

const puedeAccederInventario = (usuario) => {
  if (!usuario) return false;

  const rol = String(usuario.rol || usuario.role || usuario.tipo || '').toLowerCase();
  const nombre = String(usuario.nombre || '').toLowerCase();

  return rol === 'admin' || rol === 'vendedor' || nombre === 'admin' || nombre === 'vendedor';
};

export default function Header({ cartCount, onCartOpen, user, onLogout, canAccessInventory }) {
  const location = useLocation();
  const tienePermiso = canAccessInventory ?? puedeAccederInventario(user);

  return (
    <header className="site-header">
      <Link className="brand" to="/">
        <span className="brand-mark">SG</span>
        <span>STORE<span>GAMER</span></span>
      </Link>
      <nav className="main-nav" aria-label="Navegación principal">
        <Link className={location.pathname === '/' ? 'active' : ''} to="/">Catálogo</Link>
        {tienePermiso && (
          <Link className={location.pathname === '/admin' ? 'active' : ''} to="/admin">Inventario</Link>
        )}
        {user ? (
          <>
            <span className="session-user">Hola, {user.nombre || user.email || 'Admin'}</span>
            <Link className={location.pathname === '/mis-pedidos' ? 'active' : ''} to="/mis-pedidos">Mis pedidos</Link>
          </>
        ) : (
          <Link className={location.pathname === '/login' ? 'active' : ''} to="/login">Iniciar sesión</Link>
        )}
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {user && (
          <button className="delete-button" onClick={onLogout} type="button">
            Cerrar sesión
          </button>
        )}
        <button className="cart-button" onClick={onCartOpen} aria-label="Abrir carrito">
          <span className="cart-icon">▣</span>
          <span>Mi carrito</span>
          <strong>{cartCount}</strong>
        </button>
      </div>
    </header>
  );
}
