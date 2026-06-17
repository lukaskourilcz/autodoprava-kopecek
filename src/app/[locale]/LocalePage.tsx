import Header from "../_sections/Header";
import About from "../_sections/About";
import Services from "../_sections/Services";
import Fleet from "../_sections/Fleet";
import Contact from "../_sections/Contact";
import { BackToTop } from "../components/ui/BackToTop";

// The single-page site. Each section renders its own <section> with the anchor
// id the navbar links to (#home, #about, ...).
export default function LocalePage() {
  return (
    <>
      <main id="main-content">
        <Header />
        <About />
        <Services />
        <Fleet />
        <Contact />
      </main>
      <BackToTop />
    </>
  );
}
