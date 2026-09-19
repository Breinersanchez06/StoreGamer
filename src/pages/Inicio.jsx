import Banner from '../layout/Banner';
import Catalog from '../components/producto/ListaProductos';

export default function Inicio({ products, categories, loading, error, search, setSearch, activeCategory, setActiveCategory, onAdd, onRetry }) {
  return (
    <>
      <Banner />
      <Catalog
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
    </>
  );
}
