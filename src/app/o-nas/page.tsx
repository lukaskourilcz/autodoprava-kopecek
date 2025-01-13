import {
    ChevronsUp,
    ShieldPlus,
    Waypoints
  } from "lucide-react";

export default function ONas() {
    return (
        <section id="o-nas" className="bg-white py-16 px-4 sm:px-8 md:px-16 lg:px-32">
            <div className="max-w-5xl mx-auto">
                <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">O nás</h2>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Jsme rodinná dopravní společnost, která působí na trhu již od roku 2012. Za tuhle
                    dobu jsme nasbírali bohaté zkušenosti v oblasti autobusové dopravy a získali si
                    důvěru mnoha spokojených zákazníků. Naším cílem je zajišťovat spolehlivé,
                    bezpečné a pohodlné cestování pro jednotlivce, skupiny i firmy. Společnost vede
                    pan Jiří Kopeček.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                    Primárně se specializujeme na nepravidelnou autobusovou dopravu, ať už jde o školní
                    výlety, firemní akce, sportovní turnaje nebo jiné skupinové přepravy. Díky
                    pravidelně udržovaným autobusům zajišťujeme maximální bezpečnost a komfort během
                    cesty.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed mb-12">
                    Jsme tu pro vás, ať už potřebujete zajistit pohodlnou přepravu osob, nebo bezpečný
                    transport nákladu. Rádi vám připravíme nabídku na míru – kontaktujte nás a
                    přesvědčte se o kvalitě našich služeb sami!
                </p>
                <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                        Proč si vybrat právě nás?
                    </h3>
                    <ul className="space-y-6">
                        <li className="flex items-center space-x-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                            <Waypoints />
                            </div>
                            <p className="text-lg text-gray-700">
                                <span className="font-bold">Flexibilita:</span> Přizpůsobíme se vašim
                                potřebám a zajistíme individuální řešení pro každou zakázku.
                            </p>
                        </li>
                        <li className="flex items-center space-x-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
                                <ChevronsUp/>
                            </div>
                            <p className="text-lg text-gray-700">
                                <span className="font-bold">Rychlost a spolehlivost:</span> Dodržujeme
                                sjednané termíny a klademe důraz na precizní provedení každé přepravy.
                            </p>
                        </li>
                        <li className="flex items-center space-x-4">
                            <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                <ShieldPlus/>
                            </div>
                            <p className="text-lg text-gray-700">
                                <span className="font-bold">Profesionální přístup:</span> Naši zkušení
                                řidiči a moderní technika jsou zárukou kvality a bezpečnosti.
                            </p>
                        </li>
                    </ul>
                    <p className="text-lg text-gray-700 mt-8">
                        Máte speciální požadavky na přepravu? Rádi vám vyjdeme vstříc! Neváhejte nás
                        kontaktovat a společně najdeme to nejlepší řešení pro váš náklad.
                    </p>
                </div>
            </div>
        </section>
    );
}
