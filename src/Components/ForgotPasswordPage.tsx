export default function ForgotPasswordPage() {
    return (
        <div className="flex min-h-screen items-center justify-center px-4 py-8">
            <div className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-gray-200 p-6 shadow-lg sm:p-8 md:p-10">
                <h2 className="text-2xl font-bold">Mot de passe oublie</h2>
                <p className="text-sm text-gray-400">Entrez votre email pour reinitialiser</p>
                <input type="email" className="rounded border border-gray-300 px-3 py-2 text-sm" />
                <button className="rounded-full bg-orange-500 py-2 font-semibold text-white">
                    ENVOYER
                </button>
            </div>
        </div>
    )
}
