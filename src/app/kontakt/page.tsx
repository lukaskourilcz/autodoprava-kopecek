'use client';

import { useTranslation } from 'react-i18next';

export default function Kontakt() {
  const { t } = useTranslation();

  return (
    <section id="kontakt" className="bg-gray-100 py-16 px-4 sm:px-8 md:px-16 lg:px-32">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">
          {t('contact.title')}
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          {t('contact.description')}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {t('contact.title')}
            </h3>
            <p className="text-gray-700">
              <span className="font-bold">{t('contact.addressLabel')}:</span>{' '}
              {t('contact.address')}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">{t('contact.phoneLabel')}:</span>{' '}
              {t('contact.phone')}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">{t('contact.emailLabel')}:</span>{' '}
              <a href={`mailto:${t('contact.email')}`} className="text-blue-600 underline">
                {t('contact.email')}
              </a>
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {t('contact.billingTitle')}
            </h3>
            <p className="text-gray-700">
              <span className="font-bold">{t('contact.companyIDLabel')}:</span>{' '}
              {t('contact.companyID')}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">{t('contact.taxIDLabel')}:</span>{' '}
              {t('contact.taxID')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
