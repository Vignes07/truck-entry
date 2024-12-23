import { Outlet } from "react-router-dom"; // For rendering nested routes
import Navbar from "../components/Navbar.jsx";

function HomePage() {
    return (
        <div className="flex backdrop-blur max-w-full">
            <Navbar />
            <div className="flex flex-col w-full">
                <Outlet />
            </div>
        </div>
    );
}

export default HomePage;
