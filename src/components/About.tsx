export function About() {
  return (
    <section id="nosotros" aria-labelledby="about-heading" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.24em] text-lime-800">Nuestra historia</p>
        <h2 id="about-heading" className="mt-3 font-serif text-3xl text-ink-900 sm:text-5xl">
          Nacimos en Poza Rica. Seguimos cerca.
        </h2>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <p className="max-w-xl text-lg text-black/75">
            Dent Art nació en Poza Rica. Más de 16 años acompañando sonrisas con estética, prevención
            y tratamientos personalizados.
          </p>
          <div className="space-y-4 text-black/70">
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
