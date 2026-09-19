import { useEffect, useState } from 'react';
import { crearOrden, eliminarOrden, obtenerOrdenes, actualizarOrden } from '../../services/ordenService';

const emptyForm = { cliente: '', total: '', estado: 'pendiente', items: '' };

export default function GestionOrdenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const cargarOrdenes = async () => {
    const data = await obtenerOrdenes();
    setOrdenes(data || []);
  };

  useEffect(() => {
    cargarOrdenes();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      ...form,
      total: Number(form.total),
      items: form.items ? form.items.split(',').map((item) => item.trim()).filter(Boolean) : []
    };

    if (editingId) {
      const actualizado = await actualizarOrden(editingId, payload);
      setOrdenes((prev) => prev.map((item) => item.id === editingId ? actualizado : item));
    } else {
      const nueva = await crearOrden(payload);
      setOrdenes((prev) => [...prev, nueva]);
    }

    setForm(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (orden) => {
    setForm({
      cliente: orden.cliente || '',
      total: orden.total || '',
      estado: orden.estado || 'pendiente',
      items: Array.isArray(orden.items) ? orden.items.join(', ') : ''
    });
    setEditingId(orden.id);
  };

  const handleDelete = async (id) => {
    await eliminarOrden(id);
    setOrdenes((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section className="admin-section">
      <div className="section-heading">
        <div><p className="eyebrow">ORDENES</p><h2>Gestión de órdenes</h2></div>
        <span className="result-count">{ordenes.length} órdenes</span>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input name="cliente" value={form.cliente} onChange={handleChange} placeholder="Cliente" required />
        <input name="total" type="number" min="0" step="0.01" value={form.total} onChange={handleChange} placeholder="Total" required />
        <select name="estado" value={form.estado} onChange={handleChange}>
          <option value="pendiente">Pendiente</option>
          <option value="procesando">Procesando</option>
          <option value="enviado">Enviado</option>
          <option value="entregado">Entregado</option>
        </select>
        <input name="items" value={form.items} onChange={handleChange} placeholder="Ítems (separados por coma)" />
        <button className="primary-button" type="submit">{editingId ? 'Actualizar orden' : 'Crear orden'}</button>
      </form>

      <div className="inventory-list">
        {ordenes.map((orden) => (
          <div key={orden.id} className="inventory-row">
            <div>
              <strong>{orden.cliente}</strong>
              <span>{orden.estado} · Total: ${Number(orden.total || 0).toFixed(2)}</span>
            </div>
            <button className="delete-button" onClick={() => handleEdit(orden)}>Editar</button>
            <button className="delete-button" onClick={() => handleDelete(orden.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </section>
  );
}
