import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import CartDrawer from './components/CartDrawer';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Administracion from './pages/Administracion';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import { useCart } from './hooks/useCart';
import { useProducts } from './hooks/useProducts';

const SESSION_KEY = 'storegamer_session';

const puedeAccederInventario = (usuario) => {
  if (!usuario) return false;

  const rol = String(usuario.rol || usuario.role || usuario.tipo || '').toLowerCase();
  const nombre = String(usuario.nombre || '').toLowerCase();

  return rol === 'admin' || rol === 'vendedor' || nombre === 'admin' || nombre === 'vendedor';
};

export default function App() {
  const { products, categories, loading, error, loadData, createProduct, deleteProduct } = useProducts();
  const { cart, cartOpen, setCartOpen, addToCart, removeFromCart } = useCart();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [session, setSession] = useState(() => {
    const stored = localStorage.getItem(SESSION_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  const puedeVerInventario = puedeAccederInventario(session);

  const handleLogin = (usuario) => {
    setSession(usuario);
    localStorage.setItem(SESSION_KEY, JSON.stringify(usuario));
  };

  const handleLogout = () => {
    setSession(null);
    localStorage.removeItem(SESSION_KEY);
  };

  return (
    <div className="app-shell">
      <Header
        cartCount={cart.length}
        onCartOpen={() => setCartOpen(true)}
        user={session}
        onLogout={handleLogout}
        canAccessInventory={puedeVerInventario}
      />
      <main>
        <Routes>
          <Route path="/" element={
            <Inicio
              products={products}
              categories={categories}
              loading={loading}
              error={error}
              search={search}
              setSearch={setSearch}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              onAdd={addToCart}
              onRetry={loadData}
            />
          } />
          <Route path="/login" element={
            session ? (
              puedeVerInventario ? <Navigate to="/admin" replace /> : <Navigate to="/" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          } />
          <Route
            path="/admin"
            element={
              session && puedeVerInventario ? (
                <Administracion products={products} categories={categories} onCreated={createProduct} onDeleted={deleteProduct} />
              ) : (
                <Navigate to={session ? '/' : '/login'} replace />
              )
            }
          />
          <Route path="*" element={
            <Inicio
              products={products}
              categories={categories}
              loading={loading}
              error={error}
              search={search}
              setSearch={setSearch}
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              onAdd={addToCart}
              onRetry={loadData}
            />
          } />
        </Routes>
      </main>
      {cartOpen && <CartDrawer items={cart} onClose={() => setCartOpen(false)} onRemove={removeFromCart} />}
      <Footer />
    </div>
  );
}
