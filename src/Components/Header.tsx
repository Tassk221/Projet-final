import { NavLink, useNavigate } from "react-router-dom";
import photo from "../assets/pic.jpg"

const navItems = [
    { label: "Accueil", to: "/" },
    { label: "Nos cours", to: "/cours" },
    { label: "À propos", to: "/a-propos" },
    { label: "Dashboard", to: "/page-dashboard" },
];

export default function Header() {
    const navigate = useNavigate();
    return (
        <header className="fixed top-0 left-0 right-0 z-30 border-b border-white/15 bg-black/75 text-white backdrop-blur">
            <div className="mx-auto flex h-18 w-full max-w-6xl items-center justify-between px-6">
                <NavLink to="/" end className="text-lg font-bold tracking-wide">
                    <img src={photo} alt="Logo" className="mr-2 inline-block h-10 w-10 rounded-full" />
                    FitClub
                </NavLink>

                <nav aria-label="Navigation principale">
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

                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        className="h-10 rounded-md border border-white/30 px-4 text-sm font-semibold transition hover:border-orange-300 hover:text-orange-300"
                        onClick={() => navigate("/Login")}
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
            </div>
        </header>
    );
}
