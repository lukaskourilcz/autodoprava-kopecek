"use client";

import { useTranslation } from "react-i18next";
import { Check, Slash, X } from "lucide-react";
import Image from "next/image";

export default function VozovyPark() {
  const { t } = useTranslation();

  const vehicles = (t("fleet.vehicleDetails", { returnObjects: true }) ||
    []) as Array<{
    name: string;
    seats: string;
    features: string[];
  }>;

  const featureHeaders = (t("fleet.featureHeaders", { returnObjects: true }) ||
    []) as string[];

  const excursionTransport = [
    {
      img: "/pics/mercedes1.png",
      name: "Mercedes-Benz Travego",
      description: "Moderní autobus s kapacitou 62 osob.",
    },
    {
      img: "/pics/mercedes2.png",
      name: "Mercedes-Benz Tourismo",
      description: "Luxusní klimatizovaný autobus s TV a lednicí, kapacita 51 osob.",
    },
    {
      img: "/pics/setra.png",
      name: "Setra Multiclass",
      description: "Moderní autobus s kapacitou 67 osob.",
    },
    {
      img: "/pics/mercedes2.png",
      name: "MAN Lion's Regio",
      description: "Kompaktní autobus pro skupiny do 57 osob.",
    },
    {
      img: "/pics/setra.png",
      name: "Karosa Axer",
      description: "Ideální autobus pro výlety po tuzemsku, kapacita 59 osob.",
    },
    {
      img: "/pics/mercedes1.png",
      name: "Mercedes-Benz Tourino",
      description: "Stylový autobus s veškerým komfortem pro 36 osob.",
    },
  ];

  const freightTransport = [
    {
      img: "/pics/fmax.png",
      name: "Ford F-Max + 13.6m návěs",
      description: "Nákladní vůz pro velkoobjemový transport.",
    },
    {
      img: "/pics/daf.png",
      name: "DAF XF 510 FT",
      description: "Nákladní vůz pro velkoobjemový transport.",
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {excursionTransport.map((bus, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image
                src={bus.img}
                alt={`Bus ${index + 1}`}
                width={350}
                height={350}
                className="rounded-[15%]"
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
      <div className="">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {freightTransport.map((truck, index) => (
            <div key={index} className="flex flex-col items-center">
              <Image
                src={truck.img}
                alt={`Truck ${index + 1}`}
                width={350}
                height={350}
                className="rounded-[15%]"
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
      {/* <div className="overflow-x-auto">
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
                    ) : feature === "/" ? (
                      <Slash className="text-gray-500 w-5 h-5 mx-auto" />
                    ): (
                      <X className="text-red-500 w-5 h-5 mx-auto" />
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </section>
  );
}
