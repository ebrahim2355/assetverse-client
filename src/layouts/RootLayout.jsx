import { Outlet } from "react-router";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";

function RootLayout() {
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-1 container mx-auto px-4 py-6">
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}

export default RootLayout;