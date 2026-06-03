function normalizeId(id) {
    if (typeof id === "object" && id["#text"]) {
        return id["#text"];
    }   
    return id;
}




export { normalizeId };