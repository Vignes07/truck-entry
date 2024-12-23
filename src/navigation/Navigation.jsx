import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import TruckEntries from "../components/TruckEntries.jsx"; // Example for truck route
import DriverDetails from "../components/DriverDetails.jsx";
import Dashboard from "../components/Dashboard.jsx"; // Example for driver route

function Navigation() {
    const { isLogin, login } = useSelector((state) => state.login);

    return (
        <Routes>
            <Route path="/login" element={<LoginPage login={login} isLogin={isLogin} />} />
            {isLogin && (
                <Route path="/" element={<HomePage />}>
                    <Route index element={<Dashboard />} />
                    <Route path="truck-entries" element={<TruckEntries />} />
                    <Route path="driver-details" element={<DriverDetails />} />
                </Route>
            )}
        </Routes>
    );
}

export default Navigation;
