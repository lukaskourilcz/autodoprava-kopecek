import Header from "../_sections/Header";
import Brand from "../_sections/Brand";
import About from "../_sections/About";
import Services from "../_sections/Services";
import Fleet from "../_sections/Fleet";
import Contact from "../_sections/Contact";

// The single-page site. A vertical sequence of atmospheric bands: full-bleed
// photographic hero → monumental brand display → cloud-canvas content sections
// → onyx footer. Each content section renders its own <section> with the anchor
// id the navbar links to (#home, #about, ...).
export default function LocalePage() {
  return (
    <main id="main-content">
      <Header />
      <Brand />
      <About />
      <Services />
      <Fleet />
      <Contact />
    </main>
  );
}
