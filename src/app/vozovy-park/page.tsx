"use client";

import { useTranslation } from "react-i18next";
import { Check, X } from "lucide-react"; // Import icons from Lucide React
import Image from "next/image";

export default function VozovyPark() {
  const { t } = useTranslation();

  // Retrieve vehicle details and feature headers from translations, providing defaults if missing
  const vehicles = (t("fleet.vehicleDetails", { returnObjects: true }) ||
    []) as Array<{
    name: string;
    seats: string;
    features: string[];
  }>;

  const featureHeaders = (t("fleet.featureHeaders", { returnObjects: true }) ||
    []) as string[];

  // Sample data for excursion transport (Zájezdová doprava)
  const excursionTransport = [
    {
      img: "/images/bus1.jpg",
      name: "Karosa karosa 600",
      description: "Moderní autobus s kapacitou 50 osob.",
    },
    {
      img: "/images/bus2.jpg",
      name: "Karosa karosa 600",
      description: "Luxusní klimatizovaný autobus s TV a lednicí.",
    },
    {
      img: "/images/bus3.jpg",
      name: "Karosa karosa 600",
      description: "Ekologický autobus vhodný pro dlouhé cesty.",
    },
    {
      img: "/images/bus4.jpg",
      name: "Karosa karosa 600",
      description: "Kompaktní autobus pro menší skupiny.",
    },
    {
      img: "/images/bus5.jpg",
      name: "Karosa karosa 600",
      description: "Ideální autobus pro firemní výlety.",
    },
    {
      img: "/images/bus6.jpg",
      name: "Karosa karosa 600",
      description: "Stylový autobus s veškerým komfortem.",
    },
  ];

  // Sample data for freight transport (Nákladní doprava)
  const freightTransport = [
    {
      img: "/images/truck1.jpg",
      name: "Karosa karosa 600",
      description: "Nákladní vůz pro velkoobjemový transport.",
    },
    {
      img: "/images/truck2.jpg",
      name: "Karosa karosa 600",
      description: "Chlazený vůz pro přepravu potravin.",
    },
  ];

  return (
    <section id="vozovy-park" className="bg-white py-16 px-8 sm:px-16 lg:px-32">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-semibold text-red-600 mb-4">
          {t("fleet.title")}
        </h2>
        <p className="text-base text-gray-700">{t("fleet.description")}</p>
      </div>
      {/* Excursion Transport (Zájezdová doprava) */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Zájezdová doprava
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {excursionTransport.map((bus, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image
                src={bus.img}
                alt={`Bus ${index + 1}`}
                width={300}
                height={200}
                className="rounded-md"
              />
              <p className="mt-4 text-gray-700 font-bold text-center">
                {bus.name}
              </p>
              <p className="mt-4 text-gray-700 text-center">
                {bus.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Freight Transport (Nákladní doprava) */}
      <div className="mb-16">
        <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
          Nákladní doprava
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {freightTransport.map((truck, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image
                src={truck.img}
                alt={`Truck ${index + 1}`}
                width={300}
                height={200}
                className="rounded-md"
              />
              <p className="mt-4 text-gray-700 font-bold text-center">
                {truck.name}
              </p>

              <p className="mt-4 text-gray-700 text-center">
                {truck.description}
              </p>
            </div>
          ))}
        </div>
      </div>
      {/* Merged Table */}
      <div className="overflow-x-auto mb-16">
        <table className="w-full border border-gray-300 text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border-b border-gray-300 text-gray-700">
                {t("fleet.headers.vehicleName")}
              </th>
              <th className="px-4 py-2 border-b border-gray-300 text-gray-700 text-center">
                {t("fleet.headers.seats")}
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
                <td className="px-4 py-2 border-b border-gray-300">
                  {vehicle.name}
                </td>
                <td className="px-4 py-2 border-b border-gray-300 text-center">
                  {vehicle.seats}
                </td>
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
