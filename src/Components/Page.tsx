import Navbar from "../Components/Navbar.tsx";
import Overview from "../Components/Overview.tsx";
import {useEffect, useState} from "react";

type PageProps = {
    isSidebarOpen: boolean;
    onOpenSidebar: () => void;
};

export default function Page({ isSidebarOpen, onOpenSidebar }: PageProps) {
    const [isDark, setIsDark] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            return savedTheme === "dark";
        }

        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    useEffect(() => {
        document.documentElement.classList.toggle('dark', isDark);
        localStorage.setItem("theme", isDark ? "dark" : "light");
    }, [isDark]);

    return (
        <div className="flex min-h-screen flex-col">
            <Navbar
                isDark={isDark}
                isSidebarOpen={isSidebarOpen}
                onOpenSidebar={onOpenSidebar}
                onToggle={() => setIsDark((prev) => !prev)}
            />
            <Overview isDark={isDark} />
        </div>
    );
}
