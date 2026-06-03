import { useState } from "react"
import { loginAdmin } from "../../service/login/LoginTest";


export default function MdpAdmin({
    handleMdp ,
    handleShowPopup ,   
}){
    const [password , setPassword] = useState("prestashop");
    const [email, setEmail] = useState("tsilavoharinavalona13@gmail.com");
    const [error, setError] = useState("");
    const [loading , setLoading] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            await loginAdmin(email, password);
            handleShowPopup();
            handleMdp();
            // navigate("/admin");
        } catch (err) {
            setError("Invalid email or password");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">

            <button
            type="button"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            onClick={(e) => handleMdp()}
            >
                close
            </button>
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
            
                <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                {loading ? "Logging in..." : "Login"}
                </button>
                {error && (
                    <p className="text-red-500 text-sm italic mt-4 text-center">
                    {error}
                    </p>
                )}
            </div>
        </div>
    )
}