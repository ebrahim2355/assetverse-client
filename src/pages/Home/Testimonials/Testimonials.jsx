export default function Testimonials() {
    return (
        <section className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-8">Trusted by Companies</h2>

            <p className="text-gray-600 mb-6">100+ Businesses use AssetVerse daily</p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {["TechNova", "BlueLedger", "PrimeWorks"].map((company, i) => (
                    <div key={i} className="p-6 bg-base-100 rounded-xl shadow">
                        <p className="italic text-gray-600">
                            “AssetVerse completely transformed how we manage our internal assets.”
                        </p>
                        <h3 className="font-bold mt-4">{company}</h3>
                    </div>
                ))}
            </div>
        </section>
    );
}
