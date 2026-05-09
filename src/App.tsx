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
import RegisterPage from "./Components/RegisterPage";
import Overview from "./Components/Overview";
import { readStoredToken, readStoredUser, userCanAccessDashboard, userIsAdmin } from "./lib/auth";
import {
    DashboardAccountPage,
    DashboardBlogPage,
    DashboardClientsPage,
    DashboardCorporatePage,
    DashboardCoursesPage,
    DashboardSocialPage,
    DashboardUserProfilePage,
} from "./Components/DashboardPages";

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

function RequireAuth() {
    const token = readStoredToken();
    const user = readStoredUser();

    if (!token || !user) {
        return <Navigate to="/login" replace />;
    }

    if (!userCanAccessDashboard(user)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

function RequireAdminOnly() {
    const user = readStoredUser();

    if (!userIsAdmin(user)) {
        return <Navigate to="/page-dashboard" replace />;
    }

    return <Outlet />;
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
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Dashboard */}
            <Route element={<RequireAuth />}>
                <Route path="/page-dashboard" element={<DashboardLayout />}>
                    <Route index element={<Overview />} />
                    <Route path="courses" element={<DashboardCoursesPage />} />
                    <Route element={<RequireAdminOnly />}>
                        <Route path="clients" element={<DashboardClientsPage />} />
                    </Route>
                    <Route path="user-profile" element={<DashboardUserProfilePage />} />
                    <Route path="account" element={<DashboardAccountPage />} />
                    <Route path="corporate" element={<DashboardCorporatePage />} />
                    <Route path="blog" element={<DashboardBlogPage />} />
                    <Route path="social" element={<DashboardSocialPage />} />
                </Route>
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
}
