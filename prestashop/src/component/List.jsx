import {useEffect,useState} from "react";
import {ApiAction} from "../service/util/ApiAction.js";
import {XMLParser} from "fast-xml-parser";

const parser = new XMLParser({ignoreAttributes: false});

export default function List() {
    const [value ,setValue] = useState("");
    const [url , setUrl] = useState("/products");
    const [urlValide , setUrlValide] = useState("");
    const [error,setError] = useState("");
    const apiCall = async () => {
        try{
            const value = await ApiAction(url,"GET");
            setValue(JSON.stringify(parser.parse(value)));
            console.log((parser.parse(value)))
        } catch (e) {
            setError(e.message);
        }
    }

    const onChangeInput = (e) => {
        setUrl(e.target.value);
    }
    const onclick = async () => {
        setUrlValide(url);
        apiCall();
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
                    {error && (<p className="text-l mb-4 text-red-900">
                        {error}
                    </p>)}
                    <p className="text-l mb-4 text-gray-800">
                       url : { urlValide }
                    </p>
                    <input
                        onChange={onChangeInput}
                        value={url}
                        type="text"
                        placeholder="Entrer une URL..."
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        onClick={onclick}
                        className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition"
                    >
                        send
                    </button>
                    <div className="mt-4 bg-gray-100 p-4 rounded-xl shadow-inner">
                      <pre className="text-sm text-gray-800 overflow-x-auto">
                        {value && JSON.stringify(value, null, 2)}
                      </pre>
                    </div>
                </div>
            </div></>
    );

}