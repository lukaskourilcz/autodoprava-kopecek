import type { SupportedLocale } from "../../lib/locale";
import Header from "../_sections/Header";
import About from "../_sections/About";
import Services from "../_sections/Services";
import Fleet from "../_sections/Fleet";
import Contact from "../_sections/Contact";

export default function LocalePage({ locale }: { locale: SupportedLocale }) {
  return (
    <main id="main-content">
      <section id="home" className="section">
        <Header locale={locale} />
      </section>
      <section id="about" className="section">
        <About />
      </section>
      <section id="services" className="section">
        <Services />
      </section>
      <section id="fleet" className="section">
        <Fleet />
      </section>
      <section id="contact" className="section">
        <Contact />
      </section>
    </main>
  );
}
