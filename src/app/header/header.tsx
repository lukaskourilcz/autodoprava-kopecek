export default function Header() {
  return (
<section
    id="uvod"
    className="h-screen bg-white bg-cover bg-center relative"
>    <div
        className="absolute inset-0 bg-black opacity-80"
        style={{
            backgroundImage: "url('/pics/uvodka.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
        }}
    ></div>
          <div
              className="w-5/6 absolute left-1/2 transform -translate-x-1/2 top-2/3 p-8 bg-white bg-opacity-70 rounded-lg shadow-lg text-center"
              style={{
                  transform: "translate(-50%, -33.33%)", 
              }}
          >
              <h1 className="text-4xl font-bold mb-4">Autodoprava Kopeček</h1>
              <p className="text-lg">
                  Naše firma se zabývá autobusovou a nákladní dopravou. S našim širokým
                  vozovým parkem a zkušeným týmem jsme připraveni splnit veškeré vaše
                  dopravní potřeby s důrazem na spolehlivost, komfort a bezpečnost.
                  Nabízíme široké množství služeb přepravy osob a zboží jak v tuzemsku,
                  i do zahraničí.
              </p>
          </div>
      </section>
  );
}
