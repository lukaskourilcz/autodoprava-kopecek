import {
  BriefcaseConveyorBelt,
  Users,
  HeartHandshake,
  Heater,
} from "lucide-react";

export default function Sluzby() {
  return (
    <section
      id="sluzby"
      className="bg-gray-100 py-16 px-4 sm:px-8 md:px-16 lg:px-32"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">Služby</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center">
            <HeartHandshake className="w-20 h-20 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Bezpečnost</h3>
            <p className="text-gray-600 text-sm mt-2">
              Bezpečnost je naší prioritou. Všechny vozy jsou vybaveny
              bezpečnostními pásy, pro všechny přepravované osoby. Vozy prochází
              pravidelnou údržbou a servisem.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Heater className="w-20 h-20 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Komfort</h3>
            <p className="text-gray-600 text-sm mt-2">
              Vozy jsou plně klimatizovány a vybaveny pohodlnými sklápěcími
              sedadli s opěrkami na ruce a záclonami pro maximální pro maximální
              pohodlí.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <Users className="w-20 h-20 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">Kapacita</h3>
            <p className="text-gray-600 text-sm mt-2">
              Naše vozová flotila nabízí širokou škálu vozidel s variabilní
              kapacitou, aby co nejvstřícněji vyhověla vašim potřebám.
            </p>
          </div>

          <div className="flex flex-col items-center">
            <BriefcaseConveyorBelt className="w-20 h-20 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800">
              Nadrozměrná zavazadla
            </h3>
            <p className="text-gray-600 text-sm mt-2">
              Nabízíme možnost připojení přívěsu nebo skiboxu, pro přepravu
              objemných zavazadel jako jsou třeba kola, lyže, kánoe
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
