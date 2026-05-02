import Navbar from "../Components/Navbar.tsx";
import Overview from "../Components/Overview.tsx";
import {useEffect, useState} from "react";

export default function App() {

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

        <div className={`left-54 right-0 flex flex-col min-w-auto  min-h-auto`}>
            <Navbar isDark={isDark} onToggle={() => setIsDark((prev) => !prev)} />
            <Overview/>
        </div>


    )
}
