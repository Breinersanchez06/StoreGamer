import { useMemo } from 'react';
import ProductCard from './ProductoCard';

export default function ListaProductos({ products, categories, loading, error, search, setSearch, activeCategory, setActiveCategory, onAdd, onRetry }) {
  const filtered = useMemo(() => products.filter((product) => {
    const matchesCategory = activeCategory === 'Todas' || product.categoria?.toLowerCase() === activeCategory.toLowerCase();
    const query = search.toLowerCase();
    return matchesCategory && `${product.nombre} ${product.descripcion}`.toLowerCase().includes(query);
  }), [products, activeCategory, search]);

  return (
    <section className="catalog-section" id="catalogo">
      <div className="section-heading">
        <div><p className="eyebrow">COLECCIÓN STOREGAMER</p><h2>Elige tu plataforma</h2></div>
        <span className="result-count">{filtered.length} resultados</span>
      </div>
      <div className="catalog-toolbar">
        <div className="category-tabs">
          <button className={activeCategory === 'Todas' ? 'selected' : ''} onClick={() => setActiveCategory('Todas')}>Todas</button>
          {categories.map((category) => (
            <button key={category.id} className={activeCategory === category.nombre ? 'selected' : ''} onClick={() => setActiveCategory(category.nombre)}>{category.nombre}</button>
          ))}
        </div>
        <label className="search-box"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar consola..." /></label>
      </div>
      {loading && <div className="state-message">Cargando catálogo...</div>}
      {error && <div className="state-message error-state"><p>{error}</p><button onClick={onRetry}>Intentar de nuevo</button></div>}
      {!loading && !error && (
        <div className="product-grid">
          {filtered.length ? filtered.map((product) => <ProductCard key={product.id} product={product} onAdd={onAdd} />) : <div className="state-message">No encontramos consolas con esa búsqueda.</div>}
        </div>
      )}
    </section>
  );
}
