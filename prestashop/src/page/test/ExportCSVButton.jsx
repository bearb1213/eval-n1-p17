import { useState } from "react";
import { downloadCSVWithPapa } from "../../service/data/DataExport"

const SEPARATORS = [
  { label: "Point-virgule  ;  (Excel FR)", value: ";" },
  { label: "Virgule        ,  (Excel EN)", value: "," },
  { label: "Tabulation     \\t",           value: "\t" },
  { label: "Pipe           |",             value: "|"  },
];

export default function ExportCSVButton() {
  const [separator, setSeparator] = useState(";");
// Utilisation
    const data = [
    { Nom: "Alice", Age: 30, Ville: "Paris"  },
    { Nom: "Bob",   Age: 25, Ville: "Lyon"   },
    ];
    const fileName = "export";
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

      <button 
        className="bg-blue-200"
      onClick={() => downloadCSVWithPapa(data, fileName, separator)}>
        Télécharger CSV
      </button>
    </div>
  );
}
