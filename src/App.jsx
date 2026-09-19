import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import CartDrawer from './components/CartDrawer';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Administracion from './pages/Administracion';
import Inicio from './pages/Inicio';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import MisPedidos from './pages/MisPedidos';
import { useCart } from './hooks/useCart';
import { useProducts } from './hooks/useProducts';
import { crearOrden } from './services/ordenService';

const SESSION_KEY = 'storegamer_session';

const puedeAccederInventario = (usuario) => {
  if (!usuario) return false;

  const rol = String(usuario.rol || usuario.role || usuario.tipo || '').toLowerCase();
  const nombre = String(usuario.nombre || '').toLowerCase();

  return rol === 'admin' || rol === 'vendedor' || nombre === 'admin' || nombre === 'vendedor';
};

export default function App() {
  const { products, categories, loading, error, loadData, createProduct, deleteProduct } = useProducts();
  const { cart, cartOpen, setCartOpen, addToCart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
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

  const handleCheckout = async () => {
    if (!session) {
      window.location.href = '/login';
      return;
    }

    setCheckoutOpen(true);
    setCartOpen(false);
  };

  const handleConfirmPurchase = async () => {
    try {
      const payload = {
        cliente: session.nombre || 'Cliente',
        usuario: session.nombre || 'Cliente',
        total: cart.reduce((sum, item) => sum + Number(item.precio) * Number(item.quantity || 1), 0),
        estado: 'pendiente',
        items: cart.map((item) => ({
          id: item.id,
          nombre: item.nombre,
          cantidad: item.quantity || 1,
          precio: Number(item.precio)
        })),
        fecha: new Date().toISOString()
      };

      await crearOrden(payload);
      clearCart();
      setCheckoutOpen(false);
      return true;
    } catch (error) {
      return false;
    }
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
        {checkoutOpen ? (
          <Checkout
            cart={cart}
            user={session}
            onConfirm={handleConfirmPurchase}
            onBack={() => {
              setCheckoutOpen(false);
              setCartOpen(true);
            }}
          />
        ) : (
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
            <Route path="/mis-pedidos" element={
              session ? <MisPedidos user={session} /> : <Navigate to="/login" replace />
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
        )}
      </main>
      {!checkoutOpen && cartOpen && (
        <CartDrawer
          items={cart}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
          onCheckout={handleCheckout}
          user={session}
        />
      )}
      <Footer />
    </div>
  );
}
