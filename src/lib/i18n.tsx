import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    cs: {
      common: {
        home: {
          title: "Domů",
          subtitle: "Autodoprava Kopeček",
          description:
            "Naše společnost se specializuje na autobusovou a nákladní dopravu. S našim rozsáhlým vozovým parkem a zkušeným týmem jsme připraveni zajistit veškeré vaše dopravní potřeby s důrazem na spolehlivost, pohodlí a bezpečnost. Nabízíme širokou nabídku služeb pro přepravu osob i zboží, a to nejen po České republice, ale i do zahraničí. Jsme tu pro vás, abychom vám poskytli profesionální a přátelský přístup ke každé zakázce.",
          heroText: "Spolehlivá doprava pro vaše potřeby.",
        },
        about: {
          title: "O nás",
          paragraphs: [
            "Jsme rodinná dopravní firma, která působí na trhu již od roku 2012. Za tuhle dobu jsme nasbírali bohaté zkušenosti v oblasti autobusové dopravy a získali si důvěru mnoha spokojených zákazníků. Naším cílem je zajišťovat spolehlivé, bezpečné a pohodlné cestování pro jednotlivce, skupiny i firmy. Společnost vede pan Jiří Kopeček.",
            "Specializujeme se na nepravidelnou a linkovou dopravu, ať už jde o školní výlety, firemní akce, sportovní turnaje nebo jiné skupinové přepravy. Díky pravidelně udržovaným autobusům zajišťujeme maximální bezpečnost a komfort během cesty.",
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
            "Máte speciální požadavky na přepravu? Rádi vám vyjdeme vstříc! Neváhejte nás kontaktovat a společně najdeme to nejlepší řešení na míru šité právě pro vás.",
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
        },
        fleet: {
          title: "Vozový park",
          description:
            "Náš vozový park tvoří moderní a spolehlivá vozidla, připravená bezpečně splnit vaše požadavky na přepravu.",
          icons: {
            BeachIcon: "Zájezdová konfigurace",
            AirplaneSeatIcon: "Polohovaná sedadla",
            BeltIcon: "Bezpečnostní pásy",
            ThermometerColdIcon: "Klimatizace",
            TvSmartIcon: "Televize",
            Mic01Icon: "Mikrofon",
            FridgeIcon: "Lednička",
            Toilet01Icon: "Palubní toaleta",
          },
          vehicles: {
            name: {
              tourismo: "Mercedes-Benz Tourismo",
              travego: "Mercedes-Benz Travego",
              setra: "Setra Multiclass",
              man: "Mercedes-Benz Viano",
              karosa: "Karosa Axer",
              tourino: "Mercedes-Benz Tourino",
            },
            description: {
              tourismo:
                "Tento luxusní klimatizovaný autobus s <strong>kapacitou 51 míst</strong> je ideální volbou pro dálkové zájezdy.",
              travego:
                "Moderní a prostorný tříosý autobus, který pojme až <strong>62 cestujících</strong>, je perfektní volbou na dlouhé cesty.",
              setra:
                "Tříosý moderní autobus s <strong>kapacitou 67 míst</strong>. Skvělá volba pro pravidelné linky a početnější skupiny.",
              man: "Kompaktní, ale velice prostorný autobus, ideální pro <strong>skupiny do 57 cestujících</strong>.",
              karosa:
                "Spolehlivý autobus určený na vnitrostátní výlety nebo pravidelné linkové trasy s <strong>kapacitou 59 míst</strong>.",
              tourino:
                "Stylový menší autobus, který přináší maximální komfort až <strong>pro 36 osob</strong>. Ideální volba pro menší skupiny.",
            },
          },
        },
        contact: {
          title: "Kontakt",
          description:
            "Pokud vás zajímá nacenění zakázky, chcete si domluvit termín, nebo se jen dozvědět více o našich službách, jsme tady, abychom vám pomohli. Stačí se nám ozvat – ať už telefonicky nebo e-mailem. Náš přátelský a zkušený tým vám rád zodpoví všechny dotazy, vysvětlí detaily a postará se o to, aby vše proběhlo hladce a k vaší maximální spokojenosti. Těšíme se na naši budoucí spolupráci.",
          address: "V Chalupách 228/50,<br>Lužice 696 18, ČR",
          addressLabel: "Adresa",
          phone: "+420 777 685 331",
          phoneLabel: "Telefon",
          email: "jirikopecek@seznam.cz",
          emailLabel: "Email",
          billingTitle: "Fakturační údaje",
          companyID: "67004997",
          companyIDLabel: "IČ",
          taxID: "CZ7504284304",
          taxIDLabel: "DIČ",
        },
      },
    },
    en: {
      common: {
        home: {
          title: "Home",
          subtitle: "Kopeček Transport Services",
          description:
            "Our company specializes in bus and freight transportation. With our extensive fleet and experienced team, we are ready to meet all your transportation needs with a focus on reliability, comfort, and safety. We offer a wide range of services for the transportation of passengers and goods, not only within the Czech Republic but also abroad. We are here for you to provide a professional and friendly approach to every order.",
          heroText: "Reliable transport for your needs.",
        },
        about: {
          title: "About Us",
          paragraphs: [
            "We are a family-owned transport company operating since 2012. Over the years, we have gained extensive experience in bus transport and earned the trust of many satisfied customers. Our goal is to provide reliable, safe, and comfortable travel for individuals, groups, and businesses. The company is led by Mr. Jiří Kopeček.",
            "We specialize in irregular and scheduled transport, whether it is school trips, corporate events, sports tournaments, or other group transportation. Thanks to regularly maintained buses, we ensure maximum safety and comfort during the journey.",
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
        },
        fleet: {
          title: "Fleet",
          description:
            "Our fleet consists of modern and reliable vehicles, ready to safely meet your transportation needs.",
          icons: {
            BeachIcon: "Coach configuration",
            AirplaneSeatIcon: "Reclining seats",
            BeltIcon: "Seat Belts",
            ThermometerColdIcon: "Air Conditioning",
            TvSmartIcon: "TV",
            Mic01Icon: "Microphone System",
            FridgeIcon: "Refrigerator",
            Toilet01Icon: "Onboard Toilet",
          },
          vehicles: {
            name: {
              tourismo: "Mercedes-Benz Tourismo",
              travego: "Mercedes-Benz Travego",
              setra: "Setra Multiclass",
              man: "Mercedes-Benz Viano",
              karosa: "Karosa Axer",
              tourino: "Mercedes-Benz Tourino",
              fmax: "Ford F-Max + 13.6m walking floor",
              daf: "DAF XF 510 FT",
            },
            description: {
              tourismo:
                "This luxurious air-conditioned coach with a <strong>capacity of 51 seats</strong> is the ideal choice for long-distance tours.",
              travego:
                "A modern, spacious three-axle coach that accommodates up to <strong>62 passengers</strong>, making it perfect for long journeys.",
              setra:
                "A modern three-axle bus with a <strong>capacity of 67 seats</strong>. A great choice for regular bus service and larger groups.",
              man: "Compact yet very spacious bus, ideal for groups of up to <strong>57 passengers</strong>.",
              karosa:
                "A reliable bus designed for domestic trips or regular bus service with a capacity of <strong>59 seats</strong>.",
              tourino:
                "A stylish smaller bus that offers maximum comfort for up to <strong>36 people</strong>. Ideal choice for smaller groups.",
              fmax: "This robust hydraulic truck unit with a walking floor is ready for the most difficult transports.",
              daf: "A powerful truck with a hydraulic circuit, capable of handling even more challenging transport in rough terrain.",
            },
          },
        },
        contact: {
          title: "Contact",
          description:
            "If you're interested in getting a quote for your project, setting up a date, or simply learning more about our services, we're here to help. Just reach out to us – whether by phone or email. Our friendly and experienced team will gladly answer all your questions, explain the details, and ensure that everything runs smoothly to your complete satisfaction. We look forward to our future cooperation.",
          address: "V Chalupách 228/50,<br>Lužice 696 18, CZ",
          addressLabel: "Address",
          phone: "+420 777 685 331",
          phoneLabel: "Phone",
          email: "jirikopecek@seznam.cz",
          emailLabel: "Email",
          billingTitle: "Billing Information",
          companyID: "67004997",
          companyIDLabel: "Company ID",
          taxID: "CZ7504284304",
          taxIDLabel: "Tax ID",
        },
      },
    },
    de: {
      common: {
        home: {
          title: "Startseite",
          subtitle: "Kopeček Transport Dienstleistungen",
          description:
            "Unser Unternehmen ist auf Bus- und Gütertransport spezialisiert. Mit unserem umfangreichen Fuhrpark und erfahrenen Team sind wir bereit, all Ihre Transportbedürfnisse mit Fokus auf Zuverlässigkeit, Komfort und Sicherheit zu erfüllen. Wir bieten eine breite Palette an Dienstleistungen für den Personen- und Gütertransport, nicht nur innerhalb der Tschechischen Republik, sondern auch ins Ausland. Wir sind für Sie da, um Ihnen einen professionellen und freundlichen Service für jede Bestellung zu bieten.",
          heroText: "Zuverlässiger Transport für Ihre Bedürfnisse.",
        },
        about: {
          title: "Über uns",
          paragraphs: [
            "Wir sind ein familiengeführtes Transportunternehmen, das seit 2012 tätig ist. Im Laufe der Jahre haben wir umfangreiche Erfahrungen im Busverkehr gesammelt und das Vertrauen vieler zufriedener Kunden gewonnen. Unser Ziel ist es, zuverlässige, sichere und komfortable Reisen für Einzelpersonen, Gruppen und Unternehmen zu gewährleisten. Das Unternehmen wird von Herrn Jiří Kopeček geleitet.",
            "Wir sind auf unregelmäßigen und Linienverkehr spezialisiert, sei es für Schulausflüge, Firmenveranstaltungen, Sportturniere oder andere Gruppenreisen. Dank regelmäßig gewarteter Busse gewährleisten wir maximale Sicherheit und Komfort während der Fahrt.",
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
        },
        fleet: {
          title: "Fuhrpark",
          description:
            "Unser Fuhrpark besteht ausschließlich aus modernen und zuverlässigen Fahrzeugen, die Ihren Transportanforderungen sicher gerecht werden.",
          icons: {
            BeachIcon: "Geeignet für Reisen ins Ausland",
            AirplaneSeatIcon: "Verstellbare Sitze",
            BeltIcon: "Sicherheitsgurte",
            ThermometerColdIcon: "Klimaanlage",
            TvSmartIcon: "Smart TV",
            Mic01Icon: "Mikrofonsystem",
            FridgeIcon: "Kühlschrank",
            Toilet01Icon: "Bordtoilette",
          },
          vehicles: {
            name: {
              tourismo: "Mercedes-Benz Tourismo",
              travego: "Mercedes-Benz Travego",
              setra: "Setra Multiclass",
              man: "Mercedes-Benz Viano",
              karosa: "Karosa Axer",
              tourino: "Mercedes-Benz Tourino",
              fmax: "Ford F-Max + 13.6m Anhänger",
              daf: "DAF XF 510 FT",
            },
            description: {
              tourismo:
                "Dieser luxuriöse, klimatisierte Reisebus mit einer <strong>Kapazität von 51 Sitzplätzen</strong> ist die ideale Wahl für Fernreisen.",
              travego:
                "Ein moderner und geräumiger Reisebus, der bis zu <strong>62 Passagiere</strong> aufnehmen kann – perfekt für lange Reisen.",
              setra:
                "Eine ausgezeichnete Wahl für den nationalen Transport oder regelmäßige Linienfahrten. Dieser moderne Bus bietet <strong>67 Sitzplätze</strong>.",
              man: "Kompakt, aber sehr geräumig – ideal für Gruppen von <strong>bis zu 57 Passagieren</strong>.",
              karosa:
                "Ein zuverlässiger Reisebus für Inlandsreisen oder regelmäßige Linienfahrten mit einer <strong>Kapazität von 59 Sitzplätzen</strong>.",
              tourino:
                "Ein stilvoller, kleinerer Reisebus, der maximalen Komfort für bis zu <strong>36 Personen</strong> bietet. Perfekt für kleinere Gruppen.",
              fmax: "Diese robuste Sattelzugmaschine mit langem Auflieger ist bereit für die anspruchsvollsten Transporte.",
              daf: "Ein leistungsstarker LKW für großvolumige und effiziente Warentransporte über lange Strecken.",
            },
          },
        },
        contact: {
          title: "Kontakt",
          description:
            "Wenn Sie ein Angebot für Ihr Projekt erhalten, einen Termin vereinbaren oder einfach mehr über unsere Dienstleistungen erfahren möchten, sind wir für Sie da. Kontaktieren Sie uns einfach – per Telefon oder E-Mail. Unser freundliches und erfahrenes Team beantwortet gerne all Ihre Fragen, erklärt die Details und sorgt dafür, dass alles reibungslos und zu Ihrer vollsten Zufriedenheit abläuft. Wir freuen uns auf unsere zukünftige Zusammenarbeit.",
          address: "V Chalupách 228/50,<br>Lužice 696 18, CZ",
          addressLabel: "Adresse",
          phone: "+420 777 685 331",
          phoneLabel: "Telefon",
          email: "jirikopecek@seznam.cz",
          emailLabel: "Email",
          billingTitle: "Rechnungsinformationen",
          companyID: "67004997",
          companyIDLabel: "Unternehmens-ID",
          taxID: "CZ7504284304",
          taxIDLabel: "Steuer-ID",
        },
      },
    },
  },
  lng: "cs",
  fallbackLng: "cs",
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
  debug: true,
});

export default i18n;
