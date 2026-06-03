import Papa from "papaparse";

function downloadCSVWithPapa(data, fileName = "export", separator = ";") {
    // console.log("data , ",data);
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


export {
    downloadCSVWithPapa,
}