export default function HowItWorks() {
    const steps = [
        { step: "1", title: "Create Account", desc: "Sign up as HR or Employee." },
        { step: "2", title: "Add Assets & Team", desc: "HR adds assets & manages employees." },
        { step: "3", title: "Request & Assign", desc: "Employees request. HR approves." },
    ];

    return (
        <section className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-8">How It Works</h2>

            <div className="grid sm:grid-cols-3 gap-8 text-center">
                {steps.map((s, i) => (
                    <div key={i} className="p-6 bg-base-100 rounded-xl shadow">
                        <div className="text-5xl font-bold text-primary">{s.step}</div>
                        <h3 className="text-xl font-bold mt-3">{s.title}</h3>
                        <p className="text-sm text-gray-600 mt-2">{s.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
