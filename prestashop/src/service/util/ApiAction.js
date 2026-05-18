import {getEnv} from "./EnvVariable.js";

async function ApiAction (
    url ,
    action ,
    params = {} ,
    body = null ,
    debug = false
    ) {
    // const baseURL = import.meta.env.VITE_URL ?? 'http://localhost';
    const baseURL = getEnv("VITE_URL", 'http:/localhost');
    // const ws_key = import.meta.env.VITE_WS_KEY ?? '';
    const ws_key = getEnv("VITE_WS_KEY", '');
    const query = new URLSearchParams(params).toString();
    const urlSend = baseURL + url + (query ? "?" + query : "") ;
    const init = {
        method: action,
        headers : {
            "Authorization": `Basic ${btoa(ws_key + ":")}`,
        } ,
        body: body ?? null,
    }
    if(debug){
        console.log({
            url: urlSend,
            action: action,
            body: body,
            init : init,
            ws_key: ws_key,
        });
    }
    const response = await fetch(
        urlSend ,
        init
    )

    if (!response.ok) {
        throw new Error(
            `Erreur HTTP ${response.status}`
        )
    }

    return await response.text();
}
async function buildPrestashopHeaders(){
    try {
        const ws_key = getEnv("VITE_WS_KEY", '');
        return  {
            "Authorization": `Basic ${btoa(ws_key + ":")}`,
        }
    } catch (e) {
        console.error("Error building headers:", e);
        return {};
    }
}

export {
    ApiAction,
    buildPrestashopHeaders
}