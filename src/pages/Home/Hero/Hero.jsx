import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="hero shadow rounded-2xl">
            <div className="hero-content p-6 flex-col lg:flex-row-reverse gap-12">

                <motion.img
                    initial={{ opacity: 0, x: 60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    src="https://images.unsplash.com/photo-1761735486587-bcac08b15c79?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    className="max-w-lg rounded-lg shadow-2xl w-full"
                />

                <motion.div
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="md:text-5xl text-2xl font-bold leading-tight">
                        Smart Asset Management <br />
                        for Modern Companies
                    </h1>
                    <p className="py-6 md:text-lg text-gray-600">
                        Streamline asset tracking, employee requests, package upgrades,
                        and more — all in one platform designed for corporate teams.
                    </p>
                    <a href="/register-hr" className="btn btn-primary btn-lg">
                        Get Started
                    </a>
                </motion.div>
            </div>
        </section>
    );
}
