export default function Kontakt() {
    return (
        <section id="kontakt" className="bg-gray-100 py-16 px-4 sm:px-8 md:px-16 lg:px-32">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-gray-800 mb-8">Kontakt</h2>
                <p className="text-lg text-gray-700 mb-6">
                    Máte zájem o naše služby? Kontaktujte nás prostřednictvím níže uvedených údajů:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Kontakt</h3>
                        <p className="text-gray-700">
                            <span className="font-bold">Tel.:</span> +420 777 685 331
                        </p>
                        <p className="text-gray-700">
                            <span className="font-bold">E-mail:</span>{" "}
                            <a href="mailto:jirikopecek@seznam.cz" className="text-blue-600 underline">
                                jirikopecek@seznam.cz
                            </a>
                        </p>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Fakturační údaje</h3>
                        <p className="text-gray-700">
                            <span className="font-bold">IČ:</span> 67004997
                        </p>
                        <p className="text-gray-700">
                            <span className="font-bold">DIČ:</span> CZ7504284304
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
