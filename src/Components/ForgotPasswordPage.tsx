export default function ForgotPasswordPage() {
    return (
        <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col gap-4 border border-gray-200 rounded-2xl p-10 w-96 shadow-lg">
                <h2 className="text-2xl font-bold">Mot de passe oublié</h2>
                <p className="text-sm text-gray-400">Entrez votre email pour réinitialiser</p>
                <input type="email" placeholder="" className="border border-gray-300 rounded px-3 py-2 text-sm" />
                <button className="bg-orange-500 text-white rounded-full py-2 font-semibold">
                    ENVOYER
                </button>
            </div>
        </div>
    )
}