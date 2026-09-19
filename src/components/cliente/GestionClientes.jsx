import { useEffect, useState } from 'react';
import { crearCliente, eliminarCliente, obtenerClientes, actualizarCliente } from '../../services/clienteService';

const emptyForm = { nombre: '', email: '', telefono: '' };

export default function GestionClientes() {
  const [clientes, setClientes] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const cargarClientes = async () => {
    const data = await obtenerClientes();
    setClientes(data || []);
  };

  useEffect(() => {
    cargarClientes();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (editingId) {
      const actualizado = await actualizarCliente(editingId, form);
      setClientes((prev) => prev.map((item) => item.id === editingId ? actualizado : item));
    } else {
      const nuevo = await crearCliente(form);
      setClientes((prev) => [...prev, nuevo]);
    }

    setForm(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (cliente) => {
    setForm({ nombre: cliente.nombre || '', email: cliente.email || '', telefono: cliente.telefono || '' });
    setEditingId(cliente.id);
  };

  const handleDelete = async (id) => {
    await eliminarCliente(id);
    setClientes((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section className="admin-section">
      <div className="section-heading">
        <div><p className="eyebrow">CLIENTES</p><h2>Gestión de clientes</h2></div>
        <span className="result-count">{clientes.length} clientes</span>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Correo electrónico" required />
        <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Teléfono" />
        <button className="primary-button" type="submit">{editingId ? 'Actualizar' : 'Crear cliente'}</button>
      </form>

      <div className="inventory-list">
        {clientes.map((cliente) => (
          <div key={cliente.id} className="inventory-row">
            <div>
              <strong>{cliente.nombre}</strong>
              <span>{cliente.email} · {cliente.telefono || 'Sin teléfono'}</span>
            </div>
            <button className="delete-button" onClick={() => handleEdit(cliente)}>Editar</button>
            <button className="delete-button" onClick={() => handleDelete(cliente.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </section>
  );
}
