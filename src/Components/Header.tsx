import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import photo from "../assets/pic.jpg"

const navItems = [
    { label: "Accueil", to: "/" },
    { label: "Nos cours", to: "/cours" },
    { label: "A propos", to: "/a-propos" },
];

export default function Header() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setIsMenuOpen(false);
    }, [location.pathname]);

    return (
        <header className="fixed top-0 left-0 right-0 z-30 border-b border-white/15 bg-black/75 text-white backdrop-blur">
            <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
                <NavLink to="/" end className="flex items-center text-lg font-bold tracking-wide">
                    <img src={photo} alt="Logo" className="mr-2 inline-block h-10 w-10 rounded-full" />
                    FitClub
                </NavLink>

                <nav aria-label="Navigation principale" className="hidden md:block">
                    <ul className="flex items-center gap-6 text-sm font-medium">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <NavLink
                                    to={item.to}
                                    end={item.to === "/"}
                                    className={({ isActive }) =>
                                        `transition hover:text-orange-300 ${isActive ? "text-orange-300" : ""}`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="hidden items-center gap-3 md:flex">
                    <button
                        type="button"
                        className="h-10 rounded-md border border-white/30 px-4 text-sm font-semibold transition hover:border-orange-300 hover:text-orange-300"
                        onClick={() => navigate("/login")}
                    >
                        Connexion
                    </button>
                    <button
                        type="button"
                        aria-label="Profil"
                        title="Profil"
                        className="flex h-10 w-10 items-center justify-center rounded-md border border-white/30 transition hover:border-orange-300 hover:text-orange-300"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            className="h-5 w-5"
                            aria-hidden="true"
                        >
                            <circle cx="12" cy="8" r="4" />
                            <path d="M4 20c0-3.5 3.5-6 8-6s8 2.5 8 6" />
                        </svg>
                    </button>
                </div>

                <button
                    type="button"
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-white/30 md:hidden"
                    aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
                    onClick={() => setIsMenuOpen((previous) => !previous)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-5 w-5"
                        aria-hidden="true"
                    >
                        {isMenuOpen ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
                    </svg>
                </button>
            </div>

            <div className={`border-t border-white/15 px-4 py-4 md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
                <nav aria-label="Navigation mobile">
                    <ul className="space-y-3 text-sm font-medium">
                        {navItems.map((item) => (
                            <li key={item.label}>
                                <NavLink
                                    to={item.to}
                                    end={item.to === "/"}
                                    className={({ isActive }) =>
                                        `block transition hover:text-orange-300 ${isActive ? "text-orange-300" : ""}`
                                    }
                                >
                                    {item.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="mt-4 flex items-center gap-3">
                    <button
                        type="button"
                        className="h-10 rounded-md border border-white/30 px-4 text-sm font-semibold transition hover:border-orange-300 hover:text-orange-300"
                        onClick={() => navigate("/login")}
                    >
                        Connexion
                    </button>
                </div>
            </div>
        </header>
    );
}
