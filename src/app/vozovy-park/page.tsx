import { Check, X } from "lucide-react"; // Import icons from Lucide React

export default function VozovyPark() {
  const vehicles = [
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
  ];

  const featureHeaders = [
    "Zájezd",
    "Klima",
    "Pásy",
    "Sedadla",
    "TV",
    "Mikrofon",
    "Lednice",
    "Toaleta",
  ];

  return (
    <section id="vozovy-park" className="bg-white py-16 px-8 sm:px-16 lg:px-32">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">
          Vozový park
        </h2>
        <p className="text-base text-gray-700">
          Naše flotila vozidel je moderní, bezpečná a připravena zvládnout
          jakýkoliv úkol.
        </p>
      </div>

      {/* Merged Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b border-gray-300 text-gray-700">
                Název vozidla
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-gray-700">
                Počet míst
              </th>
              {featureHeaders.map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-2 border-b border-gray-300 text-gray-700 text-center"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {vehicles.map((vehicle, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
              >
                {/* Vehicle Name */}
                <td className="px-4 py-2 border-b border-gray-300">
                  {vehicle.name}
                </td>

                {/* Number of Seats */}
                <td className="px-4 py-2 border-b border-gray-300">
                  {vehicle.seats}
                </td>

                {/* Features */}
                {vehicle.features.map((feature, i) => (
                  <td
                    key={i}
                    className="px-4 py-2 border-b border-gray-300 text-center"
                  >
                    {feature === "A" ? (
                      <Check className="text-green-500 w-5 h-5 mx-auto" />
                    ) : (
                      <X className="text-red-500 w-5 h-5 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
