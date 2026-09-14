export function About() {
  return (
    <section id="nosotros" aria-labelledby="about-heading" className="bg-white py-16 md:py-20">
      <div className="section-x">
        <p className="type-eyebrow">Nuestra historia</p>
        <h2 id="about-heading" className="type-section mt-3">
          Nacimos en Poza Rica. Seguimos cerca.
        </h2>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <p className="type-body max-w-xl">
            Dent Art nació en Poza Rica. Más de 16 años acompañando sonrisas con estética, prevención
            y tratamientos personalizados.
          </p>
          <div className="type-body space-y-4">
            <p>
              Trabajamos con dos unidades dentales y equipo de rayos X individual y panorámico, para
              ver con claridad antes de tratar.
            </p>
            <p>
              Abrimos sede en Villahermosa para estar más cerca de quienes ya confiaban en nosotros.
              En ambas clínicas el trato es el mismo: explicación honesta, plan a tu medida y
              atención cercana.
            </p>
            <p>La confianza se construye consulta a consulta.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
