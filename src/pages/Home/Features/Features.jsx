export default function Features() {
    const features = [
        { title: "Asset Tracking", icon: "📦", desc: "Monitor assets in real time." },
        { title: "Employee Management", icon: "👥", desc: "Handle HR tasks easily." },
        { title: "Approval Workflow", icon: "✔️", desc: "Automated request handling." },
        { title: "Role-based Access", icon: "🔐", desc: "Secure user permissions." },
        { title: "Analytics Dashboard", icon: "📊", desc: "See usage & performance." },
        { title: "Cloud Storage", icon: "☁️", desc: "Access anywhere, anytime." },
    ];

    return (
        <section className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-8">Core Features</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((f, index) => (
                    <div key={index} className="p-6 bg-base-100 rounded-xl shadow flex flex-col items-center text-center">
                        <div className="text-4xl mb-3">{f.icon}</div>
                        <h3 className="font-bold text-xl">{f.title}</h3>
                        <p className="text-sm text-gray-600 mt-2">{f.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
