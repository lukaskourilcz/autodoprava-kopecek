import type { SiteContent, SiteImages, SiteTexts, Vehicle } from "./types";

// The canonical content shipped with the site. This is what every visitor
// sees unless the owner has saved overrides via the /dev editor (which live in
// the browser's localStorage). Exporting from /dev produces a JSON file with
// the same shape, so edits can be copied back here to make them permanent.

const cs: SiteTexts = {
  home: {
    title: "Domů",
    subtitle: "Autodoprava Kopeček",
    description:
      "Naše společnost se specializuje na autobusovou a nákladní dopravu. S našim rozsáhlým vozovým parkem a zkušeným týmem jsme připraveni zajistit veškeré vaše dopravní potřeby s důrazem na spolehlivost, pohodlí a bezpečnost. Nabízíme širokou nabídku služeb pro přepravu osob i zboží, a to nejen po České republice, ale i do zahraničí. Jsme tu pro vás, abychom vám poskytli profesionální a přátelský přístup ke každé zakázce.",
    heroText: "Spolehlivá doprava pro vaše potřeby.",
  },
  about: {
    kicker: "Rodinná dopravní firma od roku 2012",
    title: "O nás",
    paragraphs: [
      "Jsme rodinná dopravní firma, která působí na trhu již od roku 2012. Za tuhle dobu jsme nasbírali bohaté zkušenosti v oblasti autobusové dopravy a získali si důvěru mnoha spokojených zákazníků. Naším cílem je zajišťovat spolehlivé, bezpečné a pohodlné cestování pro jednotlivce, skupiny i firmy. Společnost vede pan Jiří Kopeček.",
      "Specializujeme se na nepravidelnou a linkovou dopravu, ať už jde o školní výlety, firemní akce, sportovní turnaje nebo jiné skupinové přepravy. Díky pravidelně udržovaným autobusům zajišťujeme maximální bezpečnost a komfort během cesty.",
      "Jsme tu pro vás, ať už potřebujete zajistit pohodlnou přepravu osob, nebo bezpečný transport nákladu. Rádi vám připravíme nabídku na míru – kontaktujte nás a přesvědčte se o kvalitě našich služeb sami!",
    ],
    stats: [
      { value: "2012", label: "Na trhu od roku" },
      { value: "7", label: "Vozidel ve vozovém parku" },
      { value: "500 000+", label: "Přes půl milionu přepravených zákazníků" },
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
      "Máte speciální požadavky na přepravu? Rádi vám vyjdeme vstříc! Neváhejte nás kontaktovat a společně najdeme to nejlepší řešení na míru šité právě pro vás.",
    signature: { name: "Jiří Kopeček", role: "majitel" },
  },
  services: {
    title: "Služby",
    description: "Nabízíme široké množství přepravních služeb.",
    swipeHint: "Více",
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
          "Naše vozová flotila zahrnuje různé typy vozidel s variabilní kapacitou, aby co nejlépe vyhověla vašim potřebám.",
      },
      luggage: {
        title: "Nadrozměrná zavazadla",
        description:
          "Nabízíme možnost připojení přívěsu nebo skiboxu, pro přepravu objemných zavazadel jako jsou třeba kola, lyže, kánoe.",
      },
    },
    irregularBusTransport: {
      schoolTransport: {
        title: "Doprava pro školy",
        description:
          "Poskytujeme dopravu na školní aktivity jako jsou výlety, lyžařské výcviky, plavání, bruslení nebo školy v přírodě. S námi dopravíte děti bezpečně. Autobusy jsou vybaveny bezpečnostními pásy pro každé sedadlo a mikrofony pro jednodušší komunikaci.",
      },
      sportsTransport: {
        title: "Doprava sportovních klubů a kroužků",
        description:
          "Už léta jsme spolehlivým partnerem pro mnoho sportovních klubů. Naše autobusy jsou vybaveny bezpečnostními pásy na každém sedadle a v případě potřeby nabízejí úložný prostor pro vaše sportovní potřeby.",
      },
      groupsTransport: {
        title: "Přeprava spolků a organizací",
        description:
          "Rádi vás pohodlně a bezstarostně dopravíme kamkoliv si přejete, ať už k moři, do hor, k hradům a zámkům, nebo kamkoliv jinam. Nabízíme také možnost převozu kol, lyží, kajaků, nebo jiných nadměrných zavazadel vyžadujících přívěs.",
      },
      airportTransfers: {
        title: "Letištní transfery",
        description:
          "Nabízíme spolehlivé letištní transfery do Vídně, Brna a dalších destinací. Na čase nezáleží, můžete se spolehnout, že vás odvezeme kdykoliv včas a bezpečně, ať už se jedná o brzké ranní nebo pozdní večerní hodiny.",
      },
      weddingTransport: {
        title: "Svatební přeprava",
        description:
          "Sami víme, že plánovat svatbu není jednoduché a parkování v centru města může být obtížné. Nechte to na nás. Zajistíme vám autobus s řidičem, který se vám bude věnovat po celou dobu svatby.",
      },
      replacementTransport: {
        title: "Náhradní autobusová doprava",
        description:
          "Jsme tu pro vás a rádi vám s vašimi potížemi pomůžeme, ať už je problém plánovaný či neplánovaný. S linkovou dopravou máme bohaté zkušenosti a na naší pomoc se můžete spolehnout.",
      },
    },
    corporateTransport: {
      title: "Firemní linková doprava",
      description:
        "Nabízíme firmám spolehlivou přepravu zaměstnanců s širokou nabídkou vozidel. S pravidelnou linkovou dopravou máme bohaté zkušenosti a rádi vám vypracujeme individuální plán včetně cenového návrhu.",
    },
    cargoTransport: {
      title: "Nákladní doprava",
      description:
        "Specializujeme se na spolehlivou přepravu zboží pomocí soupravy s návěsem walking floor. Bez problémů přepravíme sypké materiály, recykláty i paletové náklady. Naše vozidla pravidelně udržujeme pro maximální bezpečnost a spolehlivost.",
    },
  },
  fleet: {
    title: "Vozový park",
    description:
      "Náš vozový park tvoří moderní a spolehlivá vozidla, připravená bezpečně splnit vaše požadavky na přepravu.",
    features: {
      tourConfig: "Zájezdová konfigurace",
      recliningSeats: "Polohovaná sedadla",
      seatBelts: "Bezpečnostní pásy",
      airConditioning: "Klimatizace",
      tv: "Televize",
      microphone: "Mikrofon",
      fridge: "Lednička",
      toilet: "Palubní toaleta",
    },
  },
  contact: {
    title: "Kontakt",
    description:
      "Pokud vás zajímá nacenění zakázky, chcete si domluvit termín, nebo se jen dozvědět více o našich službách, jsme tady, abychom vám pomohli. Stačí se nám ozvat – ať už telefonicky nebo e-mailem. Náš přátelský a zkušený tým vám rád zodpoví všechny dotazy, vysvětlí detaily a postará se o to, aby vše proběhlo hladce a k vaší maximální spokojenosti. Těšíme se na naši budoucí spolupráci.",
    addressLine1: "V Chalupách 228/50",
    addressLine2: "Lužice 696 18, ČR",
    addressLabel: "Adresa",
    mapLabel: "Otevřít v Mapách",
    mapTitle: "Mapa – Autodoprava Kopeček, Lužice u Hodonína",
    phone: "+420 777 685 331",
    phoneLabel: "Telefon",
    callCta: "Zavolat",
    email: "jirikopecek@seznam.cz",
    emailLabel: "Email",
    mailSubject: "Poptávka přepravy",
    hoursLabel: "Provozní doba",
    hours: "Po–Pá 7:00–17:00 · po domluvě kdykoliv",
    billingTitle: "Fakturační údaje",
    companyID: "67004997",
    companyIDLabel: "IČ",
    taxID: "CZ7504284304",
    taxIDLabel: "DIČ",
    logoAlt: "Logo Autodoprava Kopeček",
    footerNote: "© {{year}} Autodoprava Kopeček. Všechna práva vyhrazena.",
    contactCta: "Kontaktujte nás",
    emailCta: "Napsat e-mail",
    footerBlurb: "Rodinná autobusová a nákladní doprava\nz Lužic u Hodonína.",
  },
  cta: {
    title: "Potřebujete dopravu?",
    description:
      "Zavolejte nám nebo napište – nabídku na míru vám připravíme obratem.",
  },
  faq: {
    title: "Časté dotazy",
    items: [
      {
        question: "Jak získám cenovou nabídku?",
        answer:
          "Stačí zavolat nebo napsat e-mail s termínem, trasou a počtem osob. Nabídku na míru vám připravíme obratem a zdarma.",
      },
      {
        question: "Kolik osob dokážete přepravit?",
        answer:
          "Vozový park pokrývá vše od mikrobusu pro 7+1 osob po autobus s 67 místy. Vyberete si podle velikosti skupiny.",
      },
      {
        question: "Převezete i kola, lyže nebo jiná objemná zavazadla?",
        answer:
          "Ano. K autobusům nabízíme připojení přívěsu nebo skiboxu, takže kola, lyže i kánoe s vámi pohodlně docestují.",
      },
      {
        question: "Jezdíte i do zahraničí?",
        answer:
          "Jezdíme po celé České republice i do zahraničí – zájezdy, letištní transfery do Vídně či Brna a další cesty po Evropě.",
      },
      {
        question: "Zajišťujete i nákladní dopravu?",
        answer:
          "Ano, specializujeme se na přepravu soupravou s návěsem walking floor – sypké materiály, recykláty i paletové náklady.",
      },
    ],
  },
  meta: {
    title: "Autodoprava Kopeček | Autobusová a nákladní doprava Hodonín",
    description:
      "Rodinná autobusová a nákladní doprava od roku 2012. Zájezdy, letištní transfery, školní i firemní doprava po ČR a Evropě. Lužice u Hodonína.",
  },
  a11y: {
    skipToContent: "Přeskočit na obsah",
    changeLanguage: "Změnit jazyk",
    openMenu: "Otevřít menu",
    closeMenu: "Zavřít menu",
    previousPhoto: "Předchozí fotografie",
    nextPhoto: "Další fotografie",
    photoOf: "Snímek {{current}} z {{total}}",
    heroSlides: "Úvodní fotografie",
    backToTop: "Zpět nahoru",
    showAllFeatures: "Zobrazit veškerou výbavu",
  },
  errors: {
    notFoundTitle: "Stránka nenalezena",
    notFoundDescription: "Stránka, kterou hledáte, neexistuje nebo byla přesunuta.",
    backHome: "Zpět na úvod",
    errorTitle: "Něco se pokazilo",
    errorDescription:
      "Zkuste prosím akci opakovat. Pokud problém přetrvává, kontaktujte nás telefonicky.",
    retry: "Zkusit znovu",
    home: "Domů",
  },
};

const en: SiteTexts = {
  home: {
    title: "Home",
    subtitle: "Kopeček Transport Services",
    description:
      "Our company specializes in bus and freight transportation. With our extensive fleet and experienced team, we are ready to meet all your transportation needs with a focus on reliability, comfort, and safety. We offer a wide range of services for the transportation of passengers and goods, not only within the Czech Republic but also abroad. We are here for you to provide a professional and friendly approach to every order.",
    heroText: "Reliable transport for your needs.",
  },
  about: {
    kicker: "A family-run transport company since 2012",
    title: "About Us",
    paragraphs: [
      "We are a family-owned transport company operating since 2012. Over the years, we have gained extensive experience in bus transport and earned the trust of many satisfied customers. Our goal is to provide reliable, safe, and comfortable travel for individuals, groups, and businesses. The company is led by Mr. Jiří Kopeček.",
      "We specialize in irregular and scheduled transport, whether it is school trips, corporate events, sports tournaments, or other group transportation. Thanks to regularly maintained buses, we ensure maximum safety and comfort during the journey.",
      "We are here for you, whether you need to arrange comfortable passenger transport or secure freight transportation. We are happy to provide a tailored offer – contact us and see the quality of our services for yourself!",
    ],
    stats: [
      { value: "2012", label: "On the road since" },
      { value: "7", label: "Vehicles in our fleet" },
      { value: "500,000+", label: "Over half a million passengers transported" },
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
    signature: { name: "Jiří Kopeček", role: "owner" },
  },
  services: {
    title: "Services",
    description: "We offer a wide range of transport services.",
    swipeHint: "More",
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
    irregularBusTransport: {
      schoolTransport: {
        title: "School Transport",
        description:
          "We provide transport for school activities such as trips, ski courses, swimming, ice-skating, or school camps. With us, children travel safely. Our buses are equipped with seatbelts on every seat and microphones for easier communication.",
      },
      sportsTransport: {
        title: "Transport for Sports Clubs and Groups",
        description:
          "For years, we have been a reliable partner for many sports clubs. Our buses have seatbelts on every seat and storage space for your sports equipment if needed.",
      },
      groupsTransport: {
        title: "Transport for Associations and Organizations",
        description:
          "We will take you comfortably and worry-free wherever you wish—whether to the sea, mountains, castles, or anywhere else. We also offer transport for bicycles, skis, kayaks, or other oversized luggage requiring a trailer.",
      },
      airportTransfers: {
        title: "Airport Transfers",
        description:
          "We offer airport transfers to Vienna, Brno, and other destinations. Time doesn't matter – you can count on us to take you safely and on time, whether it's early in the morning or late at night.",
      },
      weddingTransport: {
        title: "Wedding Transport",
        description:
          "We know that planning a wedding can be overwhelming, and parking in city centers can be tricky. Let us handle it for you. We’ll provide a bus with a driver who will be at your service throughout the event.",
      },
      replacementTransport: {
        title: "Replacement Bus Transport",
        description:
          "Looking for a replacement transport service? We are here to help, whether the issue is planned or unplanned. With extensive experience in scheduled transport, you can rely on our assistance.",
      },
    },
    corporateTransport: {
      title: "Corporate Shuttle Services",
      description:
        "We offer companies reliable employee transport with a wide range of vehicles. With extensive experience in regular shuttle services, we are happy to create a customized plan, including pricing.",
    },
    cargoTransport: {
      title: "Cargo Transport",
      description:
        "We specialize in reliable freight transport using a walking floor trailer. We efficiently handle bulk materials, agricultural commodities, recyclables, wood chips, and palletized goods. Our eco-friendly vehicles are regularly maintained to ensure maximum safety and reliability.",
    },
  },
  fleet: {
    title: "Fleet",
    description:
      "Our fleet consists of modern and reliable vehicles, ready to safely meet your transportation needs.",
    features: {
      tourConfig: "Coach configuration",
      recliningSeats: "Reclining seats",
      seatBelts: "Seat Belts",
      airConditioning: "Air Conditioning",
      tv: "TV",
      microphone: "Microphone System",
      fridge: "Refrigerator",
      toilet: "Onboard Toilet",
    },
  },
  contact: {
    title: "Contact",
    description:
      "If you're interested in getting a quote for your project, setting up a date, or simply learning more about our services, we're here to help. Just reach out to us – whether by phone or email. Our friendly and experienced team will gladly answer all your questions, explain the details, and ensure that everything runs smoothly to your complete satisfaction. We look forward to our future cooperation.",
    addressLine1: "V Chalupách 228/50",
    addressLine2: "Lužice 696 18, CZ",
    addressLabel: "Address",
    mapLabel: "Open in Maps",
    mapTitle: "Map – Autodoprava Kopeček, Lužice near Hodonín, Czech Republic",
    phone: "+420 777 685 331",
    phoneLabel: "Phone",
    callCta: "Call",
    email: "jirikopecek@seznam.cz",
    emailLabel: "Email",
    mailSubject: "Transport inquiry",
    hoursLabel: "Office hours",
    hours: "Mon–Fri 7:00–17:00 · anytime by arrangement",
    billingTitle: "Billing Information",
    companyID: "67004997",
    companyIDLabel: "Company ID",
    taxID: "CZ7504284304",
    taxIDLabel: "Tax ID",
    logoAlt: "Autodoprava Kopeček logo",
    footerNote: "© {{year}} Autodoprava Kopeček. All rights reserved.",
    contactCta: "Contact us",
    emailCta: "Send an email",
    footerBlurb: "Family-run bus and freight transport\nfrom Lužice near Hodonín.",
  },
  cta: {
    title: "Need transport?",
    description: "Call or write to us — we'll prepare a tailored quote right away.",
  },
  faq: {
    title: "Frequently Asked Questions",
    items: [
      {
        question: "How do I get a quote?",
        answer:
          "Just call or email us with your date, route, and number of passengers. We'll prepare a tailored quote promptly and free of charge.",
      },
      {
        question: "How many people can you transport?",
        answer:
          "Our fleet covers everything from a 7+1 minibus to a 67-seat coach, so you can pick the right size for your group.",
      },
      {
        question: "Can you carry bikes, skis, or other bulky luggage?",
        answer:
          "Yes. Our coaches can tow a trailer or carry a ski box, so bikes, skis, and canoes travel comfortably with you.",
      },
      {
        question: "Do you also travel abroad?",
        answer:
          "We operate across the Czech Republic and abroad — tours, airport transfers to Vienna or Brno, and other trips around Europe.",
      },
      {
        question: "Do you provide freight transport?",
        answer:
          "Yes, we specialize in transport with a walking-floor trailer — bulk materials, recyclables, and palletized goods.",
      },
    ],
  },
  meta: {
    title: "Autodoprava Kopeček | Bus & Freight Transport, Czech Republic",
    description:
      "Family-run bus and freight transport since 2012. Coach hire, airport transfers, school and corporate transport across the Czech Republic and Europe.",
  },
  a11y: {
    skipToContent: "Skip to content",
    changeLanguage: "Change language",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    previousPhoto: "Previous photo",
    nextPhoto: "Next photo",
    photoOf: "Photo {{current}} of {{total}}",
    heroSlides: "Intro photos",
    backToTop: "Back to top",
    showAllFeatures: "Show all equipment",
  },
  errors: {
    notFoundTitle: "Page not found",
    notFoundDescription: "The page you are looking for does not exist or has been moved.",
    backHome: "Back to homepage",
    errorTitle: "Something went wrong",
    errorDescription:
      "Please try again. If the problem persists, contact us by phone.",
    retry: "Try again",
    home: "Home",
  },
};

const de: SiteTexts = {
  home: {
    title: "Startseite",
    subtitle: "Kopeček Transport Dienstleistungen",
    description:
      "Unser Unternehmen ist auf Bus- und Gütertransport spezialisiert. Mit unserem umfangreichen Fuhrpark und erfahrenen Team sind wir bereit, all Ihre Transportbedürfnisse mit Fokus auf Zuverlässigkeit, Komfort und Sicherheit zu erfüllen. Wir bieten eine breite Palette an Dienstleistungen für den Personen- und Gütertransport, nicht nur innerhalb der Tschechischen Republik, sondern auch ins Ausland. Wir sind für Sie da, um Ihnen einen professionellen und freundlichen Service für jede Bestellung zu bieten.",
    heroText: "Zuverlässiger Transport für Ihre Bedürfnisse.",
  },
  about: {
    kicker: "Familiengeführtes Transportunternehmen seit 2012",
    title: "Über uns",
    paragraphs: [
      "Wir sind ein familiengeführtes Transportunternehmen, das seit 2012 tätig ist. Im Laufe der Jahre haben wir umfangreiche Erfahrungen im Busverkehr gesammelt und das Vertrauen vieler zufriedener Kunden gewonnen. Unser Ziel ist es, zuverlässige, sichere und komfortable Reisen für Einzelpersonen, Gruppen und Unternehmen zu gewährleisten. Das Unternehmen wird von Herrn Jiří Kopeček geleitet.",
      "Wir sind auf unregelmäßigen und Linienverkehr spezialisiert, sei es für Schulausflüge, Firmenveranstaltungen, Sportturniere oder andere Gruppenreisen. Dank regelmäßig gewarteter Busse gewährleisten wir maximale Sicherheit und Komfort während der Fahrt.",
      "Wir sind für Sie da, egal ob Sie einen komfortablen Personentransport oder einen sicheren Warentransport benötigen. Wir erstellen Ihnen gerne ein maßgeschneidertes Angebot – kontaktieren Sie uns und überzeugen Sie sich selbst von der Qualität unserer Dienstleistungen!",
    ],
    stats: [
      { value: "2012", label: "Auf dem Markt seit" },
      { value: "7", label: "Fahrzeuge im Fuhrpark" },
      { value: "500.000+", label: "Über eine halbe Million beförderte Fahrgäste" },
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
    signature: { name: "Jiří Kopeček", role: "Inhaber" },
  },
  services: {
    title: "Dienstleistungen",
    description: "Wir bieten eine Vielzahl von Transportdienstleistungen an.",
    swipeHint: "Mehr",
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
    irregularBusTransport: {
      schoolTransport: {
        title: "Schultransport",
        description:
          "Wir bieten Transport für Schulaktivitäten wie Ausflüge, Skikurse, Schwimmen, Schlittschuhlaufen oder Schullandheime. Mit uns reisen Kinder sicher. Unsere Busse sind mit Sicherheitsgurten an jedem Sitzplatz und Mikrofonen für eine einfache Kommunikation ausgestattet.",
      },
      sportsTransport: {
        title: "Transport für Sportvereine und Gruppen",
        description:
          "Seit Jahren sind wir ein zuverlässiger Partner für viele Sportvereine. Unsere Busse verfügen über Sicherheitsgurte an jedem Sitzplatz und bieten bei Bedarf Stauraum für Ihre Sportausrüstung.",
      },
      groupsTransport: {
        title: "Transport für Vereine und Organisationen",
        description:
          "Wir bringen Sie bequem und sorgenfrei überall hin – ob ans Meer, in die Berge, zu Burgen oder Schlössern. Wir bieten auch den Transport von Fahrrädern, Skiern, Kajaks oder anderen sperrigen Gepäckstücken, die einen Anhänger erfordern.",
      },
      airportTransfers: {
        title: "Flughafentransfers",
        description:
          "Benötigen Sie einen Transport zum Flughafen? Wir helfen Ihnen gerne. Unabhängig von der Uhrzeit können Sie sich darauf verlassen, dass wir Sie jederzeit und überall hinbringen, einschließlich Wien, Brünn und anderen Zielen.",
      },
      weddingTransport: {
        title: "Hochzeitstransport",
        description:
          "Wir wissen, dass die Planung einer Hochzeit stressig sein kann und das Parken in Stadtzentren schwierig ist. Überlassen Sie das uns. Wir stellen Ihnen einen Bus mit Fahrer zur Verfügung, der während der gesamten Veranstaltung für Sie da ist.",
      },
      replacementTransport: {
        title: "Ersatzbusverkehr",
        description:
          "Suchen Sie nach einem Ersatzverkehr? Wir sind für Sie da, ob das Problem geplant oder ungeplant ist. Mit umfangreicher Erfahrung im Linienverkehr können Sie auf unsere Unterstützung zählen.",
      },
    },
    corporateTransport: {
      title: "Firmenlinienverkehr",
      description:
        "Wir bieten Unternehmen zuverlässigen Mitarbeitertransport mit einer großen Auswahl an Fahrzeugen. Mit umfassender Erfahrung im regelmäßigen Linienverkehr erstellen wir gerne einen individuellen Plan inklusive Preisangebot.",
    },
    cargoTransport: {
      title: "Güterverkehr",
      description:
        "Wir spezialisieren uns auf zuverlässigen Gütertransport mit einem Walking-Floor-Auflieger. Wir transportieren effizient Schüttgüter, landwirtschaftliche Erzeugnisse, Recyclingmaterialien, Hackschnitzel und palettierte Waren. Unsere umweltfreundlichen Fahrzeuge werden regelmäßig gewartet, um maximale Sicherheit und Zuverlässigkeit zu gewährleisten.",
    },
  },
  fleet: {
    title: "Fuhrpark",
    description:
      "Unser Fuhrpark besteht ausschließlich aus modernen und zuverlässigen Fahrzeugen, die Ihren Transportanforderungen sicher gerecht werden.",
    features: {
      tourConfig: "Reisekonfiguration",
      recliningSeats: "Verstellbare Sitze",
      seatBelts: "Sicherheitsgurte",
      airConditioning: "Klimaanlage",
      tv: "Smart TV",
      microphone: "Mikrofonsystem",
      fridge: "Kühlschrank",
      toilet: "Bordtoilette",
    },
  },
  contact: {
    title: "Kontakt",
    description:
      "Wenn Sie ein Angebot für Ihr Projekt erhalten, einen Termin vereinbaren oder einfach mehr über unsere Dienstleistungen erfahren möchten, sind wir für Sie da. Kontaktieren Sie uns einfach – per Telefon oder E-Mail. Unser freundliches und erfahrenes Team beantwortet gerne all Ihre Fragen, erklärt die Details und sorgt dafür, dass alles reibungslos und zu Ihrer vollsten Zufriedenheit abläuft. Wir freuen uns auf unsere zukünftige Zusammenarbeit.",
    addressLine1: "V Chalupách 228/50",
    addressLine2: "Lužice 696 18, CZ",
    addressLabel: "Adresse",
    mapLabel: "In Karten öffnen",
    mapTitle: "Karte – Autodoprava Kopeček, Lužice bei Hodonín, Tschechien",
    phone: "+420 777 685 331",
    phoneLabel: "Telefon",
    callCta: "Anrufen",
    email: "jirikopecek@seznam.cz",
    emailLabel: "Email",
    mailSubject: "Transportanfrage",
    hoursLabel: "Öffnungszeiten",
    hours: "Mo–Fr 7:00–17:00 · nach Vereinbarung jederzeit",
    billingTitle: "Rechnungsinformationen",
    companyID: "67004997",
    companyIDLabel: "Unternehmens-ID",
    taxID: "CZ7504284304",
    taxIDLabel: "Steuer-ID",
    logoAlt: "Autodoprava Kopeček Logo",
    footerNote: "© {{year}} Autodoprava Kopeček. Alle Rechte vorbehalten.",
    contactCta: "Kontaktieren Sie uns",
    emailCta: "E-Mail schreiben",
    footerBlurb: "Familiengeführter Bus- und Gütertransport\naus Lužice bei Hodonín.",
  },
  cta: {
    title: "Brauchen Sie einen Transport?",
    description:
      "Rufen Sie uns an oder schreiben Sie uns – wir erstellen Ihnen umgehend ein maßgeschneidertes Angebot.",
  },
  faq: {
    title: "Häufige Fragen",
    items: [
      {
        question: "Wie erhalte ich ein Angebot?",
        answer:
          "Rufen Sie uns einfach an oder schreiben Sie eine E-Mail mit Termin, Strecke und Personenzahl. Wir erstellen Ihnen umgehend und kostenlos ein maßgeschneidertes Angebot.",
      },
      {
        question: "Wie viele Personen können Sie befördern?",
        answer:
          "Unser Fuhrpark reicht vom Kleinbus für 7+1 Personen bis zum Reisebus mit 67 Sitzplätzen – passend für jede Gruppengröße.",
      },
      {
        question: "Transportieren Sie auch Fahrräder, Skier oder sperriges Gepäck?",
        answer:
          "Ja. An unsere Busse können Anhänger oder Skiboxen angekoppelt werden, sodass Fahrräder, Skier und Kanus bequem mitreisen.",
      },
      {
        question: "Fahren Sie auch ins Ausland?",
        answer:
          "Wir fahren in der gesamten Tschechischen Republik und ins Ausland – Reisen, Flughafentransfers nach Wien oder Brünn und weitere Fahrten durch Europa.",
      },
      {
        question: "Bieten Sie auch Gütertransport an?",
        answer:
          "Ja, wir sind auf Transporte mit Walking-Floor-Auflieger spezialisiert – Schüttgüter, Recyclingmaterialien und palettierte Waren.",
      },
    ],
  },
  meta: {
    title: "Autodoprava Kopeček | Bus- und Gütertransport, Tschechien",
    description:
      "Familiengeführter Bus- und Gütertransport seit 2012. Busvermietung, Flughafentransfers, Schul- und Firmentransporte in Tschechien und Europa.",
  },
  a11y: {
    skipToContent: "Zum Inhalt springen",
    changeLanguage: "Sprache ändern",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    previousPhoto: "Vorheriges Foto",
    nextPhoto: "Nächstes Foto",
    photoOf: "Foto {{current}} von {{total}}",
    heroSlides: "Einführungsfotos",
    backToTop: "Nach oben",
    showAllFeatures: "Gesamte Ausstattung anzeigen",
  },
  errors: {
    notFoundTitle: "Seite nicht gefunden",
    notFoundDescription: "Die gesuchte Seite existiert nicht oder wurde verschoben.",
    backHome: "Zur Startseite",
    errorTitle: "Etwas ist schiefgelaufen",
    errorDescription:
      "Bitte versuchen Sie es erneut. Wenn das Problem weiterhin besteht, kontaktieren Sie uns telefonisch.",
    retry: "Erneut versuchen",
    home: "Startseite",
  },
};

const vehicles: Vehicle[] = [
  {
    id: "tourismo",
    name: {
      cs: "Mercedes-Benz Tourismo",
      en: "Mercedes-Benz Tourismo",
      de: "Mercedes-Benz Tourismo",
    },
    description: {
      cs: "Tento luxusní klimatizovaný autobus s <b>kapacitou 51 míst</b> je ideální volbou pro dálkové zájezdy.",
      en: "This luxurious air-conditioned coach with a <b>capacity of 51 seats</b> is the ideal choice for long-distance tours.",
      de: "Dieser luxuriöse, klimatisierte Reisebus mit einer <b>Kapazität von 51 Sitzplätzen</b> ist die ideale Wahl für Fernreisen.",
    },
    capacity: { cs: "51 míst", en: "51 seats", de: "51 Sitzplätze" },
    images: [
      "/pics/tourismo.jpg",
      "/pics/tourismo1.jpg",
      "/pics/tourismo2.jpg",
      "/pics/tourismo3.jpg",
      "/pics/tourismo4.jpg",
      "/pics/tourismo5.jpg",
      "/pics/tourismo6.jpg",
    ],
    features: [
      "tourConfig",
      "recliningSeats",
      "seatBelts",
      "airConditioning",
      "tv",
      "microphone",
      "fridge",
      "toilet",
    ],
  },
  {
    id: "travego",
    name: {
      cs: "Mercedes-Benz Travego",
      en: "Mercedes-Benz Travego",
      de: "Mercedes-Benz Travego",
    },
    description: {
      cs: "Moderní a prostorný tříosý autobus, který pojme až <b>62 cestujících</b>, je perfektní volbou na dlouhé cesty.",
      en: "A modern, spacious three-axle coach that accommodates up to <b>62 passengers</b>, making it perfect for long journeys.",
      de: "Ein moderner und geräumiger Reisebus, der bis zu <b>62 Passagiere</b> aufnehmen kann – perfekt für lange Reisen.",
    },
    capacity: { cs: "62 míst", en: "62 seats", de: "62 Sitzplätze" },
    images: [
      "/pics/travego.jpg",
      "/pics/travego1.jpg",
      "/pics/travego2.jpg",
      "/pics/travego3.jpg",
      "/pics/travego4.jpg",
      "/pics/travego5.jpg",
    ],
    features: [
      "tourConfig",
      "recliningSeats",
      "seatBelts",
      "airConditioning",
      "tv",
      "microphone",
      "fridge",
      "toilet",
    ],
  },
  {
    id: "setra",
    name: {
      cs: "Setra Multiclass",
      en: "Setra Multiclass",
      de: "Setra Multiclass",
    },
    description: {
      cs: "Tříosý moderní autobus s <b>kapacitou 67 míst</b>. Skvělá volba pro pravidelné linky a početnější skupiny.",
      en: "A modern three-axle bus with a <b>capacity of 67 seats</b>. A great choice for regular bus service and larger groups.",
      de: "Eine ausgezeichnete Wahl für den nationalen Transport oder regelmäßige Linienfahrten. Dieser moderne Bus bietet <b>67 Sitzplätze</b>.",
    },
    capacity: { cs: "67 míst", en: "67 seats", de: "67 Sitzplätze" },
    images: [
      "/pics/setra.jpg",
      "/pics/setra1.jpg",
      "/pics/setra2.jpg",
      "/pics/setra3.jpg",
      "/pics/setra4.jpg",
    ],
    features: ["seatBelts", "airConditioning", "tv", "microphone"],
  },
  {
    id: "viano",
    name: {
      cs: "Mercedes-Benz Viano",
      en: "Mercedes-Benz Viano",
      de: "Mercedes-Benz Viano",
    },
    description: {
      cs: "Elegantní a prostorný Mercedes Viano s <b>kapacitou 7+1</b> je ideální pro pohodlnou dopravu menších skupin.",
      en: "Elegant and spacious Mercedes Viano with a <b>7+1 seating capacity</b> is ideal for the comfortable transportation of small groups.",
      de: "Eleganter und geräumiger Mercedes Viano mit einer <b>Kapazität von 7+1 Sitzplätzen</b> ist ideal für den komfortablen Transport kleiner Gruppen.",
    },
    capacity: { cs: "7+1 míst", en: "7+1 seats", de: "7+1 Sitzplätze" },
    images: [
      "/pics/man.jpg",
      "/pics/man1.jpg",
      "/pics/man2.jpg",
      "/pics/man3.jpg",
      "/pics/man6.jpg",
      "/pics/man4.jpg",
      "/pics/man5.jpg",
    ],
    features: ["recliningSeats", "seatBelts", "airConditioning", "tv"],
  },
  {
    id: "tourino",
    name: {
      cs: "Mercedes-Benz Tourino",
      en: "Mercedes-Benz Tourino",
      de: "Mercedes-Benz Tourino",
    },
    description: {
      cs: "Stylový menší autobus, který přináší maximální komfort až <b>pro 36 osob</b>. Ideální volba pro menší skupiny.",
      en: "A stylish smaller bus that offers maximum comfort for up to <b>36 people</b>. Ideal choice for smaller groups.",
      de: "Ein stilvoller, kleinerer Reisebus, der maximalen Komfort für bis zu <b>36 Personen</b> bietet. Perfekt für kleinere Gruppen.",
    },
    capacity: { cs: "36 míst", en: "36 seats", de: "36 Sitzplätze" },
    images: ["/pics/tourino.jpg", "/pics/tourino2.jpg"],
    features: [
      "recliningSeats",
      "seatBelts",
      "airConditioning",
      "tv",
      "microphone",
      "fridge",
    ],
  },
  {
    id: "karosa",
    name: {
      cs: "Karosa Axer",
      en: "Karosa Axer",
      de: "Karosa Axer",
    },
    description: {
      cs: "Spolehlivý autobus určený na vnitrostátní výlety nebo pravidelné linkové trasy s <b>kapacitou 59 míst</b>.",
      en: "A reliable bus designed for domestic trips or regular bus service with a capacity of <b>59 seats</b>.",
      de: "Ein zuverlässiger Reisebus für Inlandsreisen oder regelmäßige Linienfahrten mit einer <b>Kapazität von 59 Sitzplätzen</b>.",
    },
    capacity: { cs: "59 míst", en: "59 seats", de: "59 Sitzplätze" },
    images: [
      "/pics/karosa.jpg",
      "/pics/karosa1.jpg",
      "/pics/karosa2.jpg",
      "/pics/karosa3.jpg",
      "/pics/karosa4.jpg",
    ],
    features: ["recliningSeats", "seatBelts", "airConditioning", "fridge"],
  },
  {
    id: "daf",
    name: {
      cs: "DAF XF 510 FT",
      en: "DAF XF 510 FT",
      de: "DAF XF 510 FT",
    },
    description: {
      cs: "Výkonný tahač s hydraulickým okruhem, schopen splnit i náročnější přepravu nákladů v těžším terénu.",
      en: "A powerful truck with a hydraulic circuit, capable of handling even more challenging transport in rough terrain.",
      de: "Ein leistungsstarker LKW für großvolumige und effiziente Warentransporte über lange Strecken.",
    },
    images: ["/pics/daf.jpg", "/pics/daf1.jpg", "/pics/daf2.jpg", "/pics/daf3.jpg"],
    features: [],
  },
];

const images: SiteImages = {
  // Curated from the full uvodka set: Dolomites coach, depot fleet lineup,
  // Adriatic-coast van, winter mountain pass, coach + truck pair. The
  // vehicles sit right-of-center in all of these, hence the focus values.
  hero: [
    { src: "/pics/uvodka.jpg", focus: "right" },
    { src: "/pics/uvodka4.jpg", focus: "right" },
    { src: "/pics/uvodka8.jpg", focus: "right" },
    { src: "/pics/uvodka5.jpg", focus: "right" },
    { src: "/pics/uvodka1.jpg", focus: "right" },
  ],
  services: {
    schoolTransport: "/pics/uvodka2.jpg",
    airportTransfers: "/pics/man.jpg",
    cargoTransport: "/pics/daf.jpg",
  },
  about: ["/pics/tourismo2.jpg", "/pics/mercedes1.jpg"],
};

export const defaultContent: SiteContent = {
  texts: { cs, en, de },
  vehicles,
  images,
};
