import { NavLink } from 'react-router-dom';

export default function Menu() {
  return (
    <nav className="main-nav" aria-label="Navegación principal">
      <NavLink to="/">Catálogo</NavLink>
      <NavLink to="/admin">Inventario</NavLink>
      <NavLink to="/categorias">Categorías</NavLink>
      <NavLink to="/carrito">Carrito</NavLink>
    </nav>
  );
}
