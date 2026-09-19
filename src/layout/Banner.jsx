export default function Banner() {
  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">NUEVA GENERACIÓN · LISTA PARA JUGAR</p>
        <h1>Tu próxima partida empieza aquí.</h1>
        <p className="hero-description">Consolas oficiales, stock real y la potencia que necesitas para jugar sin límites.</p>
        <a className="primary-button" href="#catalogo">Explorar consolas <span>↘</span></a>
      </div>
      <div className="hero-orbit" aria-hidden="true"><span>PLAY</span><b>01</b></div>
      <div className="hero-specs"><span>4K HDR</span><span>120 FPS</span><span>SSD</span></div>
    </section>
  );
}
