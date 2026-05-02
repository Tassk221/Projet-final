import img1 from "../assets/img (1).jpg";
import img2 from "../assets/img (2).avif";
import img3 from "../assets/img (3).webp";

const classes = [
    {
        title: "Base Endurance",
        description: "Un cours cardio intense pour améliorer votre souffle et votre résistance.",
        image: img1,
    },
    {
        title: "Base HIIT",
        description: "Des séquences courtes et explosives pour bruler un maximum d'énergie.",
        image: img2,
    },
    {
        title: "Base force",
        description: "Un travail progressif de force pour tonifier tout le corps.",
        image: img3,
    },
];

export default function Cours() {
    return (
        <div>
            <section id="classes" className="bg-[#181818]">
                <div className="mx-auto max-w-6xl px-6 py-20">
                    <p className="text-sm uppercase tracking-[0.2em] text-orange-300">Nos cours</p>
                    <h2 className="mt-3 text-3xl font-bold md:text-4xl">Choisissez votre rythme</h2>

                    <div className="mt-10 grid gap-6 md:grid-cols-3">
                        {classes.map((sportClass) => (
                            <article key={sportClass.title} className="overflow-hidden rounded-lg bg-[#222222]">
                                <img src={sportClass.image} alt={sportClass.title} className="h-56 w-full object-cover" />
                                <div className="space-y-4 p-6">
                                    <h3 className="text-xl text-gray-300 font-bold">{sportClass.title}</h3>
                                    <p className="text-sm text-gray-300">{sportClass.description}</p>
                                    <div className="flex items-center justify-between">
                                        <button
                                            type="button"
                                            className="rounded-md bg-orange-300 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-[#181818]"
                                        >
                                            Reserver
                                        </button>
                                    </div>
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
                        <p className="mt-2">Politique de confidentialite</p>
                        <p>Conditions generales</p>
                    </div>
                </div>
            </footer>
        </div>

    );
}
