import { useState } from 'react';
import { autenticarUsuario } from '../services/usuarioService';

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ nombre: '', clave: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      const usuario = await autenticarUsuario(form.nombre, form.clave);

      if (!usuario) {
        setError('Credenciales inválidas. Verifica usuario y contraseña.');
        return;
      }

      onLogin(usuario);
    } catch (err) {
      setError('No se pudo iniciar sesión. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">ACCESO</p>
          <h2>Iniciar sesión</h2>
        </div>
      </div>

      <form className="admin-form" onSubmit={handleSubmit} style={{ maxWidth: '520px', margin: '40px auto 0' }}>
        <input
          name="nombre"
          type="text"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Usuario"
          required
        />
        <input
          name="clave"
          type="password"
          value={form.clave}
          onChange={handleChange}
          placeholder="Contraseña"
          required
        />
        <button className="primary-button" type="submit" disabled={loading}>
          {loading ? 'Ingresando...' : 'Entrar'}
        </button>
      </form>

      {error && <p className="state-message error-state" style={{ marginTop: '18px' }}>{error}</p>}
    </section>
  );
}
