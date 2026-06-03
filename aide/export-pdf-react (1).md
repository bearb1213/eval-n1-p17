# Export PDF en React — Guide de référence

## Les approches principales

### 1. `window.print()` — Natif, sans librairie

La méthode la plus simple. Déclenche l'impression du navigateur, qui peut générer un PDF.

```jsx
const handlePrint = () => window.print();

// Dans votre composant
<button onClick={handlePrint}>Exporter en PDF</button>
```

**CSS dédié à l'impression :**
```css
@media print {
  .no-print { display: none; }             /* Masquer boutons, nav... */
  .page-break { page-break-before: always; } /* Saut de page */
}
```

✅ Aucune dépendance  
❌ Peu de contrôle sur le rendu final

---

### 2. `react-to-pdf` — Export d'un composant React

Capture un composant DOM et le convertit en PDF.

```bash
npm install react-to-pdf
```

```jsx
import { useRef } from 'react';
import { usePDF } from 'react-to-pdf';

function MyComponent() {
  const { toPDF, targetRef } = usePDF({ filename: 'document.pdf' });

  return (
    <>
      <button onClick={() => toPDF()}>Télécharger PDF</button>
      <div ref={targetRef}>
        <h1>Contenu à exporter</h1>
        <p>Ce contenu sera dans le PDF.</p>
      </div>
    </>
  );
}
```

✅ Simple, orienté composant React  
❌ Rendu basé sur screenshot (images parfois floues)

---

### 3. `jsPDF` + `html2canvas` — Contrôle complet

Capture le DOM en canvas puis génère un PDF pixel-perfect.

```bash
npm install jspdf html2canvas
```

```jsx
import { useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

function ExportButton({ contentRef }) {
  const handleExport = async () => {
    const canvas = await html2canvas(contentRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('document.pdf');
  };

  return <button onClick={handleExport}>Exporter en PDF</button>;
}
```

✅ Contrôle total, rendu fidèle au DOM  
❌ Texte non sélectionnable dans le PDF (c'est une image)

---

### 4. `@react-pdf/renderer` — PDF programmatique

Génère un vrai PDF avec du texte natif (sélectionnable, indexable).

```bash
npm install @react-pdf/renderer
```

```jsx
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 10 },
  text: { fontSize: 12, color: '#333' },
});

const MyPDF = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View>
        <Text style={styles.title}>{data.title}</Text>
        <Text style={styles.text}>{data.body}</Text>
      </View>
    </Page>
  </Document>
);

// Bouton de téléchargement
function DownloadButton({ data }) {
  return (
    <PDFDownloadLink document={<MyPDF data={data} />} fileName="document.pdf">
      {({ loading }) => loading ? 'Génération...' : 'Télécharger PDF'}
    </PDFDownloadLink>
  );
}
```

✅ Texte natif, PDF de qualité professionnelle  
❌ Layout différent de votre UI React (pas de CSS classique)

---

### 5. `window.print()` + CSS d'impression — Facture HTML créée par vous

Quand vous rédigez vous-même le HTML de la facture, cette approche est la plus adaptée. Elle combine la simplicité de `window.print()` avec un CSS d'impression précis pour un résultat professionnel : texte sélectionnable, mise en page au millimètre, aucune dépendance.

#### Structure de base

```html
<!-- invoice.html -->
<body>
  <div class="invoice-page">
    <!-- contenu de la facture -->
  </div>
  <button class="no-print" onclick="window.print()">
    Exporter PDF
  </button>
</body>
```

```css
/* Masquer les éléments UI à l'impression */
@media print {
  .no-print { display: none !important; }

  /* Format A4 exact avec marges maîtrisées */
  @page {
    size: A4 portrait;
    margin: 15mm 20mm;
  }

  .invoice-page {
    width: 210mm;
    min-height: 297mm;
    box-sizing: border-box;
    page-break-after: always;
  }
}
```

#### Composant React complet

```jsx
function InvoicePage({ invoice }) {
  const handlePrint = () => {
    document.title = `Facture-${invoice.number}`;
    window.print();
  };

  return (
    <>
      <style>{`
        @media print {
          .no-print { display: none; }
          @page { size: A4; margin: 15mm 20mm; }
          * { print-color-adjust: exact; -webkit-print-color-adjust: exact; }
        }
      `}</style>

      <button className="no-print" onClick={handlePrint}>
        Exporter PDF
      </button>

      <div id="invoice-content">
        {/* votre facture ici */}
      </div>
    </>
  );
}
```

#### CSS d'impression essentiel

```css
@media print {
  /* Forcer les couleurs d'arrière-plan (fonds colorés, lignes de tableau...) */
  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Éviter les coupures au mauvais endroit */
  table  { page-break-inside: avoid; }
  tr     { page-break-inside: avoid; }
  h1, h2 { page-break-after: avoid; }

  /* Répéter l'en-tête de tableau sur chaque page (facture longue) */
  thead { display: table-header-group; }
  tfoot { display: table-footer-group; }

  /* Fond coloré sur ligne total */
  .row-total { background: #f5f5f5 !important; }
}
```

#### Gestion multi-pages

```css
/* Forcer un saut de page explicite */
.page-break {
  page-break-before: always;
  break-before: page; /* syntaxe moderne */
}
```

✅ Texte sélectionnable et copiable dans le PDF  
✅ Contrôle total du layout via CSS (millimètres exacts)  
✅ Aucune dépendance npm  
❌ Dépend du navigateur (résultat légèrement variable selon Chrome / Firefox / Safari)

---

## Comparatif rapide

| Méthode | Texte sélectionnable | Fidélité au DOM | Complexité | Dépendance |
|---|---|---|---|---|
| `window.print()` | ✅ | ✅ | Faible | Aucune |
| `window.print()` + CSS (HTML fait par vous) | ✅ | ✅✅ | Faible | Aucune |
| `react-to-pdf` | ❌ (image) | ✅ | Faible | Légère |
| `jsPDF` + `html2canvas` | ❌ (image) | ✅✅ | Moyenne | Moyenne |
| `@react-pdf/renderer` | ✅ | ❌ | Élevée | Lourde |

---

## Astuces communes

- **Masquer les éléments UI** lors de l'export avec une classe `.no-print` ou un état React
- **`scale: 2`** dans `html2canvas` pour une meilleure résolution
- **Gérer le chargement** : afficher un spinner pendant la génération
- **Multi-pages** avec `jsPDF` : calculer la hauteur et utiliser `pdf.addPage()` si le contenu dépasse une page

```js
// Exemple multi-pages avec jsPDF
const pageHeight = pdf.internal.pageSize.getHeight();
let position = 0;

if (pdfHeight > pageHeight) {
  pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
  position -= pageHeight;
  pdf.addPage();
}
```

---

## Recommandation selon le cas

- **Rapport simple / page web** → `window.print()`
- **Export rapide d'un composant** → `react-to-pdf`
- **Rendu pixel-perfect d'un dashboard** → `jsPDF` + `html2canvas`
- **Facture HTML rédigée par vous** → `window.print()` + CSS d'impression
- **Facture générée sans HTML (données brutes)** → `@react-pdf/renderer`
- **Document structuré (contrat, rapport long...)** → `@react-pdf/renderer`
