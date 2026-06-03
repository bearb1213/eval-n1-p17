% Cheat Sheet Map en JavaScript

## Vue rapide
`Map` stocke des paires cle -> valeur. Les cles peuvent etre n importe quel type (objet, fonction, etc.).

## Creer un Map
```js
const map = new Map();

const map2 = new Map([
	["id", 123],
	["name", "Sam"],
]);
```

## Ajouter et modifier
```js
const map = new Map();

map.set("a", 1);
map.set("b", 2);
map.set("a", 3); // remplace la valeur
```

## Lire
```js
const map = new Map([
	["a", 1],
	["b", 2],
]);

const value = map.get("a");
const exists = map.has("b");
const size = map.size;
```

## Supprimer
```js
const map = new Map([
	["a", 1],
	["b", 2],
]);

map.delete("a");
map.clear();
```

## Iterer
```js
const map = new Map([
	["a", 1],
	["b", 2],
]);

for (const [key, value] of map) {
	console.log(key, value);
}

map.forEach((value, key) => {
	console.log(key, value);
});
```

## Keys, values, entries
```js
const map = new Map([
	["a", 1],
	["b", 2],
]);

const keys = [...map.keys()];
const values = [...map.values()];
const entries = [...map.entries()];
```

## Convertir Map <-> Object

### Map vers Object
```js
const map = new Map([
	["a", 1],
	["b", 2],
]);

const obj = Object.fromEntries(map);
```

### Object vers Map
```js
const obj = { a: 1, b: 2 };
const map = new Map(Object.entries(obj));
```

## Comparaison avec Object
- Ordre garanti: Map conserve l ordre d insertion.
- Cles de tout type: pas uniquement string ou symbol.
- Taille directe: `map.size`.
- Iteration simple avec `for...of`.

## Cles par reference
```js
const key = { id: 1 };
const map = new Map();

map.set(key, "value");
console.log(map.get({ id: 1 })); // undefined
console.log(map.get(key)); // "value"
```

## Pattern utiles

### Compter les occurrences
```js
const items = ["a", "b", "a", "c", "b", "a"];
const counts = new Map();

for (const item of items) {
	counts.set(item, (counts.get(item) ?? 0) + 1);
}
```

### Memoisation simple
```js
const cache = new Map();

function getUser(id) {
	if (cache.has(id)) return cache.get(id);
	const user = { id, name: "User " + id };
	cache.set(id, user);
	return user;
}
```

## Erreurs courantes
- `Map` n utilise pas la notation point: `map.key` ne marche pas.
- `Map` compare les cles par reference, pas par valeur.

## Raccourcis a retenir
- `new Map()`
- `map.set(key, value)`
- `map.get(key)`
- `map.has(key)`
- `map.delete(key)`
- `map.clear()`
- `map.size`
