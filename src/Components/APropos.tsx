import img1 from "../assets/img (1).avif";

export default function APropos() {
    return (
        <div>
            <section id="about" className="bg-[#f5f4f1] text-gray-900">
                <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2 md:items-center">
                    <img
                        src={img1}
                        alt="Séance de coaching en groupe"
                        className="h-80 w-full rounded-lg object-cover md:h-115"
                    />

                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-[#a65a39]">A propos</p>
                        <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">
                            Laissez-vous coacher par des professionnels du domaine de par leur expérience et leur savoir-faire.
                        </h2>
                        <p className="mt-6 text-base leading-relaxed text-gray-700">
                            FitClub est un réseau de coachs sportifs sélectionnés avec exigence pour vous proposer un accompagnement adéquat et  de haute qualité selon vos besoins.
                        </p>
                        <p className="mt-4 text-base leading-relaxed text-gray-700">
                            Grace à leurs formations et à leur expérience, nos coachs construisent un programme adapté à vos capacités, vos disponibilités et vos objectifs.
                        </p>
                    </div>
                </div>
            </section>

            <section id="contact" className="bg-[#000000]">
                <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2">
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-orange-300">Allons-y</p>
                        <h2 className="mt-3 text-3xl text-white font-bold md:text-4xl">Inscrivez-vous aux mises a jour</h2>
                        <p className="mt-4 max-w-md text-sm text-gray-300">
                            Recevez nos nouveaux cours, nos offres de lancement et les prochaines dates des seances d'essai.
                        </p>
                    </div>

                    <form className="grid gap-4" action="#">
                        <input
                            type="text"
                            placeholder="Prenom"
                            className="h-11 rounded-md border border-white/20 bg-white/5 px-4 text-sm text-white placeholder:text-gray-400 outline-none focus:border-orange-300"
                        />
                        <input
                            type="text"
                            placeholder="Nom"
                            className="h-11 rounded-md border border-white/20 bg-white/5 px-4 text-sm text-white placeholder:text-gray-400 outline-none focus:border-orange-300"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="h-11 rounded-md border border-white/20 bg-white/5 px-4 text-sm text-white placeholder:text-gray-400 outline-none focus:border-orange-300"
                        />
                        <textarea
                            placeholder="Votre message"
                            rows={4}
                            className="rounded-md border border-white/20 bg-white/5 p-4 text-sm text-white placeholder:text-gray-400 outline-none focus:border-orange-300"
                        />
                        <button
                            type="submit"
                            className="h-11 rounded-md bg-[#e95537] text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-[#c6492f]"
                        >
                            Envoyer
                        </button>
                    </form>
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
