export default function FAQ() {
    const faqs = [
        { q: "Is AssetVerse free to use?", a: "We offer a free Basic plan with 5 employees." },
        { q: "Can I upgrade my package?", a: "Yes! HR can upgrade at any time." },
        { q: "Is my company data secure?", a: "Absolutely. All data is encrypted & protected." },
        { q: "Do employees need an account?", a: "Yes, HR invites employees to the platform." },
    ];

    return (
        <section className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-6">FAQ</h2>

            <div className="space-y-4">
                {faqs.map((f, i) => (
                    <details key={i} className="collapse collapse-arrow bg-base-100 shadow">
                        <summary className="collapse-title text-lg font-semibold">{f.q}</summary>
                        <div className="collapse-content">
                            <p className="text-gray-600">{f.a}</p>
                        </div>
                    </details>
                ))}
            </div>
        </section>
    );
}
