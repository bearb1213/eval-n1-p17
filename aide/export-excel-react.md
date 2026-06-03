# Export Excel depuis React

Guide complet pour exporter des données vers Excel dans une application React.

---

## 1. Installation

### Option A — SheetJS (recommandé, gratuit)

```bash
npm install xlsx
```

### Option B — exceljs (plus de contrôle sur le style)

```bash
npm install exceljs file-saver
```

---

## 2. Export simple avec SheetJS

```jsx
import * as XLSX from "xlsx";

const data = [
  { Nom: "Alice", Age: 30, Ville: "Paris" },
  { Nom: "Bob",   Age: 25, Ville: "Lyon"  },
];

function exportToExcel(data, fileName = "export") {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook  = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Données");
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}

// Dans un composant React
export default function App() {
  return (
    <button onClick={() => exportToExcel(data, "mes-donnees")}>
      Télécharger Excel
    </button>
  );
}
```

---

## 3. Export avec en-têtes personnalisées

```jsx
function exportWithHeaders(data, fileName = "export") {
  // Ordre et nom des colonnes à afficher
  const headers = ["Nom", "Age", "Ville"];

  const worksheet = XLSX.utils.json_to_sheet(data, { header: headers });

  // Largeur des colonnes
  worksheet["!cols"] = [
    { wch: 20 }, // Nom
    { wch: 10 }, // Age
    { wch: 20 }, // Ville
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Feuille1");
  XLSX.writeFile(workbook, `${fileName}.xlsx`);
}
```

---

## 4. Export multi-feuilles

```jsx
function exportMultiSheets({ sheet1Data, sheet2Data }, fileName = "export") {
  const wb = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(sheet1Data), "Utilisateurs");
  XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(sheet2Data), "Commandes");

  XLSX.writeFile(wb, `${fileName}.xlsx`);
}
```

---

## 5. Export stylisé avec exceljs

```jsx
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";

async function exportStyledExcel(data, fileName = "export") {
  const workbook  = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Données");

  // Définir les colonnes
  worksheet.columns = [
    { header: "Nom",   key: "nom",   width: 20 },
    { header: "Age",   key: "age",   width: 10 },
    { header: "Ville", key: "ville", width: 20 },
  ];

  // Style de l'en-tête
  worksheet.getRow(1).eachCell((cell) => {
    cell.font       = { bold: true, color: { argb: "FFFFFFFF" } };
    cell.fill       = { type: "pattern", pattern: "solid", fgColor: { argb: "FF2563EB" } };
    cell.alignment  = { vertical: "middle", horizontal: "center" };
  });

  // Ajouter les lignes
  data.forEach((row) => worksheet.addRow(row));

  // Alternance de couleur de ligne
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1) {
      row.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: rowNumber % 2 === 0 ? "FFF0F4FF" : "FFFFFFFF" },
        };
      });
    }
  });

  // Générer et télécharger le fichier
  const buffer = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([buffer]), `${fileName}.xlsx`);
}
```

---

## 6. Hook réutilisable `useExcelExport`

```jsx
// hooks/useExcelExport.js
import * as XLSX from "xlsx";

export function useExcelExport() {
  const exportData = (data, options = {}) => {
    const {
      fileName    = "export",
      sheetName   = "Données",
      columnWidths = [],
    } = options;

    const ws = XLSX.utils.json_to_sheet(data);

    if (columnWidths.length > 0) {
      ws["!cols"] = columnWidths.map((w) => ({ wch: w }));
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return { exportData };
}

// Utilisation dans un composant
import { useExcelExport } from "./hooks/useExcelExport";

export default function TableComponent({ data }) {
  const { exportData } = useExcelExport();

  return (
    <button
      onClick={() =>
        exportData(data, {
          fileName:     "rapport-2026",
          sheetName:    "Rapport",
          columnWidths: [25, 12, 20],
        })
      }
    >
      Exporter
    </button>
  );
}
```

---

## 7. Comparatif des librairies

| Critère         | SheetJS (`xlsx`) | exceljs          |
|-----------------|------------------|------------------|
| Taille bundle   | ~500 KB          | ~1.2 MB          |
| Styling cells   | Limité (payant)  | ✅ Complet        |
| Facilité        | ✅ Très simple   | Modéré           |
| Multi-feuilles  | ✅               | ✅               |
| Formules        | ✅               | ✅               |
| Licence         | Apache 2.0       | MIT              |

---

## 8. Bonnes pratiques

- **Formater les données** avant l'export : dates en string `"DD/MM/YYYY"`, nombres avec virgules si besoin.
- **Limiter la taille** : pour de très grands datasets (> 50 000 lignes), utiliser `XLSX.stream` ou générer côté serveur.
- **Nommer le fichier** avec la date : `rapport-${new Date().toISOString().slice(0,10)}.xlsx`.
- **Accessibilité** : ajouter `aria-label` au bouton d'export.
- **UX** : afficher un état de chargement (`loading`) pour les exports volumineux.

---

## Ressources

- [SheetJS Docs](https://docs.sheetjs.com/)
- [ExcelJS GitHub](https://github.com/exceljs/exceljs)
- [File-Saver](https://github.com/eligrey/FileSaver.js)
