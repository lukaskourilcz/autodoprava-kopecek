"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { Mail, MapPinHouse, Phone, Send, Loader2 } from "lucide-react";
import { SafeText } from "../components/SafeText";
import { ContactFormData } from "../../types";

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const mailtoLink = `mailto:${t("contact.email")}?subject=${encodeURIComponent(
        `Poptávka od ${formData.name}`
      )}&body=${encodeURIComponent(
        `Jméno: ${formData.name}\nEmail: ${formData.email}\n\nZpráva:\n${formData.message}`
      )}`;

      window.location.href = mailtoLink;
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <section
        id="kontakt"
        className="bg-gray-100 py-12 sm:py-16 px-4 sm:px-8 md:px-16 lg:px-32 relative"
        style={{
          backgroundImage: "url('/pics/footer-map.webp')",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center bg-white bg-opacity-90 p-6 sm:p-8 rounded-3xl shadow-lg mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              {t("contact.title")}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-3xl mx-auto">
              {t("contact.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white bg-opacity-90 p-6 sm:p-8 rounded-3xl shadow-lg">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <span className="text-gray-600 flex-shrink-0 mt-1" aria-hidden="true">
                    <MapPinHouse size={24} />
                  </span>
                  <div>
                    <p className="font-bold text-gray-800 mb-1">{t("contact.addressLabel")}</p>
                    <p className="text-gray-700">
                      <SafeText text={t("contact.address")} />
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-gray-600 flex-shrink-0 mt-1" aria-hidden="true">
                    <Phone size={24} />
                  </span>
                  <div>
                    <p className="font-bold text-gray-800 mb-1">{t("contact.phoneLabel")}</p>
                    <a
                      href={`tel:${t("contact.phone").replace(/\s/g, "")}`}
                      className="text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      {t("contact.phone")}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <span className="text-gray-600 flex-shrink-0 mt-1" aria-hidden="true">
                    <Mail size={24} />
                  </span>
                  <div>
                    <p className="font-bold text-gray-800 mb-1">{t("contact.emailLabel")}</p>
                    <a
                      href={`mailto:${t("contact.email")}`}
                      className="text-blue-600 hover:text-blue-800 underline transition-colors"
                    >
                      {t("contact.email")}
                    </a>
                  </div>
                </div>

                <div className="border-t pt-6 mt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    {t("contact.billingTitle")}
                  </h3>
                  <div className="space-y-2">
                    <p className="text-gray-700">
                      <span className="font-bold">{t("contact.companyIDLabel")}:</span>{" "}
                      {t("contact.companyID")}
                    </p>
                    <p className="text-gray-700">
                      <span className="font-bold">{t("contact.taxIDLabel")}:</span>{" "}
                      {t("contact.taxID")}
                    </p>
                  </div>
                </div>

                <div className="flex justify-center pt-4">
                  <Image
                    src="/pics/logo-black-footer.webp"
                    alt={t("contact.logoAlt")}
                    width={150}
                    height={150}
                    className="object-contain"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-90 p-6 sm:p-8 rounded-3xl shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                {t("contact.form.title")}
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("contact.form.name")} *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t("contact.form.namePlaceholder")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    aria-required="true"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("contact.form.email")} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t("contact.form.emailPlaceholder")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    aria-required="true"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    {t("contact.form.message")} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t("contact.form.messagePlaceholder")}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                    aria-required="true"
                  />
                </div>

                {submitStatus === "success" && (
                  <div
                    className="p-3 bg-green-100 text-green-700 rounded-lg text-sm"
                    role="alert"
                  >
                    {t("contact.form.success")}
                  </div>
                )}

                {submitStatus === "error" && (
                  <div
                    className="p-3 bg-red-100 text-red-700 rounded-lg text-sm"
                    role="alert"
                  >
                    {t("contact.form.error")}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      {t("contact.form.sending")}
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      {t("contact.form.submit")}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 py-6" role="contentinfo">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-white text-sm">
            &copy; {new Date().getFullYear()} Autodoprava Kopeček. Všechna práva vyhrazena.
          </p>
        </div>
      </footer>
    </>
  );
}
