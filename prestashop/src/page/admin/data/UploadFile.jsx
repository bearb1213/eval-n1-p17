import Papa from "papaparse";
import { useState , useEffect } from "react"; 
import { UploadFile as UploadFileApi } from "../../../service/data/DataApi";

export default function UploadFile() {
    const [files, setFiles] = useState({
        fichier1: null,
        fichier2: null,
        fichier3: null
    });
    const [disabled, setDisabled] = useState(true);

    const allFile = () => {
        return files.fichier1 && files.fichier2 && files.fichier3;
    }
   
    const handleFileChange = (e , id) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const containte = []
        Papa.parse(file, {

            header: true,

            skipEmptyLines: true,

            complete: (results) => {
                setFiles(prevFiles => ({
                    ...prevFiles,
                    [id]: results.data
                }));
            }
        });
    }

    const handleSubmit = async (e) => {
        console.log("in components :",files);
        const res = await UploadFileApi(files);
        console.log(res);
    }
    
    useEffect(() => {0
        setDisabled(!allFile());
    }, [files]);
    
    return (
        <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="space-y-4">
                {/* Champ fichier 1 */}
                <div>
                <label htmlFor="fichier1" className="block text-sm font-medium text-gray-700 mb-1">
                    Choose a file for file 1:
                </label>
                <input
                    type="file"
                    id="fichier1"
                    name="fichier1"
                    className="block w-full text-sm text-gray-500 
                            file:mr-4 file:py-2 file:px-4 
                            file:rounded-lg file:border-0 
                            file:text-sm file:font-semibold 
                            file:bg-blue-50 file:text-blue-700 
                            hover:file:bg-blue-100 cursor-pointer"
                    onChange={(e) => handleFileChange(e, "fichier1")}
                />
                </div>

                {/* Champ fichier 2 */}
                <div>
                <label htmlFor="fichier2" className="block text-sm font-medium text-gray-700 mb-1">
                    Choose a file for file 2:
                </label>
                <input
                    type="file"
                    id="fichier2"
                    name="fichier2"
                    className="block w-full text-sm text-gray-500 
                            file:mr-4 file:py-2 file:px-4 
                            file:rounded-lg file:border-0 
                            file:text-sm file:font-semibold 
                            file:bg-blue-50 file:text-blue-700 
                            hover:file:bg-blue-100 cursor-pointer"
                    onChange={(e) => handleFileChange(e, "fichier2")}
                />
                </div>

                {/* Champ fichier 3 */}
                <div>
                <label htmlFor="fichier3" className="block text-sm font-medium text-gray-700 mb-1">
                    Choose a file for file 3:
                </label>
                <input
                    type="file"
                    id="fichier3"
                    name="fichier3"
                    className="block w-full text-sm text-gray-500 
                            file:mr-4 file:py-2 file:px-4 
                            file:rounded-lg file:border-0 
                            file:text-sm file:font-semibold 
                            file:bg-blue-50 file:text-blue-700 
                            hover:file:bg-blue-100 cursor-pointer"
                    onChange={(e) => handleFileChange(e, "fichier3")}
                />
                </div>

                {/* Bouton valider */}
                <button
                disabled={disabled}
                type="submit"
                className={`w-full bg-blue-600 text-white 
                font-semibold py-2.5 px-4 rounded-lg transition-colors 
                focus:outline-none focus:ring-2 focus:ring-offset-2
                ${disabled 
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed" 
                    : "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500"
                }`}
                onClick={handleSubmit}
                >
                Valider
                </button>
            </div>
        </div>
    );
}