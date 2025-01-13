import Header from "./header/header";
import Kontakt from "./kontakt/page";
import ONas from "./o-nas/page";
import Sluzby from "./sluzby/page";
import VozovyPark from "./vozovy-park/page";

export default function HomePage() {
  return (
    <>
      <main>
        <Header />
        <ONas />
        <Sluzby />
        <VozovyPark />
        <Kontakt />
      </main>
    </>
  );
}
