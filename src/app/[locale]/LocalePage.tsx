import Header from "../_sections/Header";
import About from "../_sections/About";
import Services from "../_sections/Services";
import Fleet from "../_sections/Fleet";
import Faq from "../_sections/Faq";
import CtaBand from "../_sections/CtaBand";
import Contact from "../_sections/Contact";

// The single-page site. Each section renders its own <section> with the anchor
// id the navbar links to (#home, #about, ...).
export default function LocalePage() {
  return (
    <main id="main-content">
      <Header />
      <About />
      <Services />
      <Fleet />
      <Faq />
      <CtaBand />
      <Contact />
    </main>
  );
}
