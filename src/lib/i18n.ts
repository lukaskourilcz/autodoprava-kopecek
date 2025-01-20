import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    cs: {
      common: {
        home: {
          title: "Domů",
          subtitle: "Autodoprava Kopeček",
          description: "Vítejte na stránkách Autodopravy Kopeček.",
          heroText: "Spolehlivá doprava pro vaše potřeby.",
        },
        about: {
          title: "O nás",
          paragraphs: [
            "Jsme rodinná dopravní společnost, která působí na trhu již od roku 2012. Za tuhle dobu jsme nasbírali bohaté zkušenosti v oblasti autobusové dopravy a získali si důvěru mnoha spokojených zákazníků. Naším cílem je zajišťovat spolehlivé, bezpečné a pohodlné cestování pro jednotlivce, skupiny i firmy. Společnost vede pan Jiří Kopeček.",
            "Primárně se specializujeme na nepravidelnou autobusovou dopravu, ať už jde o školní výlety, firemní akce, sportovní turnaje nebo jiné skupinové přepravy. Díky pravidelně udržovaným autobusům zajišťujeme maximální bezpečnost a komfort během cesty.",
            "Jsme tu pro vás, ať už potřebujete zajistit pohodlnou přepravu osob, nebo bezpečný transport nákladu. Rádi vám připravíme nabídku na míru – kontaktujte nás a přesvědčte se o kvalitě našich služeb sami!",
          ],
          reasonsTitle: "Proč si vybrat právě nás?",
          reasons: [
            {
              icon: "Waypoints",
              title: "Flexibilita",
              description:
                "Přizpůsobíme se vašim potřebám a zajistíme individuální řešení pro každou zakázku.",
            },
            {
              icon: "ChevronsUp",
              title: "Rychlost a spolehlivost",
              description:
                "Dodržujeme sjednané termíny a klademe důraz na precizní provedení každé přepravy.",
            },
            {
              icon: "ShieldPlus",
              title: "Profesionální přístup",
              description:
                "Naši zkušení řidiči a moderní technika jsou zárukou kvality a bezpečnosti.",
            },
          ],
          closingText:
            "Máte speciální požadavky na přepravu? Rádi vám vyjdeme vstříc! Neváhejte nás kontaktovat a společně najdeme to nejlepší řešení pro váš náklad.",
        },
        services: {
          title: "Služby",
          description: "Nabízíme široké množství přepravních služeb.",
          list: [
            "Přeprava osob v moderních autobusech",
            "Nákladní doprava do zahraničí",
            "Expresní kurýrní služby",
          ],
          items: {
            safety: {
              title: "Bezpečnost",
              description:
                "Bezpečnost je naší prioritou. Všechny vozy jsou vybaveny bezpečnostními pásy, pro všechny přepravované osoby. Vozy prochází pravidelnou údržbou a servisem.",
            },
            comfort: {
              title: "Komfort",
              description:
                "Vozy jsou plně klimatizovány a vybaveny pohodlnými sklápěcími sedadli s opěrkami na ruce a záclonami pro maximální pohodlí.",
            },
            capacity: {
              title: "Kapacita",
              description:
                "Naše vozová flotila nabízí širokou škálu vozidel s variabilní kapacitou, aby co nejvstřícněji vyhověla vašim potřebám.",
            },
            luggage: {
              title: "Nadrozměrná zavazadla",
              description:
                "Nabízíme možnost připojení přívěsu nebo skiboxu, pro přepravu objemných zavazadel jako jsou třeba kola, lyže, kánoe.",
            },
          },
        },
        fleet: {
          title: "Vozový park",
          description: "Moderní a spolehlivá vozidla pro různé potřeby.",
          vehicles: [
            "Autobusy pro 50+ osob",
            "Dodávky do 3,5 tuny",
            "Nákladní vozy s chlazením",
          ],
          headers: {
            vehicleName: "Název vozidla",
            seats: "Počet míst",
          },
          featureHeaders: [
            "Zájezd",
            "Klima",
            "Pásy",
            "Sedadla",
            "TV",
            "Mikrofon",
            "Lednice",
            "Toaleta",
          ],
          vehicleDetails: [
            {
              name: "Mercedes-Benz Travego",
              seats: "61+1",
              features: ["A", "A", "A", "A", "A", "A", "A", "A"],
            },
            {
              name: "Mercedes-Benz Tourismo",
              seats: "49+2",
              features: ["A", "A", "A", "A", "A", "A", "A", "A"],
            },
            {
              name: "Setra Multiclass",
              seats: "67",
              features: ["N", "A", "A", "N", "A", "N", "N", "N"],
            },
            {
              name: "MAN Lion's Regio",
              seats: "57",
              features: ["N", "A", "A", "N", "A", "N", "N", "N"],
            },
            {
              name: "Karosa Axer",
              seats: "59",
              features: ["N", "A", "A", "N", "N", "N", "N", "N"],
            },
            {
              name: "Mercedes-Benz Tourino",
              seats: "35+1",
              features: ["N", "A", "A", "A", "A", "A", "A", "N"],
            },
            {
              name: "Ford F-Max + návěs 13,6 m",
              seats: "Návěs - walking floor",
              features: ["N", "N", "N", "N", "N", "N", "N", "N"],
            },
            {
              name: "DAF XF 510 FT",
              seats: "",
              features: ["N", "N", "N", "N", "N", "N", "N", "N"],
            },
          ],
        },
        contact: {
          title: "Kontakt",
          description: "Kontaktujte nás pro více informací.",
          address: "Adresa: Kopeček 123, Praha, ČR",
          phone: "Telefon: +420 123 456 789",
          email: "Email: info@kopecek.cz",
        },
      },
    },
    en: {
      common: {
        home: {
          title: "Home",
          subtitle: "Kopeček Transport Services",
          description: "Welcome to the Kopeček Transport Services website.",
          heroText: "Reliable transport for your needs.",
        },
        about: {
          title: "About Us",
          paragraphs: [
            "We are a family-owned transport company operating since 2012. Over the years, we have gained extensive experience in bus transport and earned the trust of many satisfied customers. Our goal is to provide reliable, safe, and comfortable travel for individuals, groups, and businesses. The company is led by Mr. Jiří Kopeček.",
            "We primarily specialize in irregular bus transport, whether it is school trips, corporate events, sports tournaments, or other group transportation. Thanks to regularly maintained buses, we ensure maximum safety and comfort during the journey.",
            "We are here for you, whether you need to arrange comfortable passenger transport or secure freight transportation. We are happy to provide a tailored offer – contact us and see the quality of our services for yourself!",
          ],
          reasonsTitle: "Why Choose Us?",
          reasons: [
            {
              icon: "Waypoints",
              title: "Flexibility",
              description:
                "We adapt to your needs and provide individual solutions for every order.",
            },
            {
              icon: "ChevronsUp",
              title: "Speed and Reliability",
              description:
                "We meet agreed deadlines and emphasize precise execution of every transport.",
            },
            {
              icon: "ShieldPlus",
              title: "Professional Approach",
              description:
                "Our experienced drivers and modern equipment guarantee quality and safety.",
            },
          ],
          closingText:
            "Do you have special transportation requirements? We will gladly accommodate you! Contact us, and together we will find the best solution for your freight.",
        },
        services: {
          title: "Services",
          description: "We offer a wide range of transport services.",
          list: [
            "Passenger transport in modern buses",
            "Freight transport across borders",
            "Express courier services",
          ],
          items: {
            safety: {
              title: "Safety",
              description:
                "Safety is our priority. All vehicles are equipped with seat belts for all passengers. Vehicles undergo regular maintenance and service.",
            },
            comfort: {
              title: "Comfort",
              description:
                "Vehicles are fully air-conditioned and equipped with comfortable reclining seats with armrests and curtains for maximum comfort.",
            },
            capacity: {
              title: "Capacity",
              description:
                "Our fleet offers a wide range of vehicles with variable capacity to best meet your needs.",
            },
            luggage: {
              title: "Oversized Luggage",
              description:
                "We offer the option of attaching a trailer or ski box for transporting bulky luggage such as bicycles, skis, or canoes.",
            },
          },
        },
        fleet: {
          title: "Fleet",
          description: "Modern and reliable vehicles for various needs.",
          vehicles: [
            "Buses for 50+ passengers",
            "Vans up to 3.5 tons",
            "Refrigerated trucks",
          ],
          headers: {
            vehicleName: "Vehicle Name",
            seats: "Number of Seats",
          },
          featureHeaders: [
            "Excursion",
            "Air Conditioning",
            "Seat Belts",
            "Seats",
            "TV",
            "Microphone",
            "Refrigerator",
            "Toilet",
          ],
          vehicleDetails: [
            {
              name: "Mercedes-Benz Travego",
              seats: "61+1",
              features: ["A", "A", "A", "A", "A", "A", "A", "A"],
            },
            {
              name: "Mercedes-Benz Tourismo",
              seats: "49+2",
              features: ["A", "A", "A", "A", "A", "A", "A", "A"],
            },
            {
              name: "Setra Multiclass",
              seats: "67",
              features: ["N", "A", "A", "N", "A", "N", "N", "N"],
            },
            {
              name: "MAN Lion's Regio",
              seats: "57",
              features: ["N", "A", "A", "N", "A", "N", "N", "N"],
            },
            {
              name: "Karosa Axer",
              seats: "59",
              features: ["N", "A", "A", "N", "N", "N", "N", "N"],
            },
            {
              name: "Mercedes-Benz Tourino",
              seats: "35+1",
              features: ["N", "A", "A", "A", "A", "A", "A", "N"],
            },
            {
              name: "Ford F-Max + trailer 13.6 m",
              seats: "Trailer - walking floor",
              features: ["N", "N", "N", "N", "N", "N", "N", "N"],
            },
            {
              name: "DAF XF 510 FT",
              seats: "",
              features: ["N", "N", "N", "N", "N", "N", "N", "N"],
            },
          ],
        },
        contact: {
          title: "Contact",
          description: "Contact us for more information.",
          address: "Address: Kopeček 123, Prague, Czech Republic",
          phone: "Phone: +420 123 456 789",
          email: "Email: info@kopecek.cz",
        },
      },
    },
    de: {
      common: {
        home: {
          title: "Startseite",
          subtitle: "Kopeček Transport Dienstleistungen",
          description: "Willkommen auf der Website von Kopeček Transport.",
          heroText: "Zuverlässiger Transport für Ihre Bedürfnisse.",
        },
        about: {
          title: "Über uns",
          paragraphs: [
            "Wir sind ein familiengeführtes Transportunternehmen, das seit 2012 tätig ist. Im Laufe der Jahre haben wir umfangreiche Erfahrungen im Busverkehr gesammelt und das Vertrauen vieler zufriedener Kunden gewonnen. Unser Ziel ist es, zuverlässige, sichere und komfortable Reisen für Einzelpersonen, Gruppen und Unternehmen zu gewährleisten. Das Unternehmen wird von Herrn Jiří Kopeček geleitet.",
            "Wir spezialisieren uns hauptsächlich auf unregelmäßigen Busverkehr, sei es für Schulausflüge, Firmenveranstaltungen, Sportturniere oder andere Gruppenreisen. Dank regelmäßig gewarteter Busse gewährleisten wir maximale Sicherheit und Komfort während der Fahrt.",
            "Wir sind für Sie da, egal ob Sie einen komfortablen Personentransport oder einen sicheren Warentransport benötigen. Wir erstellen Ihnen gerne ein maßgeschneidertes Angebot – kontaktieren Sie uns und überzeugen Sie sich selbst von der Qualität unserer Dienstleistungen!",
          ],
          reasonsTitle: "Warum uns wählen?",
          reasons: [
            {
              icon: "Waypoints",
              title: "Flexibilität",
              description:
                "Wir passen uns Ihren Bedürfnissen an und bieten individuelle Lösungen für jede Bestellung.",
            },
            {
              icon: "ChevronsUp",
              title: "Geschwindigkeit und Zuverlässigkeit",
              description:
                "Wir halten vereinbarte Termine ein und legen Wert auf die präzise Ausführung jedes Transports.",
            },
            {
              icon: "ShieldPlus",
              title: "Professioneller Ansatz",
              description:
                "Unsere erfahrenen Fahrer und moderne Ausstattung garantieren Qualität und Sicherheit.",
            },
          ],
          closingText:
            "Haben Sie spezielle Anforderungen an den Transport? Wir kommen Ihnen gerne entgegen! Kontaktieren Sie uns, und gemeinsam finden wir die beste Lösung für Ihre Fracht.",
        },
        services: {
          title: "Dienstleistungen",
          description:
            "Wir bieten eine Vielzahl von Transportdienstleistungen an.",
          list: [
            "Personenbeförderung in modernen Bussen",
            "Frachttransporte ins Ausland",
            "Express-Kurierdienste",
          ],
          items: {
            safety: {
              title: "Sicherheit",
              description:
                "Sicherheit ist unsere Priorität. Alle Fahrzeuge sind mit Sicherheitsgurten für alle Passagiere ausgestattet. Fahrzeuge werden regelmäßig gewartet und überprüft.",
            },
            comfort: {
              title: "Komfort",
              description:
                "Fahrzeuge sind voll klimatisiert und mit bequemen, verstellbaren Sitzen mit Armlehnen und Vorhängen für maximalen Komfort ausgestattet.",
            },
            capacity: {
              title: "Kapazität",
              description:
                "Unsere Flotte bietet eine breite Auswahl an Fahrzeugen mit variabler Kapazität, um Ihre Bedürfnisse optimal zu erfüllen.",
            },
            luggage: {
              title: "Übergroßes Gepäck",
              description:
                "Wir bieten die Möglichkeit, einen Anhänger oder Skibox anzuschließen, um sperriges Gepäck wie Fahrräder, Skier oder Kanus zu transportieren.",
            },
          },
        },
        fleet: {
          title: "Fuhrpark",
          description:
            "Moderne und zuverlässige Fahrzeuge für unterschiedliche Bedürfnisse.",
          vehicles: [
            "Busse für 50+ Passagiere",
            "Transporter bis 3,5 Tonnen",
            "Kühlfahrzeuge",
          ],
          headers: {
            vehicleName: "Fahrzeugname",
            seats: "Anzahl der Sitzplätze",
          },
          featureHeaders: [
            "Ausflug",
            "Klimaanlage",
            "Sicherheitsgurte",
            "Sitze",
            "Fernseher",
            "Mikrofon",
            "Kühlschrank",
            "Toilette",
          ],
          vehicleDetails: [
            {
              name: "Mercedes-Benz Travego",
              seats: "61+1",
              features: ["A", "A", "A", "A", "A", "A", "A", "A"],
            },
            {
              name: "Mercedes-Benz Tourismo",
              seats: "49+2",
              features: ["A", "A", "A", "A", "A", "A", "A", "A"],
            },
            {
              name: "Setra Multiclass",
              seats: "67",
              features: ["N", "A", "A", "N", "A", "N", "N", "N"],
            },
            {
              name: "MAN Lion's Regio",
              seats: "57",
              features: ["N", "A", "A", "N", "A", "N", "N", "N"],
            },
            {
              name: "Karosa Axer",
              seats: "59",
              features: ["N", "A", "A", "N", "N", "N", "N", "N"],
            },
            {
              name: "Mercedes-Benz Tourino",
              seats: "35+1",
              features: ["N", "A", "A", "A", "A", "A", "A", "N"],
            },
            {
              name: "Ford F-Max + Anhänger 13,6 m",
              seats: "Anhänger - Walking Floor",
              features: ["N", "N", "N", "N", "N", "N", "N", "N"],
            },
            {
              name: "DAF XF 510 FT",
              seats: "",
              features: ["N", "N", "N", "N", "N", "N", "N", "N"],
            },
          ],
        },
        contact: {
          title: "Kontakt",
          description: "Kontaktieren Sie uns für weitere Informationen.",
          address: "Adresse: Kopeček 123, Prag, Tschechien",
          phone: "Telefon: +420 123 456 789",
          email: "E-Mail: info@kopecek.cz",
        },
      },
    },
  },
  lng: "cs",
  fallbackLng: "cs",
  defaultNS: "common",
  interpolation: {
    escapeValue: false, // React already escapes values
  },
  debug: true, // Enable debugging to verify namespace usage
});

export default i18n;