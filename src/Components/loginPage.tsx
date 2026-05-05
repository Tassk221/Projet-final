import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ill from "../assets/ChatGPT Image 1 mai 2026, 19_49_34.png"
import photo from "../assets/pic.jpg"

export default function LoginPage() {
    const [show, setShow] = useState(false)
    const navigate = useNavigate()

    return (
        <div className="flex min-h-screen w-full flex-col bg-white lg:flex-row">
            <div className="flex w-full items-center justify-center px-4 py-8 lg:w-2/3 lg:px-8">
                <div className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-gray-200 p-6 shadow-lg sm:p-8 lg:p-10">
                    <img src={photo} alt="Logo" className="h-12 w-12" />

                    <div>
                        <p className="font-semibold text-gray-700">Bienvenue !!!</p>
                        <h2 className="text-3xl font-bold">Connexion</h2>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-600">Email</label>
                        <input type="text" className="rounded border border-gray-300 px-3 py-2 text-sm" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between">
                            <label className="text-sm text-gray-600">Password</label>
                            <Link to="/forgot-password" className="text-sm text-gray-400">Mot de passe oublie ?</Link>
                        </div>
                        <div className="flex rounded border border-gray-300 px-3 py-2">
                            <input
                                type={show ? "text" : "password"}
                                className="flex-1 text-sm outline-none"
                            />
                            <button type="button" onClick={() => setShow(!show)} className="text-lg leading-none text-gray-400">
                                {show ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    <button className="mt-2 rounded-full bg-orange-500 py-2 font-semibold text-white" onClick={() => navigate("/")}>
                        SE CONNECTER
                    </button>

                    <p className="text-center text-sm text-gray-400">
                        Pas encore de compte ?{" "}
                        <a href="#" className="font-medium text-orange-500">S'inscrire</a>
                    </p>
                </div>
            </div>

            <div className="hidden w-1/3 items-center justify-center bg-orange-50 lg:flex">
                <img src={ill} alt="illustration" className="h-full w-full object-cover" />
            </div>
        </div>
    )
}
