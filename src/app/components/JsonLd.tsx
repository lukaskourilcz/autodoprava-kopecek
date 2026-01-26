export function JsonLdSchema() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://www.autobusyhodonin.cz/#organization",
    name: "Autodoprava Kopecek",
    alternateName: "Autodoprava Kopecek s.r.o.",
    description:
      "Moderní a spolehlivá autobusová doprava v Hodoníně. Zajišťujeme komfortní přepravu pro skupiny i jednotlivce.",
    url: "https://www.autobusyhodonin.cz",
    logo: "https://www.autobusyhodonin.cz/pics/logo-whiteyellow-nav.webp",
    image: "https://www.autobusyhodonin.cz/pics/uvodka.webp",
    telephone: "+420 777 685 331",
    email: "jirikopecek@seznam.cz",
    address: {
      "@type": "PostalAddress",
      streetAddress: "V Chalupách 228/50",
      addressLocality: "Lužice",
      postalCode: "696 18",
      addressCountry: "CZ",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 48.8517,
      longitude: 17.0631,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    priceRange: "$$",
    areaServed: [
      {
        "@type": "Country",
        name: "Czech Republic",
      },
      {
        "@type": "Country",
        name: "Germany",
      },
      {
        "@type": "Country",
        name: "Austria",
      },
    ],
    sameAs: [],
  };

  const transportServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Bus Transportation",
    provider: {
      "@id": "https://www.autobusyhodonin.cz/#organization",
    },
    areaServed: {
      "@type": "Country",
      name: "Czech Republic",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Transportation Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "School Transport",
            description:
              "Safe and reliable transportation for school activities, trips, and events.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Sports Club Transport",
            description:
              "Transportation services for sports clubs and athletic events.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Airport Transfers",
            description:
              "Reliable airport transfer services to Vienna, Brno, and other destinations.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Transport",
            description:
              "Comfortable bus transportation for wedding guests and events.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Corporate Shuttle",
            description: "Regular employee transportation services for businesses.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Cargo Transport",
            description:
              "Freight transport using walking floor trailer for bulk materials.",
          },
        },
      ],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(transportServiceSchema),
        }}
      />
    </>
  );
}
