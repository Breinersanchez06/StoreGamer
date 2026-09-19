import { useEffect, useState } from 'react';
import { obtenerUsuarios, loginUsuario } from '../../services/usuarioService';

const emptyForm = { nombre: '', email: '', rol: 'usuario' };

export default function GestionUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState(emptyForm);

  const cargarUsuarios = async () => {
    const data = await obtenerUsuarios();
    setUsuarios(data || []);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nuevo = await loginUsuario(form);
    setUsuarios((prev) => [...prev, nuevo]);
    setForm(emptyForm);
  };

  const handleDelete = async (id) => {
    setUsuarios((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <section className="admin-section">
      <div className="section-heading">
        <div><p className="eyebrow">USUARIOS</p><h2>Gestión de usuarios</h2></div>
        <span className="result-count">{usuarios.length} usuarios</span>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Nombre" required />
        <input name="email" value={form.email} onChange={handleChange} placeholder="Correo" required />
        <select name="rol" value={form.rol} onChange={handleChange}>
          <option value="usuario">Usuario</option>
          <option value="admin">Admin</option>
        </select>
        <button className="primary-button" type="submit">Crear usuario</button>
      </form>

      <div className="inventory-list">
        {usuarios.map((usuario) => (
          <div key={usuario.id || `${usuario.nombre}-${usuario.email}`} className="inventory-row">
            <div>
              <strong>{usuario.nombre}</strong>
              <span>{usuario.email} · {usuario.rol || 'usuario'}</span>
            </div>
            <button className="delete-button" onClick={() => handleDelete(usuario.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </section>
  );
}
