import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import ill from "../assets/ChatGPT Image 1 mai 2026, 19_49_34.png"
import photo from "../assets/pic.jpg"


export default function LoginPage() {
    const [show, setShow] = useState(false)
    const navigate = useNavigate()

    return (
        <div className="w-full flex h-screen">
            {/* Gauche */}
            <div className="w-2/3 bg-white flex items-center justify-center">
                <div className="flex flex-col gap-4 border border-gray-200 rounded-2xl p-10 w-96 shadow-lg">
                        <img src={photo} alt="Logo" className="h-15 w-15" />
                    
                    <div>
                        <p className="font-semibold text-gray-700">Bienvenue !!!</p>
                        <h2 className="text-3xl font-bold">Connexion</h2>
                    </div>

                    {/* Email */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm text-gray-600">Email</label>
                        <input type="text" placeholder="" className="border border-gray-300 rounded px-3 py-2 text-sm" />
                    </div>

                   {/* Password */}
<div className="flex flex-col gap-1">
    <div className="flex justify-between">
        <label className="text-sm text-gray-600">Password</label>
        <Link to="/forgot-password" className="text-sm text-gray-400">Mot de passe oublié ?</Link>
    </div>
    <div className="flex border border-gray-300 rounded px-3 py-2">
        <input 
            type={show ? "text" : "password"}  
            placeholder="" 
            className="text-sm outline-none flex-1" 
        />
        <button onClick={() => setShow(!show)} className="text-gray-400 text-sm">
            {show ? "🙈" : "👁️"}
        </button>
    </div>
</div>

                    <button className="bg-orange-500 text-white rounded-full py-2 font-semibold mt-2" onClick={() => navigate("/")}>
                        
                        SE CONNECTER
                    </button>

                    <p className="text-center text-sm text-gray-400">
    Pas encore de compte ?{" "}
    <a href="#" className="text-orange-500 font-medium">S'inscrire</a>
</p>
                </div>
            </div>

            {/* Droite - couleur crème + illustration */}
            <div className="bg-orange-50 w-1/3 flex items-center justify-center">
                {/* Remplace par ton image/illustration */}
                <img src={ill} alt="illustration" className=" h-full" />
            </div>
        </div>
    )
}