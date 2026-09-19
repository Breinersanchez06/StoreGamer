import GestionProductos from '../producto/GestionProductos';
import GestionCategorias from '../categoria/GestionCategorias';
import GestionClientes from '../cliente/GestionClientes';
import GestionOrdenes from '../orden/GestionOrdenes';
import GestionUsuarios from '../usuario/GestionUsuarios';
import GestionInformacion from '../informacion/GestionInformacion';

export default function PanelAdministrador() {
  return (
    <section className="admin-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">PANEL DE ADMINISTRACIÓN</p>
          <h2>Gestión general</h2>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '28px' }}>
        <GestionProductos />
        <GestionCategorias />
        <GestionClientes />
        <GestionOrdenes />
        <GestionUsuarios />
        <GestionInformacion />
      </div>
    </section>
  );
}
