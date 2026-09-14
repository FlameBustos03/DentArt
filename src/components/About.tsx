export function About() {
  return (
    <section id="nosotros" aria-labelledby="about-heading" className="bg-ink-900 py-16 text-white md:py-20">
      <div className="section-x">
        <p className="type-eyebrow-dark">Nuestra historia</p>
        <h2 id="about-heading" className="type-section mt-3 text-white">
          Nacimos en Poza Rica. Seguimos cerca.
        </h2>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <p className="max-w-xl text-base leading-[1.625rem] text-white/85">
            Dent Art nació en Poza Rica. Más de 16 años acompañando sonrisas con estética, prevención
            y tratamientos personalizados.
          </p>
          <div className="space-y-4 text-base leading-[1.625rem] text-white/85">
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
