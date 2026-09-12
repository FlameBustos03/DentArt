import { faqs } from "@/data/mockData";
import { Accordion } from "@/components/ui/Accordion";

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-heading" className="scroll-mt-24 bg-mist py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.24em] text-lime-800">Quiet answers</p>
        <h2 id="faq-heading" className="mt-3 font-serif text-3xl text-ink-900 sm:text-5xl">
          Financing, procedures, and insurance
        </h2>
        <p className="mt-4 max-w-2xl text-black/70">
          The details patients actually ask after a consultation—written without sales language.
        </p>
        <div className="mt-8">
          <Accordion items={faqs} />
        </div>
      </div>
    </section>
  );
}
