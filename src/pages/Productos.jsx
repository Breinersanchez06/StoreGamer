import ListaProductos from '../components/producto/ListaProductos';

export default function Productos({ products, categories, loading, error, search, setSearch, activeCategory, setActiveCategory, onAdd, onRetry }) {
  return (
    <ListaProductos
      products={products}
      categories={categories}
      loading={loading}
      error={error}
      search={search}
      setSearch={setSearch}
      activeCategory={activeCategory}
      setActiveCategory={setActiveCategory}
      onAdd={onAdd}
      onRetry={onRetry}
    />
  );
}
