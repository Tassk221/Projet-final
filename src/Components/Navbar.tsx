import button from '../assets/Button.png'
import Favorite from '../assets/Button (1).png'
import Story from '../assets/Button (2).png'
import Notif from '../assets/Button (3).png'
import icon from '../assets/Icon.png'
import { Link } from 'react-router-dom'

function Navbar({onToggle, isDark}: { onToggle: () => void, isDark: boolean }) {
    return (
        <div
            className="fixed top-0 left-54 right-0 z-15 p-0">
            <div
                className="flex top-0 h-17 items-center justify-between rounded-b-2xl bg-white px-6 shadow-xl dark:bg-gray-900 dark:text-gray-100">
                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-1">
                        <button
                            type="button"
                            className="flex h-9 w-9 items-center justify-center rounded-md transition hover:bg-white/70 dark:hover:bg-gray-900"
                            aria-label="Panneau"
                            title="Panneau"
                        >
                            <img src={icon} alt="Panneau" className="h-4 w-5 dark:invert"/>
                        </button>
                        <button
                            type="button"
                            className="flex h-9 w-9 items-center justify-center rounded-md transition hover:bg-white/70 dark:hover:bg-gray-900"
                            aria-label="Favoris"
                            title="Favoris"
                        >
                            <img src={Favorite} alt="Favoris" className="h-5 w-5 dark:invert"/>
                        </button>
                    </div>
                    <div className="flex items-center gap-5 text-lg">
                        <span className="text-[#9a9a9d] dark:text-gray-400">Dashboards</span>
                        <span className="text-[#cbcbce] dark:text-gray-500">/</span>
                        <span className="text-[#1f1f1f] dark:text-gray-100">Default</span>
                    </div>
                </div>

                <div className="flex items-center gap-1 rounded-xl bg-[#ececec] px-3 py-2 dark:bg-gray-900">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="h-4 w-4 text-gray-400 dark:text-gray-500"
                        aria-hidden="true"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                    <input
                        className="w-24 right-2 bg-transparent text-[15px] text-gray-500 placeholder:text-gray-400 outline-none dark:text-gray-100 dark:placeholder:text-gray-500"
                        placeholder="Search"
                        type="text"
                        name="search"
                        id="search"
                    />
                    <span
                        className="flex h-5 w-5 items-center justify-center rounded-sm border border-gray-300 text-[11px] leading-none text-gray-300 dark:border-gray-600 dark:text-gray-500">
                        /
                    </span>
                </div>

                <div className="flex items-center gap-0.5">
                    <button
                        type="button"
                        onClick={onToggle}
                        className="flex h-9 w-9 items-center justify-center rounded-md transition hover:bg-gray-200 dark:hover:bg-gray-800"
                        aria-label={isDark ? "Desactiver le mode sombre" : "Activer le mode sombre"}
                        title={isDark ? "Passer en mode clair" : "Passer en mode sombre"}
                    >
                        <img src={button} alt="Theme" className="h-8 w-8 dark:invert"/>
                    </button>
                    <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-md transition hover:bg-gray-200 dark:hover:bg-gray-800"
                        aria-label="Historique"
                        title="Historique"
                    >
                        <img src={Story} alt="Historique" className="h-8 w-8 dark:invert"/>
                    </button>
                    <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-md transition hover:bg-gray-200 dark:hover:bg-gray-800"
                        aria-label="Notifications"
                        title="Notifications"
                    >
                        <img src={Notif} alt="Notifications" className="h-8 w-8 dark:invert"/>
                    </button>
                    <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-md transition hover:bg-gray-200 dark:hover:bg-gray-800"
                        aria-label="Accueil"
                        title="Accueil"
                    >
                        
                        <Link to="/" className="text-sm text-gray-200">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="h-5 w-4 dark:invert" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Navbar;

