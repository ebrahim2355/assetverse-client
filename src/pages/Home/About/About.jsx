export default function About() {
    const benefits = [
        {
            title: "Centralized Asset Management",
            desc: "Keep all company assets organized, updated, and trackable in real-time."
        },
        {
            title: "Employee Request System",
            desc: "Streamline asset requests with automated approvals and tracking."
        },
        {
            title: "HR & Admin Control",
            desc: "Manage employees, assets, and subscriptions with complete visibility."
        },
        {
            title: "Analytics & Reports",
            desc: "Gain insights into asset usage, cost efficiency, and workforce needs."
        }
    ];

    return (
        <section className="max-w-6xl mx-auto px-6 text-center">
            <h2 className="text-4xl font-bold mb-8">Why Choose AssetVerse?</h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {benefits.map((b, i) => (
                    <div key={i} className="p-6 bg-base-100 rounded-xl shadow">
                        <h3 className="font-bold text-xl mb-2">{b.title}</h3>
                        <p className="text-sm text-gray-600">{b.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
