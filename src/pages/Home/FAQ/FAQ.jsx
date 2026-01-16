export default function FAQ() {
    const faqs = [
        {
            q: "What is AssetVerse and who is it for?",
            a: "AssetVerse is a modern HR and asset management platform designed for companies to manage employees, company assets, requests, and analytics from a single dashboard."
        },
        {
            q: "Is AssetVerse free to use?",
            a: "Yes. We offer a free Basic plan that supports up to 5 employees. You can upgrade anytime as your organization grows."
        },
        {
            q: "Who can manage assets and employees?",
            a: "Only HR managers have access to asset creation, employee management, approvals, analytics, and subscription upgrades."
        },
        {
            q: "How do employees request assets?",
            a: "Employees can browse available assets, submit requests with notes, and track request status directly from their dashboard."
        },
        {
            q: "Can I upgrade or downgrade my package?",
            a: "Yes. HR managers can upgrade packages instantly through secure Stripe payments. Package limits update automatically."
        },
        {
            q: "Is company and employee data secure?",
            a: "Absolutely. We use Firebase Authentication, JWT-based authorization, and protected APIs to ensure data security and privacy."
        },
        {
            q: "Do employees need to create accounts?",
            a: "Yes. Employees must register or sign in using email/password or Google authentication to access their dashboard."
        },
        {
            q: "Can AssetVerse be used on mobile devices?",
            a: "Yes. AssetVerse is fully responsive and works seamlessly on mobile, tablet, and desktop devices."
        },
        {
            q: "What happens if an employee leaves the company?",
            a: "HR can remove employees, revoke access, and reassign assets directly from the dashboard."
        },
        {
            q: "Does AssetVerse support analytics and reporting?",
            a: "Yes. HR dashboards include real-time analytics such as asset distribution and top requested assets."
        }
    ];

    return (
        <section className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center mb-6">Frequently Asked Questions</h2>

            <div className="space-y-4">
                {faqs.map((f, i) => (
                    <details key={i} className="collapse collapse-arrow bg-base-100 shadow">
                        <summary className="collapse-title text-lg font-semibold">
                            {f.q}
                        </summary>
                        <div className="collapse-content">
                            <p className="text-gray-500 leading-relaxed">
                                {f.a}
                            </p>
                        </div>
                    </details>
                ))}
            </div>
        </section>
    );
}