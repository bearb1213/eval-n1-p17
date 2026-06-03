# Export CSV depuis React (avec choix de séparateur)

Guide complet pour exporter des données en CSV dans une application React, avec gestion du séparateur.

---

## 1. Installation

### Option A — Sans dépendance (natif)

Aucune installation requise. On construit le CSV manuellement avec du JavaScript pur.

### Option B — PapaParse (parsing + export)

```bash
npm install papaparse
```

---

## 2. Export natif (zéro dépendance)

```jsx
/**
 * Convertit un tableau d'objets en chaîne CSV.
 * @param {object[]} data        - Tableau de données
 * @param {string}   separator   - Séparateur : "," | ";" | "\t" | "|"
 * @param {boolean}  withBOM     - Ajouter BOM UTF-8 (recommandé pour Excel)
 */
function toCSV(data, separator = ";", withBOM = true) {
  if (!data || data.length === 0) return "";

  const headers = Object.keys(data[0]);

  const escape = (value) => {
    const str = value === null || value === undefined ? "" : String(value);
    // Si la valeur contient le séparateur, des guillemets ou un saut de ligne → encapsuler
    if (str.includes(separator) || str.includes('"') || str.includes("\n")) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  };

  const rows = [
    headers.map(escape).join(separator),
    ...data.map((row) => headers.map((h) => escape(row[h])).join(separator)),
  ];

  const csv = rows.join("\n");
  return withBOM ? "\uFEFF" + csv : csv; // BOM pour compatibilité Excel
}

function downloadCSV(data, fileName = "export", separator = ";") {
  const csv  = toCSV(data, separator);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);

  const link    = document.createElement("a");
  link.href     = url;
  link.download = `${fileName}.csv`;
  link.click();

  URL.revokeObjectURL(url);
}
```

---

## 3. Export avec PapaParse

```jsx
import Papa from "papaparse";

function downloadCSVWithPapa(data, fileName = "export", separator = ";") {
  const csv = Papa.unparse(data, {
    delimiter: separator,    // séparateur de colonnes
    newline:   "\n",         // "\r\n" pour Windows
    quotes:    true,         // encapsuler toutes les valeurs entre guillemets
    header:    true,         // inclure la ligne d'en-tête
  });

  const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);

  const link    = document.createElement("a");
  link.href     = url;
  link.download = `${fileName}.csv`;
  link.click();

  URL.revokeObjectURL(url);
}
```

---

## 4. Composant React avec sélecteur de séparateur

```jsx
import { useState } from "react";

const SEPARATORS = [
  { label: "Point-virgule  ;  (Excel FR)", value: ";" },
  { label: "Virgule        ,  (Excel EN)", value: "," },
  { label: "Tabulation     \\t",           value: "\t" },
  { label: "Pipe           |",             value: "|"  },
];

export default function ExportCSVButton({ data, fileName = "export" }) {
  const [separator, setSeparator] = useState(";");

  return (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      <select
        value={separator}
        onChange={(e) => setSeparator(e.target.value)}
        aria-label="Choisir le séparateur CSV"
      >
        {SEPARATORS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>

      <button onClick={() => downloadCSV(data, fileName, separator)}>
        Télécharger CSV
      </button>
    </div>
  );
}

// Utilisation
const data = [
  { Nom: "Alice", Age: 30, Ville: "Paris"  },
  { Nom: "Bob",   Age: 25, Ville: "Lyon"   },
];

<ExportCSVButton data={data} fileName="utilisateurs" />
```

---

## 5. Hook réutilisable `useCSVExport`

```jsx
// hooks/useCSVExport.js
import { useState, useCallback } from "react";

const DEFAULT_SEPARATORS = [
  { label: "Point-virgule ;", value: ";"  },
  { label: "Virgule ,",       value: ","  },
  { label: "Tabulation \\t",  value: "\t" },
  { label: "Pipe |",          value: "|"  },
];

function toCSV(data, separator, withBOM = true) {
  if (!data?.length) return "";
  const headers = Object.keys(data[0]);
  const escape  = (v) => {
    const s = v === null || v === undefined ? "" : String(v);
    return s.includes(separator) || s.includes('"') || s.includes("\n")
      ? `"${s.replace(/"/g, '""')}"`
      : s;
  };
  const csv = [
    headers.map(escape).join(separator),
    ...data.map((row) => headers.map((h) => escape(row[h])).join(separator)),
  ].join("\n");
  return withBOM ? "\uFEFF" + csv : csv;
}

export function useCSVExport(options = {}) {
  const { defaultSeparator = ";", withBOM = true } = options;
  const [separator, setSeparator] = useState(defaultSeparator);

  const exportData = useCallback(
    (data, fileName = "export") => {
      const csv  = toCSV(data, separator, withBOM);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url  = URL.createObjectURL(blob);
      const link = Object.assign(document.createElement("a"), {
        href:     url,
        download: `${fileName}.csv`,
      });
      link.click();
      URL.revokeObjectURL(url);
    },
    [separator, withBOM]
  );

  return { separator, setSeparator, exportData, separators: DEFAULT_SEPARATORS };
}

// Utilisation dans un composant
import { useCSVExport } from "./hooks/useCSVExport";

export default function MyTable({ data }) {
  const { separator, setSeparator, exportData, separators } = useCSVExport();

  return (
    <>
      <select value={separator} onChange={(e) => setSeparator(e.target.value)}>
        {separators.map((s) => (
          <option key={s.value} value={s.value}>{s.label}</option>
        ))}
      </select>
      <button onClick={() => exportData(data, "mon-rapport")}>Export CSV</button>
    </>
  );
}
```

---

## 6. Export de colonnes sélectionnées

```jsx
/**
 * Exporte uniquement certaines colonnes, avec renommage des en-têtes.
 * @param {object[]} data
 * @param {object[]} columns  - [{ key: "nom", header: "Prénom" }, ...]
 * @param {string}   separator
 */
function exportColumns(data, columns, fileName = "export", separator = ";") {
  const escape = (v) => {
    const s = v === null || v === undefined ? "" : String(v);
    return s.includes(separator) || s.includes('"') || s.includes("\n")
      ? `"${s.replace(/"/g, '""')}"`
      : s;
  };

  const rows = [
    columns.map((c) => escape(c.header)).join(separator),
    ...data.map((row) =>
      columns.map((c) => escape(row[c.key])).join(separator)
    ),
  ];

  const csv  = "\uFEFF" + rows.join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const link = Object.assign(document.createElement("a"), {
    href: url, download: `${fileName}.csv`,
  });
  link.click();
  URL.revokeObjectURL(url);
}

// Exemple d'appel
exportColumns(
  data,
  [
    { key: "nom",   header: "Prénom / Nom" },
    { key: "ville", header: "Localité"     },
  ],
  "export-partiel",
  ";"
);
```

---

## 7. Gestion des cas particuliers

| Cas                        | Solution                                              |
|----------------------------|-------------------------------------------------------|
| Valeur contenant le séparateur | Encapsuler entre `"…"`                           |
| Guillemets dans la valeur  | Doubler : `"` → `""`                                 |
| Sauts de ligne dans une cellule | Encapsuler entre `"…"`                         |
| Caractères accentués       | Ajouter le BOM UTF-8 `\uFEFF` en tête               |
| Dates                      | Formater en string avant export (`toLocaleDateString`) |
| Nombres décimaux (FR)      | Remplacer `.` par `,` si séparateur `;`              |
| Très grands datasets       | Générer par chunks avec `requestIdleCallback`        |

---

## 8. Séparateur recommandé selon le contexte

| Contexte                     | Séparateur conseillé |
|------------------------------|----------------------|
| Excel France / Belgique      | `;`                  |
| Excel USA / UK               | `,`                  |
| Import base de données       | `\t` (TSV)           |
| Logs / scripts shell         | `\|`                 |
| Google Sheets (import)       | `,`                  |

> **Astuce** : Excel détecte automatiquement le séparateur si le fichier commence par `sep=;` sur la première ligne.
> Pour l'ajouter : `"sep=" + separator + "\n" + csvContent`

---

## 9. Comparatif natif vs PapaParse

| Critère              | Natif (zéro dép.)  | PapaParse          |
|----------------------|--------------------|--------------------|
| Taille bundle        | 0 KB               | ~50 KB             |
| Parsing (lecture)    | ❌                 | ✅                  |
| Gestion des guillemets | Manuel           | ✅ Automatique     |
| Options avancées     | À coder            | ✅ Prêtes à l'emploi |
| TypeScript types     | À écrire           | ✅ Inclus          |

---

## Ressources

- [PapaParse Docs](https://www.papaparse.com/docs)
- [RFC 4180 — Spécification CSV](https://datatracker.ietf.org/doc/html/rfc4180)
- [MDN — Blob & URL.createObjectURL](https://developer.mozilla.org/fr/docs/Web/API/URL/createObjectURL_static)
