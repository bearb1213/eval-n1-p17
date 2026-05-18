import JSZip from "jszip";
import { buildPrestashopHeaders } from "../util/ApiAction";

const SUPPORTED_EXTENSIONS = new Set(["webp", "png", "jpg", "jpeg", "gif", "svg", "bmp"]);

// ─── Helpers ─────────────────────────────────────────────────────────────────

const getReferenceFromFilename = (filename) => {
    const cleanName = filename.split("/").pop() || filename;
    const parts = cleanName.split(".");
    if (parts.length < 2) return "";
    parts.pop();
    return parts.join(".");
};

const getExtension = (filename) => {
    const cleanName = filename.split("/").pop() || filename;
    const parts = cleanName.split(".");
    if (parts.length < 2) return "";
    return parts.pop().toLowerCase();
};

const findProductByReference = (products, reference) => {
    const key = String(reference || "").trim().toLowerCase();
    return products.find(
        (p) => String(p.reference || "").trim().toLowerCase() === key
    ) ?? null;
};

// ─── Upload ───────────────────────────────────────────────────────────────────

const MIME_TYPES = {
    jpg: "image/jpeg", jpeg: "image/jpeg",
    png: "image/png", webp: "image/webp",
    gif: "image/gif", bmp: "image/bmp", svg: "image/svg+xml",
};

const uploadImage = async ({ productId, blob, filename }) => {
    const extension = getExtension(filename);
    const mime = MIME_TYPES[extension] || "image/jpeg";

    // Forcer le type MIME si absent
    const typedBlob = blob.type ? blob : new Blob([blob], { type: mime });

    const formData = new FormData();
    formData.append("image", typedBlob, filename);

    console.log("Upload →", { productId, filename, type: typedBlob.type, size: typedBlob.size });

    const response = await fetch(`/api/images/products/${productId}`, {
        method: "POST",
        headers: buildPrestashopHeaders(),
        body: formData,
    });

    const body = await response.text();

    if (!response.ok) {
        const error = new Error(`HTTP ${response.status}: ${response.statusText}`);
        error.status = response.status;
        error.body = body;
        throw error;
    }
};


// ─── Main ─────────────────────────────────────────────────────────────────────

export async function createImageFromZip(zipFile, products, onLog = null, onProgress = null) {
    if (!zipFile) {
        if (onLog) onLog("Aucun fichier zip fourni");
        return [];
    }

    const zip = await JSZip.loadAsync(zipFile);
    const entries = Object.values(zip.files).filter((entry) => !entry.dir);

    if (entries.length === 0) {
        if (onLog) onLog("Aucune image dans le zip");
        return [];
    }

    const responses = [];

    for (let i = 0; i < entries.length; i += 1) {
        const entry = entries[i];
        const filename = entry.name.split("/").pop() || entry.name;
        const extension = getExtension(filename);

        if (!SUPPORTED_EXTENSIONS.has(extension)) {
            if (onLog) onLog(`Format non supporté: ${filename}`);
            if (onProgress) onProgress((i + 1) / entries.length);
            responses.push({ image: filename, ok: false, reason: "unsupported_format" });
            continue;
        }

        const reference = getReferenceFromFilename(filename);
        if (!reference) {
            if (onLog) onLog(`Référence introuvable pour ${filename}`);
            if (onProgress) onProgress((i + 1) / entries.length);
            responses.push({ image: filename, ok: false, reason: "missing_reference" });
            continue;
        }

        const product = findProductByReference(products, reference);
        if (!product) {
            if (onLog) onLog(`Produit introuvable pour référence: ${reference}`);
            if (onProgress) onProgress((i + 1) / entries.length);
            responses.push({ image: filename, ok: false, reason: "product_not_found" });
            continue;
        }

        try {
            const blob = await entry.async("blob");
            await uploadImage({ productId: product.id, blob, filename });

            importedCount += 1;
            if (onLog) onLog(`Image importée pour ${reference}`);
            responses.push({ image: filename, ok: true });
        } catch (error) {
            if (onLog) onLog(`Erreur import image ${filename} (${error?.status ?? ""})`.trim());
            responses.push({ image: filename, ok: false, reason: error?.body || error?.message });
        }

        if (onProgress) onProgress((i + 1) / entries.length);
    }

    return responses;
}