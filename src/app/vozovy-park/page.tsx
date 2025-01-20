"use client";

import { useTranslation } from "react-i18next";
import { Check, X } from "lucide-react"; // Import icons from Lucide React

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

  return (
    <section id="vozovy-park" className="bg-white py-16 px-8 sm:px-16 lg:px-32">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold text-red-600 mb-4">
          {t("fleet.title")}
        </h2>
        <p className="text-base text-gray-700">{t("fleet.description")}</p>
      </div>

      {/* Merged Table */}
      <div className="overflow-x-auto">
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
                {/* Vehicle Name */}
                <td className="px-4 py-2 border-b border-gray-300">
                  {vehicle.name}
                </td>

                {/* Number of Seats */}
                <td className="px-4 py-2 border-b border-gray-300 text-center">
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
