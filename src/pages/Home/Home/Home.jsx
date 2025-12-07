import About from "../About/About";
import ContactCTA from "../ContactCTA/ContactCTA";
import FAQ from "../FAQ/FAQ";
import Features from "../Features/Features";
import Hero from "../Hero/Hero";
import HowItWorks from "../HowItWorks/HowItWorks";
import Packages from "../Packages/Packages";
import Testimonials from "../Testimonials/Testimonials";
export default function Home() {
    return (
        <div className="md:space-y-24 space-y-12">
            <Hero />
            <About />
            <Packages />
            <Features />
            <Testimonials />
            <HowItWorks />
            <FAQ />
            <ContactCTA />
        </div>
    );
}