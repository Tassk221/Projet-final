import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { getCurrentUser, getDashboardClients, updateCurrentUser } from "../lib/api";
import type { AuthUser, DashboardClient, UpdateProfilePayload } from "../lib/api";
import { persistAuth, readStoredToken, readStoredUser } from "../lib/auth";

type DashboardSectionProps = {
    title: string;
    subtitle: string;
    children: React.ReactNode;
};

const contentClassName = "min-h-screen bg-white px-4 pb-6 pt-20 dark:bg-gray-950 sm:px-6 lg:ml-54 lg:pt-21";

function DashboardSection({ title, subtitle, children }: DashboardSectionProps) {
    return (
        <div className={contentClassName}>
            <header className="mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h2>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
            </header>
            <div className="grid gap-4 xl:grid-cols-2">{children}</div>
        </div>
    );
}

const readCurrentUser = () => readStoredUser();

const formatDate = (isoDate: string) => {
    if (!isoDate) {
        return "Non renseigne";
    }

    const date = new Date(isoDate);
    if (Number.isNaN(date.getTime())) {
        return isoDate;
    }

    return new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(date);
};

const createProfileForm = (user: AuthUser | null): UpdateProfilePayload => {
    return {
        name: user?.name ?? "",
        email: user?.email ?? "",
        phone: user?.phone ?? "",
        birthDate: user?.birthDate ?? "",
        address: user?.address ?? "",
        city: user?.city ?? "",
        country: user?.country ?? "",
    };
};

export function DashboardCoursesPage() {
    const courses = [
        { name: "Base Endurance", slots: "08:00 - 09:00", coach: "Coach Awa", status: "Complet" },
        { name: "Base HIIT", slots: "10:30 - 11:30", coach: "Coach Idriss", status: "4 places" },
        { name: "Base Force", slots: "18:00 - 19:00", coach: "Coach Mame", status: "8 places" },
        { name: "Souplesse", slots: "19:15 - 20:00", coach: "Coach Fatou", status: "6 places" },
    ];

    return (
        <DashboardSection
            title="Courses"
            subtitle="Planification des sessions et disponibilites."
        >
            <section className="rounded-xl border border-gray-200 p-4 dark:border-gray-800 xl:col-span-2">
                <div className="overflow-x-auto">
                    <table className="w-full min-w-120 text-left text-sm">
                        <thead>
                            <tr className="border-b border-gray-200 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                                <th className="px-2 py-3 font-medium">Cours</th>
                                <th className="px-2 py-3 font-medium">Horaire</th>
                                <th className="px-2 py-3 font-medium">Coach</th>
                                <th className="px-2 py-3 font-medium">Disponibilite</th>
                            </tr>
                        </thead>
                        <tbody>
                            {courses.map((course) => (
                                <tr key={course.name} className="border-b border-gray-100 dark:border-gray-900">
                                    <td className="px-2 py-3 text-gray-900 dark:text-white">{course.name}</td>
                                    <td className="px-2 py-3 text-gray-600 dark:text-gray-300">{course.slots}</td>
                                    <td className="px-2 py-3 text-gray-600 dark:text-gray-300">{course.coach}</td>
                                    <td className="px-2 py-3 text-gray-600 dark:text-gray-300">{course.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </DashboardSection>
    );
}

export function DashboardClientsPage() {
    const [clients, setClients] = useState<DashboardClient[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let isMounted = true;

        const loadClients = async () => {
            try {
                const token = readStoredToken();
                if (!token) {
                    throw new Error("Session invalide.");
                }

                const response = await getDashboardClients(token);

                if (isMounted) {
                    setClients(response.clients);
                    setError("");
                }
            } catch (loadError) {
                if (isMounted) {
                    const message =
                        loadError instanceof Error
                            ? loadError.message
                            : "Impossible de charger la liste des clients.";
                    setError(message);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        void loadClients();

        return () => {
            isMounted = false;
        };
    }, []);

    return (
        <DashboardSection
            title="Clients inscrits"
            subtitle="Vue administrateur des informations completes des clients."
        >
            <section className="rounded-xl border border-gray-200 p-4 dark:border-gray-800 xl:col-span-2">
                {isLoading ? (
                    <p className="text-sm text-gray-600 dark:text-gray-300">Chargement des clients...</p>
                ) : null}
                {error ? (
                    <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
                ) : null}
                {!isLoading && !error && clients.length === 0 ? (
                    <p className="text-sm text-gray-600 dark:text-gray-300">Aucun client inscrit pour le moment.</p>
                ) : null}
                {!isLoading && !error && clients.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-325 text-left text-sm">
                            <thead>
                                <tr className="border-b border-gray-200 text-gray-500 dark:border-gray-800 dark:text-gray-400">
                                    <th className="px-2 py-3 font-medium">Nom</th>
                                    <th className="px-2 py-3 font-medium">Email</th>
                                    <th className="px-2 py-3 font-medium">Telephone</th>
                                    <th className="px-2 py-3 font-medium">Date naissance</th>
                                    <th className="px-2 py-3 font-medium">Adresse</th>
                                    <th className="px-2 py-3 font-medium">Ville</th>
                                    <th className="px-2 py-3 font-medium">Pays</th>
                                    <th className="px-2 py-3 font-medium">Inscription</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clients.map((client) => (
                                    <tr key={client.id} className="border-b border-gray-100 dark:border-gray-900">
                                        <td className="px-2 py-3 text-gray-900 dark:text-white">{client.name || "-"}</td>
                                        <td className="px-2 py-3 text-gray-600 dark:text-gray-300">{client.email || "-"}</td>
                                        <td className="px-2 py-3 text-gray-600 dark:text-gray-300">{client.phone || "-"}</td>
                                        <td className="px-2 py-3 text-gray-600 dark:text-gray-300">{client.birthDate || "-"}</td>
                                        <td className="px-2 py-3 text-gray-600 dark:text-gray-300">{client.address || "-"}</td>
                                        <td className="px-2 py-3 text-gray-600 dark:text-gray-300">{client.city || "-"}</td>
                                        <td className="px-2 py-3 text-gray-600 dark:text-gray-300">{client.country || "-"}</td>
                                        <td className="px-2 py-3 text-gray-600 dark:text-gray-300">
                                            {formatDate(client.createdAt)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : null}
            </section>
        </DashboardSection>
    );
}

export function DashboardUserProfilePage() {
    const token = readStoredToken();
    const [user, setUser] = useState<AuthUser | null>(() => readCurrentUser());
    const [form, setForm] = useState<UpdateProfilePayload>(() => createProfileForm(readCurrentUser()));
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        let isMounted = true;

        const loadProfile = async () => {
            if (!token) {
                setIsLoading(false);
                setError("Session invalide.");
                return;
            }

            try {
                const response = await getCurrentUser(token);
                if (isMounted) {
                    setUser(response.user);
                    setForm(createProfileForm(response.user));
                    persistAuth(token, response.user);
                    setError("");
                }
            } catch (loadError) {
                if (isMounted) {
                    const message =
                        loadError instanceof Error ? loadError.message : "Impossible de charger le profil.";
                    setError(message);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        void loadProfile();

        return () => {
            isMounted = false;
        };
    }, [token]);

    const handleFieldChange = (field: keyof UpdateProfilePayload, value: string) => {
        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));
    };

    const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setError("");
        setSuccess("");

        if (!token) {
            setError("Session invalide.");
            return;
        }

        setIsSaving(true);

        try {
            const response = await updateCurrentUser(token, form);
            setUser(response.user);
            setForm(createProfileForm(response.user));
            persistAuth(token, response.user);
            setSuccess("Informations personnelles mises a jour.");
        } catch (saveError) {
            const message =
                saveError instanceof Error ? saveError.message : "Impossible d'enregistrer les modifications.";
            setError(message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <DashboardSection title="User Profile" subtitle="Informations du compte connecte.">
            <section className="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Profil actuel</h3>
                {isLoading ? (
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">Chargement du profil...</p>
                ) : null}
                <dl className="mt-4 space-y-3 text-sm">
                    <div>
                        <dt className="text-gray-500 dark:text-gray-400">Nom</dt>
                        <dd className="text-gray-900 dark:text-gray-200">{user?.name ?? "Non renseigne"}</dd>
                    </div>
                    <div>
                        <dt className="text-gray-500 dark:text-gray-400">Email</dt>
                        <dd className="text-gray-900 dark:text-gray-200">{user?.email ?? "Non renseigne"}</dd>
                    </div>
                    <div>
                        <dt className="text-gray-500 dark:text-gray-400">ID utilisateur</dt>
                        <dd className="break-all text-gray-900 dark:text-gray-200">{user?.id ?? "Non disponible"}</dd>
                    </div>
                    <div>
                        <dt className="text-gray-500 dark:text-gray-400">Role</dt>
                        <dd className="text-gray-900 capitalize dark:text-gray-200">{user?.role ?? "client"}</dd>
                    </div>
                </dl>
            </section>
            <section className="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Modifier mes informations</h3>
                <form onSubmit={saveProfile} className="mt-4 grid gap-3">
                    <label className="grid gap-1 text-sm text-gray-600 dark:text-gray-300">
                        Nom complet
                        <input
                            type="text"
                            value={form.name}
                            onChange={(event) => handleFieldChange("name", event.target.value)}
                            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                            required
                        />
                    </label>
                    <label className="grid gap-1 text-sm text-gray-600 dark:text-gray-300">
                        Email
                        <input
                            type="email"
                            value={form.email}
                            onChange={(event) => handleFieldChange("email", event.target.value)}
                            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                            required
                        />
                    </label>
                    <label className="grid gap-1 text-sm text-gray-600 dark:text-gray-300">
                        Telephone
                        <input
                            type="tel"
                            value={form.phone}
                            onChange={(event) => handleFieldChange("phone", event.target.value)}
                            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                            required
                        />
                    </label>
                    <label className="grid gap-1 text-sm text-gray-600 dark:text-gray-300">
                        Date de naissance
                        <input
                            type="date"
                            value={form.birthDate}
                            onChange={(event) => handleFieldChange("birthDate", event.target.value)}
                            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                            required
                        />
                    </label>
                    <label className="grid gap-1 text-sm text-gray-600 dark:text-gray-300">
                        Adresse
                        <input
                            type="text"
                            value={form.address}
                            onChange={(event) => handleFieldChange("address", event.target.value)}
                            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                            required
                        />
                    </label>
                    <label className="grid gap-1 text-sm text-gray-600 dark:text-gray-300">
                        Ville
                        <input
                            type="text"
                            value={form.city}
                            onChange={(event) => handleFieldChange("city", event.target.value)}
                            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                            required
                        />
                    </label>
                    <label className="grid gap-1 text-sm text-gray-600 dark:text-gray-300">
                        Pays
                        <input
                            type="text"
                            value={form.country}
                            onChange={(event) => handleFieldChange("country", event.target.value)}
                            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
                            required
                        />
                    </label>

                    {error ? (
                        <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
                            {error}
                        </p>
                    ) : null}
                    {success ? (
                        <p className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
                            {success}
                        </p>
                    ) : null}

                    <button
                        type="submit"
                        disabled={isSaving}
                        className="mt-1 w-full rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {isSaving ? "Enregistrement..." : "Enregistrer les modifications"}
                    </button>
                </form>
            </section>
        </DashboardSection>
    );
}

export function DashboardAccountPage() {
    return (
        <DashboardSection title="Account" subtitle="Parametres de securite et acces.">
            <section className="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Securite</h3>
                <ul className="mt-3 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    <li>Mot de passe: minimum 6 caracteres.</li>
                    <li>Session en cours: stockage local du token utilisateur.</li>
                    <li>Reinitialisation: disponible depuis la page "Mot de passe oublie".</li>
                </ul>
            </section>
            <section className="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Actions rapides</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-md border border-gray-200 px-3 py-1.5 text-xs text-gray-600 dark:border-gray-700 dark:text-gray-300">
                        Mise a jour du profil
                    </span>
                    <span className="rounded-md border border-gray-200 px-3 py-1.5 text-xs text-gray-600 dark:border-gray-700 dark:text-gray-300">
                        Gestion des sessions
                    </span>
                    <span className="rounded-md border border-gray-200 px-3 py-1.5 text-xs text-gray-600 dark:border-gray-700 dark:text-gray-300">
                        Historique de connexion
                    </span>
                </div>
            </section>
        </DashboardSection>
    );
}

export function DashboardCorporatePage() {
    const programs = [
        { name: "Pack Team Building", members: "10-30", frequency: "2x / semaine" },
        { name: "Pack Performance", members: "30-80", frequency: "3x / semaine" },
        { name: "Pack Premium", members: "80+", frequency: "Sur mesure" },
    ];

    return (
        <DashboardSection title="Corporate" subtitle="Offres entreprises et suivi des programmes.">
            <section className="rounded-xl border border-gray-200 p-5 dark:border-gray-800 xl:col-span-2">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Programmes</h3>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                    {programs.map((program) => (
                        <article key={program.name} className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">{program.name}</h4>
                            <p className="mt-2 text-xs text-gray-600 dark:text-gray-300">Membres: {program.members}</p>
                            <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">Frequence: {program.frequency}</p>
                        </article>
                    ))}
                </div>
            </section>
        </DashboardSection>
    );
}

export function DashboardBlogPage() {
    const posts = [
        { title: "5 routines matinales pour rester en forme", category: "Conseils", date: "02 May 2026" },
        { title: "Nutrition avant entrainement: guide rapide", category: "Nutrition", date: "30 Apr 2026" },
        { title: "Recuperation active: eviter les blessures", category: "Sante", date: "22 Apr 2026" },
    ];

    return (
        <DashboardSection title="Blog" subtitle="Contenu editorial et publications recentes.">
            <section className="rounded-xl border border-gray-200 p-5 dark:border-gray-800 xl:col-span-2">
                <div className="space-y-4">
                    {posts.map((post) => (
                        <article
                            key={post.title}
                            className="rounded-lg border border-gray-200 px-4 py-3 dark:border-gray-700"
                        >
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{post.title}</h3>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                {post.category} - {post.date}
                            </p>
                        </article>
                    ))}
                </div>
            </section>
        </DashboardSection>
    );
}

export function DashboardSocialPage() {
    const messages = [
        { platform: "Instagram", summary: "12 nouveaux commentaires", status: "A traiter" },
        { platform: "Facebook", summary: "3 messages prives", status: "Nouveau" },
        { platform: "WhatsApp", summary: "8 demandes d'inscription", status: "Urgent" },
    ];

    return (
        <DashboardSection title="Social" subtitle="Suivi des interactions communautaires.">
            {messages.map((message) => (
                <section key={message.platform} className="rounded-xl border border-gray-200 p-5 dark:border-gray-800">
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{message.platform}</h3>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{message.summary}</p>
                    <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Statut: {message.status}</p>
                </section>
            ))}
        </DashboardSection>
    );
}
