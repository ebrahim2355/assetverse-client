import About from "../About/About";
import ContactCTA from "../ContactCTA/ContactCTA";
import FAQ from "../FAQ/FAQ";
import Features from "../Features/Features";
import Hero from "../Hero/Hero";
import HowItWorks from "../HowItWorks/HowItWorks";
import Packages from "../Packages/Packages";
import Testimonials from "../Testimonials/Testimonials";
import TopAssets from "../TopAssets/TopAssets";
export default function Home() {
    return (
        <div className="md:space-y-24 space-y-12">
            <Hero />
            <About />
            <TopAssets />
            <Packages />
            <Features />
            <Testimonials />
            <HowItWorks />
            <FAQ />
            <ContactCTA />
        </div>
    );
}