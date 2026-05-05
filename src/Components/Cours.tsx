import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import img1 from "../assets/img (1).jpg";
import img2 from "../assets/img (2).avif";
import img3 from "../assets/img (3).webp";
import img4 from "../assets/photo (1).jpg";
import img5 from "../assets/photo (2).jpg";
import img8 from "../assets/photo (5).jpg";

const classes = [
    {
        title: "Base Endurance",
        description: "Un cours cardio intense pour ameliorer votre souffle et votre resistance.",
        image: img1,
    },
    {
        title: "Base HIIT",
        description: "Des sequences courtes et explosives pour bruler un maximum d'energie.",
        image: img2,
    },
    {
        title: "Base Force",
        description: "Un travail progressif de force pour tonifier tout le corps.",
        image: img3,
    },
    {
        title: "Souplesse",
        description: "Des exercices de mobilite et d'etirements pour garder un corps souple.",
        image: img4,
    },
    {
        title: "Cardio",
        description: "Un entrainement rythme pour stimuler le coeur et augmenter l'endurance.",
        image: img8,
    },
    {
        title: "Souffle",
        description: "Un cours centre sur la respiration pour mieux gerer l'effort et recuperer.",
        image: img5,
    },
];

export default function Cours() {
    const cardsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const totalPages = Math.ceil(classes.length / cardsPerPage);

    const visibleClasses = useMemo(() => {
        const startIndex = currentPage * cardsPerPage;
        return classes.slice(startIndex, startIndex + cardsPerPage);
    }, [currentPage]);

    useEffect(() => {
        if (totalPages <= 1 || isPaused) {
            return;
        }

        const intervalId = window.setInterval(() => {
            setCurrentPage((previousPage) => (previousPage + 1) % totalPages);
        }, 3500);

        return () => {
            window.clearInterval(intervalId);
        };
    }, [isPaused, totalPages]);

    return (
        <div>
            <section id="classes" className="bg-[#181818]">
                <div className="mx-auto max-w-6xl px-6 py-20">
                    <p className="text-sm uppercase tracking-[0.2em] text-orange-300">Nos cours</p>
                    <h2 className="mt-3 text-3xl font-bold text-white md:text-4xl">Choisissez votre rythme</h2>

                    <div className="mt-8 flex items-center justify-end">
                        <p className="text-sm text-gray-300">
                            Page {currentPage + 1} / {totalPages}
                        </p>
                    </div>

                    <div
                        className="mt-8 grid gap-6 md:grid-cols-3"
                        onMouseEnter={() => setIsPaused(true)}
                        onMouseLeave={() => setIsPaused(false)}
                    >
                        {visibleClasses.map((sportClass) => (
                            <article key={sportClass.title} className="group flex h-full flex-col rounded-lg bg-[#222222]">
                                <img src={sportClass.image} alt={sportClass.title} className="h-56 w-full rounded-t-lg object-cover" />
                                <div className="flex flex-1 flex-col space-y-4 p-6">
                                    <h3 className="text-xl font-bold text-gray-300">{sportClass.title}</h3>
                                    <p className="flex-1 text-sm text-gray-300">{sportClass.description}</p>
                                    <button
                                        type="button"
                                        className="mt-2 inline-flex w-full items-center justify-center rounded-md bg-orange-300 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#181818] opacity-100 transition-opacity duration-250 md:opacity-0 md:group-hover:opacity-100"
                                    >
                                        <Link to="/login" className="w-full text-center">
                                            Reserver
                                        </Link>
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
            <footer className="border-t border-white/10 bg-[#0b0b0b]">
                <div className="mx-auto grid max-w-6xl gap-6 px-6 py-10 text-sm text-gray-300 md:grid-cols-3">
                    <div>
                        <p className="font-semibold text-white">Adresse</p>
                        <p className="mt-2">Rue Mz 83</p>
                        <p>Dakar, SICAP Mermouz</p>
                    </div>
                    <div>
                        <p className="font-semibold text-white">Contact</p>
                        <p className="mt-2">tassirou44@gmail.com</p>
                        <p>+221-77-565-38-57</p>
                    </div>
                    <div>
                        <p className="font-semibold text-white">Liens</p>
                        <p className="mt-2">Politique de confidentialité</p>
                        <p>Conditions générales</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
