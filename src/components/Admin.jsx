import { useState } from 'react';
import placeholderImage from '../assets/console-placeholder.svg';
import { formatPrice, resolveImage } from '../utils/formatters';

function InventoryItem({ product, onDeleted }) {
  const [imageSrc, setImageSrc] = useState(resolveImage(product.imagen));

  return (
    <div className="inventory-row">
      <img src={imageSrc} alt="" onError={() => setImageSrc(placeholderImage)} />
      <div><strong>{product.nombre}</strong><span>{product.stock} unidades · {formatPrice(product.precio)}</span></div>
      <button className="delete-button" onClick={() => onDeleted(product.id)}>Eliminar</button>
    </div>
  );
}

export default function Admin({ products, categories, onCreated, onDeleted }) {
  const [form, setForm] = useState({ nombre: '', descripcion: '', precio: '', stock: '', imagen: '', categoria: categories[0]?.nombre || 'Consolas' });
  const [saving, setSaving] = useState(false);

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    await onCreated({ ...form, precio: Number(form.precio), stock: Number(form.stock), estado: true });
    setSaving(false);
    setForm({ ...form, nombre: '', descripcion: '', precio: '', stock: '', imagen: '' });
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
          {categories.map((category) => <option key={category.id}>{category.nombre}</option>)}
        </select>
        <button className="primary-button" disabled={saving}>{saving ? 'Guardando...' : 'Añadir consola'}</button>
      </form>
      <div className="inventory-list">
        {products.map((product) => <InventoryItem key={product.id} product={product} onDeleted={onDeleted} />)}
      </div>
    </section>
  );
}
