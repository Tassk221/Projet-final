import { useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import Accueil from "./Components/Accueil";
import Cours from "./Components/Cours";
import APropos from "./Components/APropos";
import Page from "./Components/Page";
import LoginPage from "./Components/loginPage";
import ForgotPasswordPage from "./Components/ForgotPasswordPage";

function PublicLayout() {
    return (
        <div className="min-h-screen w-full">
            <Header />
            <main className="pt-18">
                <Outlet />
            </main>
        </div>
    );
}

function DashboardLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950">
            <Sidebar
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />
            <Page
                isSidebarOpen={isSidebarOpen}
                onOpenSidebar={() => setIsSidebarOpen(true)}
            />
        </div>
    );
}

export default function App() {
    return (
        <Routes>
            {/* Routes publiques avec Header */}
            <Route element={<PublicLayout />}>
                <Route index element={<Accueil />} />
                <Route path="accueil" element={<Navigate to="/" replace />} />
                <Route path="cours" element={<Cours />} />
                <Route path="a-propos" element={<APropos />} />
            </Route>

            {/* Routes sans Header */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Dashboard */}
            <Route path="/page-dashboard" element={<DashboardLayout />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
