import { useEffect, useState } from 'react';
import placeholderImage from '../../assets/console-placeholder.svg';
import { crearProducto, eliminarProducto, obtenerProductos, actualizarProducto } from '../../services/productoService';
import { formatPrice, resolveImage } from '../../utils/formatters';

function InventoryItem({ product, onDeleted, onEdit }) {
  const [imageSrc, setImageSrc] = useState(resolveImage(product.imagen));

  return (
    <div className="inventory-row">
      <img src={imageSrc} alt="" onError={() => setImageSrc(placeholderImage)} />
      <div>
        <strong>{product.nombre}</strong>
        <span>{product.stock} unidades · {formatPrice(product.precio)}</span>
      </div>
      <button className="delete-button" onClick={() => onEdit(product)}>Editar</button>
      <button className="delete-button" onClick={() => onDeleted(product.id)}>Eliminar</button>
    </div>
  );
}

const emptyForm = { nombre: '', descripcion: '', precio: '', stock: '', imagen: '', categoria: 'Consolas' };

export default function GestionProductos() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const cargarProductos = async () => {
    const data = await obtenerProductos();
    setProducts(data || []);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const submit = async (event) => {
    event.preventDefault();

    const payload = { ...form, precio: Number(form.precio), stock: Number(form.stock), estado: true };

    if (editingId) {
      const actualizado = await actualizarProducto(editingId, payload);
      setProducts((prev) => prev.map((item) => item.id === editingId ? actualizado : item));
    } else {
      const nuevo = await crearProducto(payload);
      setProducts((prev) => [...prev, nuevo]);
    }

    setForm(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (product) => {
    setForm({
      nombre: product.nombre || '',
      descripcion: product.descripcion || '',
      precio: product.precio || '',
      stock: product.stock || '',
      imagen: product.imagen || '',
      categoria: product.categoria || 'Consolas'
    });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    await eliminarProducto(id);
    setProducts((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section className="admin-section">
      <div className="section-heading">
        <div><p className="eyebrow">PANEL DE OPERACIONES</p><h2>Inventario</h2></div>
        <span className="result-count">{products.length} productos</span>
      </div>

      <form className="admin-form" onSubmit={submit}>
        <input name="nombre" value={form.nombre} onChange={update} placeholder="Nombre de consola" required />
        <input name="precio" type="number" min="0" step="0.01" value={form.precio} onChange={update} placeholder="Precio" required />
        <input name="stock" type="number" min="0" value={form.stock} onChange={update} placeholder="Stock" required />
        <input name="imagen" value={form.imagen} onChange={update} placeholder="URL de imagen" required />
        <input name="descripcion" value={form.descripcion} onChange={update} placeholder="Descripción" required />
        <select name="categoria" value={form.categoria} onChange={update}>
          <option value="Consolas">Consolas</option>
          <option value="Accesorios">Accesorios</option>
          <option value="Videojuegos">Videojuegos</option>
        </select>
        <button className="primary-button" type="submit">{editingId ? 'Actualizar' : 'Añadir consola'}</button>
      </form>

      <div className="inventory-list">
        {products.map((product) => (
          <InventoryItem key={product.id} product={product} onDeleted={handleDelete} onEdit={handleEdit} />
        ))}
      </div>
    </section>
  );
}
