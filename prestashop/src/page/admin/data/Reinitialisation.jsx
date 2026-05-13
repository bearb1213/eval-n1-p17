import { useEffect , useState } from "react";
import { deleteAllData } from "../../../service/data/DataApi";

export default function Reinitialisation() {

    const [disabled , setDisabled] = useState(true);
    const [fonctionCalled , setFonctionCalled] = useState([]);
    const [loading , setLoading] = useState(false);
    const handleReinitialisation = async () => {
        setLoading(true);
        try {
            setDisabled(true);
            const result = await deleteAllData(setFonctionCalled);
            setFonctionCalled(result);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
        alert("Réinitialisation terminée !");
    }
    const handleCheckboxChange = () => {
        if(loading) return; // Empêche de changer l'état pendant le chargement
        setDisabled(!disabled);
        setFonctionCalled([]); 
    }
    return (
       <div className="max-w-lg mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Bouton de réinitialisation des données
            </h2>

            {/* Checkbox + label bien alignés */}
            <div className="flex items-center gap-3 mb-6">
                <input
                type="checkbox"
                id="reinitialiser"
                checked={!disabled}               // coché = bouton activé
                onChange={handleCheckboxChange}
                className="w-5 h-5 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                />
                <label htmlFor="reinitialiser" className="text-gray-700 text-sm font-medium cursor-pointer select-none">
                Êtes-vous sûr de vouloir réinitialiser les données ?
                </label>
            </div>

            {/* Bouton unique qui réagit à l’état */}
            <button
                disabled={disabled}
                className={`w-full py-2.5 px-4 rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2
                ${disabled 
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                    : "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500"
                }`}
                onClick={handleReinitialisation}
            >
                Réinitialiser
            </button>

            {/* Message informatif facultatif */}
            {disabled && (
                <p className="text-xs text-gray-400 mt-2 text-center">
                Veuillez cocher la case pour confirmer.
                </p>
            )}
            {fonctionCalled.length > 0 && (
                <div className="mt-4 p-4 bg-green-100 border border-green-200 rounded h-48 overflow-y-auto">
                    <h3 className="text-sm font-medium text-green-800 mb-2">Fonctions exécutées :</h3>
                    <ul className="list-disc pl-5 text-green-600">
                        {fonctionCalled.map((f, index) => (
                            <li key={index}>{f}</li>
                        ))}
                    </ul>
                    {loading && (
                        <p className="text-sm text-green-600 mt-2">Chargement...</p>
                    )}
                </div>
            )}
        </div>
    );
}