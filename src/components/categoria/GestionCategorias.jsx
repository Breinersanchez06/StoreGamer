import { useEffect, useState } from 'react';
import { crearCategoria, eliminarCategoria, obtenerCategorias, actualizarCategoria } from '../../services/categoriaService';

const emptyForm = { nombre: '', descripcion: '' };

export default function GestionCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);

  const cargarCategorias = async () => {
    const data = await obtenerCategorias();
    setCategorias(data || []);
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (editingId) {
      const actualizado = await actualizarCategoria(editingId, form);
      setCategorias((prev) => prev.map((item) => item.id === editingId ? actualizado : item));
    } else {
      const nuevo = await crearCategoria(form);
      setCategorias((prev) => [...prev, nuevo]);
    }

    setForm(emptyForm);
    setEditingId(null);
  };

  const handleEdit = (categoria) => {
    setForm({ nombre: categoria.nombre || '', descripcion: categoria.descripcion || '' });
    setEditingId(categoria.id);
  };

  const handleDelete = async (id) => {
    await eliminarCategoria(id);
    setCategorias((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section className="admin-section">
      <div className="section-heading">
        <div><p className="eyebrow">CATEGORÍAS</p><h2>Gestión de categorías</h2></div>
        <span className="result-count">{categorias.length} categorías</span>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre de la categoría" required />
        <input name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Descripción" />
        <button className="primary-button" type="submit">{editingId ? 'Actualizar' : 'Crear categoría'}</button>
      </form>

      <div className="inventory-list">
        {categorias.map((categoria) => (
          <div key={categoria.id} className="inventory-row">
            <div>
              <strong>{categoria.nombre}</strong>
              <span>{categoria.descripcion || 'Sin descripción'}</span>
            </div>
            <button className="delete-button" onClick={() => handleEdit(categoria)}>Editar</button>
            <button className="delete-button" onClick={() => handleDelete(categoria.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </section>
  );
}
