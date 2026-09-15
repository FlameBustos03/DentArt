import { Reveal } from "@/components/ui/Reveal";

export function About() {
  return (
    <section id="nosotros" aria-labelledby="about-heading" className="bg-ink-900 py-16 text-white md:py-20">
      <div className="section-x">
        <Reveal>
          <p className="type-eyebrow-dark">Nuestra historia</p>
          <h2 id="about-heading" className="type-section mt-3 text-white">
            Nacimos en Poza Rica. Seguimos cerca.
          </h2>
        </Reveal>
        <div className="mt-6 grid gap-8 lg:grid-cols-2">
          <Reveal delay={0.08} className="space-y-4 text-base leading-[1.625rem] text-white/85">
            <p>
              Dent Art nació en Poza Rica. Más de 16 años acompañando sonrisas con estética,
              prevención y tratamientos personalizados.
            </p>
            <p>
              Trabajamos con equipo de vanguardia: dos unidades dentales, rayos X individual y
              panorámico, y láser terapéutico, para ver con claridad antes de tratar.
            </p>
          </Reveal>
          <Reveal delay={0.16} className="space-y-4 text-base leading-[1.625rem] text-white/85">
            <p>
              Hace un año abrimos sede en Villahermosa para estar más cerca de quienes ya confiaban
              en nosotros. En ambas clínicas el trato es el mismo: explicación honesta, plan a tu
              medida y atención cercana.
            </p>
            <p className="font-serif text-lg text-white">
              La confianza se construye consulta a consulta.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
