import { useCallback, useEffect, useState } from 'react';
import { obtenerProductos, crearProducto, actualizarProducto, eliminarProducto } from '../services/api';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadData = useCallback(() => {
    setLoading(true);
    setError('');

    obtenerProductos()
      .then((productoData) => {
        setProducts(productoData);
        setCategories(Array.isArray(productoData) ? [{ id: 'all', nombre: 'Todas' }] : [{ id: 'all', nombre: 'Todas' }]);
      })
      .catch(() => setError('No pudimos conectar con el catálogo de StoreGamer.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const createProduct = useCallback(async (product) => {
    const created = await crearProducto(product);
    setProducts((current) => [...current, created]);
  }, []);

  const updateProduct = useCallback(async (id, product) => {
    const updated = await actualizarProducto(id, product);
    setProducts((current) => current.map((item) => item.id === id ? updated : item));
  }, []);

  const deleteProduct = useCallback(async (id) => {
    await eliminarProducto(id);
    setProducts((current) => current.filter((product) => product.id !== id));
  }, []);

  return { products, categories, loading, error, loadData, createProduct, updateProduct, deleteProduct };
}
