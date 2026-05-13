import { loginAdmin } from "../../service/login/LoginTest";
import { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";



export default function LoginAdmin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("tsilavoharinavalona13@gmail.com");
    const [password, setPassword] = useState("prestashop");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await loginAdmin(email, password);
            navigate("/admin");
        } catch (err) {
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            {/* Fond plein écran centré */}
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
                
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Login Admin
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Champ Email */}
                    <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Email:
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        placeholder="admin@example.com"
                    />
                    </div>

                    {/* Champ Mot de passe */}
                    <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password:
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="shadow-sm border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                        placeholder="••••••••"
                    />
                    </div>

                    {/* Bouton de connexion */}
                    <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                    {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                {/* Message d'erreur */}
                {error && (
                    <p className="text-red-500 text-sm italic mt-4 text-center">
                    {error}
                    </p>
                )}
                </div>
            </div>
        </>
    );


}