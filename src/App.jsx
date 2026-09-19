import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import CartDrawer from './components/CartDrawer';
import Footer from './layout/Footer';
import Header from './layout/Header';
import Administracion from './pages/Administracion';
import Inicio from './pages/Inicio';
import { useCart } from './hooks/useCart';
import { useProducts } from './hooks/useProducts';

export default function App() {
  const { products, categories, loading, error, loadData, createProduct, deleteProduct } = useProducts();
  const { cart, cartOpen, setCartOpen, addToCart, removeFromCart } = useCart();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todas');

  return (
    <div className="app-shell">
      <Header cartCount={cart.length} onCartOpen={() => setCartOpen(true)} />
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
          <Route path="/admin" element={<Administracion products={products} categories={categories} onCreated={createProduct} onDeleted={deleteProduct} />} />
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
