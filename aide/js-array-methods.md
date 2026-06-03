# Méthodes de tableau JavaScript : map, forEach, reduce & co

Guide pratique avec exemples concrets, pièges courants et cas d'usage React.

---

## Données d'exemple utilisées dans ce guide

```js
const users = [
  { id: 1, nom: "Alice", age: 30, ville: "Paris",  actif: true,  salaire: 3200 },
  { id: 2, nom: "Bob",   age: 25, ville: "Lyon",   actif: false, salaire: 2800 },
  { id: 3, nom: "Clara", age: 35, ville: "Paris",  actif: true,  salaire: 4100 },
  { id: 4, nom: "David", age: 28, ville: "Nantes", actif: true,  salaire: 3600 },
];
```

---

## 1. `forEach` — Parcourir sans retour

Exécute une fonction sur chaque élément. **Ne retourne rien** (`undefined`).

```js
// ✅ Bon usage : effet de bord (log, mutation externe, appel API)
users.forEach((user) => {
  console.log(`${user.nom} habite à ${user.ville}`);
});
// Alice habite à Paris
// Bob habite à Lyon
// ...

// ❌ Mauvais usage : attendre un résultat
const result = users.forEach((u) => u.nom); // result === undefined !
```

> **Règle** : utilise `forEach` quand tu n'as pas besoin du résultat.
> Pour tout le reste, préfère `map`, `filter`, `reduce`.

---

## 2. `map` — Transformer chaque élément

Retourne un **nouveau tableau** de même longueur, chaque élément transformé.

```js
// Extraire un champ
const noms = users.map((u) => u.nom);
// ["Alice", "Bob", "Clara", "David"]

// Transformer un objet
const cartes = users.map((u) => ({
  label: `${u.nom} (${u.age} ans)`,
  value: u.id,
}));
// [{ label: "Alice (30 ans)", value: 1 }, ...]

// Modifier un champ
const augmentes = users.map((u) => ({
  ...u,
  salaire: u.salaire * 1.1, // +10%
}));

// Accès à l'index
const numerotes = users.map((u, index) => `${index + 1}. ${u.nom}`);
// ["1. Alice", "2. Bob", ...]
```

### En React — Rendre une liste

```jsx
function UserList({ users }) {
  return (
    <ul>
      {users.map((user) => (
        <li key={user.id}>{user.nom} — {user.ville}</li>
      ))}
    </ul>
  );
}
```

> **Toujours mettre `key`** sur l'élément racine dans un `map` React.

---

## 3. `filter` — Garder certains éléments

Retourne un **nouveau tableau** avec uniquement les éléments qui passent le test.

```js
// Utilisateurs actifs
const actifs = users.filter((u) => u.actif);
// [Alice, Clara, David]

// Par ville
const parisiens = users.filter((u) => u.ville === "Paris");
// [Alice, Clara]

// Salaire supérieur à 3000
const bienPaies = users.filter((u) => u.salaire > 3000);
// [Alice, Clara, David]

// Plusieurs conditions
const cible = users.filter((u) => u.actif && u.age < 32);
// [Alice, David]
```

### Chaîner `filter` + `map`

```js
// Noms des utilisateurs actifs de Paris
const noms = users
  .filter((u) => u.actif && u.ville === "Paris")
  .map((u) => u.nom);
// ["Alice", "Clara"]
```

---

## 4. `reduce` — Agréger en une valeur

Réduit le tableau à **une seule valeur** (nombre, objet, tableau…).

```js
// Syntaxe : array.reduce((accumulateur, element) => ..., valeurInitiale)

// Somme des salaires
const totalSalaires = users.reduce((acc, u) => acc + u.salaire, 0);
// 13700

// Salaire moyen
const moyenne = users.reduce((acc, u) => acc + u.salaire, 0) / users.length;
// 3425

// Compter par ville
const parVille = users.reduce((acc, u) => {
  acc[u.ville] = (acc[u.ville] || 0) + 1;
  return acc;
}, {});
// { Paris: 2, Lyon: 1, Nantes: 1 }

// Grouper par ville
const groupes = users.reduce((acc, u) => {
  if (!acc[u.ville]) acc[u.ville] = [];
  acc[u.ville].push(u);
  return acc;
}, {});
// { Paris: [Alice, Clara], Lyon: [Bob], Nantes: [David] }

// Construire un index par id
const index = users.reduce((acc, u) => {
  acc[u.id] = u;
  return acc;
}, {});
// { 1: Alice, 2: Bob, 3: Clara, 4: David }
// → Accès O(1) : index[3] → Clara
```

> **Toujours fournir la valeur initiale** (2e argument de `reduce`).
> Sans elle, le premier élément devient l'accumulateur — source de bugs.

---

## 5. `find` & `findIndex` — Trouver un élément

```js
// find → retourne l'élément (ou undefined)
const alice = users.find((u) => u.id === 1);
// { id: 1, nom: "Alice", ... }

const inconnu = users.find((u) => u.id === 99);
// undefined

// findIndex → retourne l'index (ou -1)
const idx = users.findIndex((u) => u.id === 3);
// 2

// Utilisation classique : mise à jour d'un élément dans un state React
const updated = users.map((u) =>
  u.id === 3 ? { ...u, actif: false } : u
);
```

---

## 6. `some` & `every` — Tester des conditions

```js
// some → true si AU MOINS UN élément passe le test
const aDesInactifs = users.some((u) => !u.actif);   // true
const aDesRiches   = users.some((u) => u.salaire > 5000); // false

// every → true si TOUS les éléments passent le test
const tousActifs   = users.every((u) => u.actif);   // false
const tousMajeurs  = users.every((u) => u.age >= 18); // true
```

---

## 7. `sort` — Trier

> ⚠️ `sort` **mute** le tableau original. Toujours trier une copie.

```js
// ❌ Mute l'original
users.sort((a, b) => a.age - b.age);

// ✅ Trier une copie
const parAge = [...users].sort((a, b) => a.age - b.age);
// [Bob(25), David(28), Alice(30), Clara(35)]

// Par nom alphabétique
const parNom = [...users].sort((a, b) => a.nom.localeCompare(b.nom));
// [Alice, Bob, Clara, David]

// Par salaire décroissant
const parSalaireDesc = [...users].sort((a, b) => b.salaire - a.salaire);
// [Clara(4100), David(3600), Alice(3200), Bob(2800)]
```

---

## 8. `flat` & `flatMap` — Aplatir des tableaux

```js
const nested = [[1, 2], [3, 4], [5]];

nested.flat();        // [1, 2, 3, 4, 5]
nested.flat(2);       // profondeur 2 : [[1,[2]]] → [1, 2]

// flatMap = map + flat(1) en une passe (plus performant)
const phrases = ["Alice Bob", "Clara David"];
phrases.flatMap((p) => p.split(" "));
// ["Alice", "Bob", "Clara", "David"]

// Cas d'usage : tableau d'objets avec sous-tableaux
const commandes = [
  { user: "Alice", produits: ["Livre", "Stylo"] },
  { user: "Bob",   produits: ["Cahier"] },
];
const tousLesProduits = commandes.flatMap((c) => c.produits);
// ["Livre", "Stylo", "Cahier"]
```

---

## 9. Tableau récapitulatif

| Méthode      | Retourne          | Mute l'original | Usage principal                        |
|--------------|-------------------|-----------------|----------------------------------------|
| `forEach`    | `undefined`       | Non             | Effets de bord (log, DOM, API)         |
| `map`        | Nouveau tableau   | Non             | Transformer chaque élément             |
| `filter`     | Nouveau tableau   | Non             | Garder certains éléments               |
| `reduce`     | Valeur unique     | Non             | Agréger, grouper, indexer              |
| `find`       | Élément / `undefined` | Non         | Premier élément correspondant          |
| `findIndex`  | Index / `-1`      | Non             | Position du premier élément            |
| `some`       | `boolean`         | Non             | Au moins un élément vérifie            |
| `every`      | `boolean`         | Non             | Tous les éléments vérifient            |
| `sort`       | Tableau trié      | **Oui ⚠️**      | Trier (toujours copier avant)          |
| `flat`       | Nouveau tableau   | Non             | Aplatir des tableaux imbriqués         |
| `flatMap`    | Nouveau tableau   | Non             | map + flat en une passe                |

---

## 10. Patterns avancés en React

### Recherche en temps réel

```jsx
function SearchableList({ users }) {
  const [query, setQuery] = useState("");

  const filtered = users.filter((u) =>
    u.nom.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher..." />
      <ul>
        {filtered.map((u) => <li key={u.id}>{u.nom}</li>)}
      </ul>
    </>
  );
}
```

### Tri dynamique

```jsx
function SortableTable({ users }) {
  const [sortKey, setSortKey]   = useState("nom");
  const [sortDir, setSortDir]   = useState("asc");

  const sorted = [...users].sort((a, b) => {
    const val = typeof a[sortKey] === "string"
      ? a[sortKey].localeCompare(b[sortKey])
      : a[sortKey] - b[sortKey];
    return sortDir === "asc" ? val : -val;
  });

  const toggle = (key) => {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setSortDir("asc"); }
  };

  return (
    <table>
      <thead>
        <tr>
          {["nom", "age", "salaire"].map((col) => (
            <th key={col} onClick={() => toggle(col)} style={{ cursor: "pointer" }}>
              {col} {sortKey === col ? (sortDir === "asc" ? "↑" : "↓") : ""}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sorted.map((u) => (
          <tr key={u.id}>
            <td>{u.nom}</td><td>{u.age}</td><td>{u.salaire}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

### Statistiques avec `reduce`

```jsx
function Stats({ users }) {
  const stats = users.reduce(
    (acc, u) => ({
      total:  acc.total + 1,
      actifs: acc.actifs + (u.actif ? 1 : 0),
      salaireMoyen: acc.salaireMoyen + u.salaire,
    }),
    { total: 0, actifs: 0, salaireMoyen: 0 }
  );

  return (
    <div>
      <p>Total : {stats.total}</p>
      <p>Actifs : {stats.actifs}</p>
      <p>Salaire moyen : {(stats.salaireMoyen / stats.total).toFixed(0)} €</p>
    </div>
  );
}
```

---

## 11. Pièges courants

```js
// ❌ Oublier le return dans map
users.map((u) => { u.nom }); // [undefined, undefined, ...]
users.map((u) => ({ nom: u.nom })); // ✅ parenthèses pour les objets

// ❌ sort sans comparateur (trie par string par défaut !)
[10, 2, 21].sort();         // [10, 2, 21] → ordre lexicographique !
[10, 2, 21].sort((a,b) => a - b); // ✅ [2, 10, 21]

// ❌ reduce sans valeur initiale
[].reduce((acc, x) => acc + x); // TypeError: Reduce of empty array

// ❌ Utiliser forEach quand on a besoin du résultat
const doubled = [];
[1,2,3].forEach((x) => doubled.push(x * 2)); // verbeux
const doubled2 = [1,2,3].map((x) => x * 2);  // ✅ idiomatique

// ❌ Muter le state React directement
state.items.push(newItem);           // ❌
setState([...state.items, newItem]); // ✅
```

---

## Ressources

- [MDN — Array methods](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [JavaScript.info — Array methods](https://javascript.info/array-methods)
- [React — Rendering Lists](https://react.dev/learn/rendering-lists)
