% Documentation Date en JavaScript

## Introduction
L objet `Date` de JavaScript permet de manipuler les dates et les heures. Il fonctionne avec un horodatage en millisecondes depuis le 1 janvier 1970 a 00:00:00 UTC (epoch).

## Creer une date

### Date courante
```js
const now = new Date();
```

### Avec une chaine ISO
```js
const d1 = new Date("2026-05-25T14:30:00Z");
```

### Avec des composantes (annee, mois, jour, etc.)
```js
// Mois = 0 a 11 (0 = janvier)
const d2 = new Date(2026, 4, 25, 16, 45, 0); // 25 mai 2026, 16:45
```

### Avec un timestamp (millisecondes)
```js
const d3 = new Date(1716640000000);
```

## Lire une date (getters)
```js
const d = new Date();

const year = d.getFullYear();
const month = d.getMonth(); // 0-11
const day = d.getDate(); // 1-31
const hours = d.getHours(); // 0-23
const minutes = d.getMinutes();
const seconds = d.getSeconds();
const ms = d.getMilliseconds();
const weekDay = d.getDay(); // 0-6 (0 = dimanche)
```

### Version UTC
```js
const utcYear = d.getUTCFullYear();
const utcMonth = d.getUTCMonth();
const utcDay = d.getUTCDate();
```

## Modifier une date (setters)
```js
const d = new Date();

d.setFullYear(2026);
d.setMonth(4); // mai
d.setDate(25);
d.setHours(10, 30, 0, 0);
```

## Comparer des dates
```js
const a = new Date("2026-01-01");
const b = new Date("2026-12-31");

if (a < b) {
	// a est avant b
}
```

### Comparer par timestamp
```js
const a = new Date("2026-01-01");
const b = new Date("2026-12-31");

const same = a.getTime() === b.getTime();
const isBefore = a.getTime() < b.getTime();
const isAfter = a.getTime() > b.getTime();
```

### Verifier une date valide
```js
const d = new Date("not-a-date");
const isValid = !Number.isNaN(d.getTime());
```

## Calculer une difference
```js
const start = new Date("2026-05-01");
const end = new Date("2026-05-25");

const diffMs = end - start; // difference en ms
const diffDays = diffMs / (1000 * 60 * 60 * 24);
```

## Addition et soustraction

### Ajouter des jours
```js
function addDays(date, days) {
	const copy = new Date(date.getTime());
	copy.setDate(copy.getDate() + days);
	return copy;
}

const base = new Date("2026-05-25");
const plus7 = addDays(base, 7);
```

### Ajouter des heures
```js
function addHours(date, hours) {
	const copy = new Date(date.getTime());
	copy.setHours(copy.getHours() + hours);
	return copy;
}
```

### Soustraire des jours
```js
const d = new Date("2026-05-25");
d.setDate(d.getDate() - 3);
```

## Formater une date

### ISO
```js
const d = new Date();
const iso = d.toISOString();
```

### Chaine courte
```js
const d = new Date();
const short = d.toDateString();
```

### Chaine complete
```js
const d = new Date();
const full = d.toString();
```

### Date locale + heure locale
```js
const d = new Date();
const local = d.toLocaleString("fr-FR", {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "2-digit",
	hour: "2-digit",
	minute: "2-digit",
});
```

### Locale
```js
const d = new Date();
const fr = d.toLocaleDateString("fr-FR", {
	weekday: "long",
	year: "numeric",
	month: "long",
	day: "2-digit",
});
```

### Heure locale
```js
const d = new Date();
const time = d.toLocaleTimeString("fr-FR", {
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
});
```

## Transformations en string (resume)
- `toISOString()` : format ISO, pratique pour l API et le stockage.
- `toString()` : format complet, depend du navigateur.
- `toDateString()` : date uniquement.
- `toTimeString()` : heure uniquement.
- `toLocaleDateString()` : date localisee.
- `toLocaleTimeString()` : heure localisee.
- `toLocaleString()` : date + heure localisees.

## Autres fonctions utiles

### Timestamp
```js
const nowMs = Date.now();
const d = new Date();
const ms = d.getTime();
```

### Convertir en UTC
```js
const d = new Date();
const utc = d.toUTCString();
```

### Parse rapide
```js
const ms = Date.parse("2026-05-25T08:00:00Z");
const d = new Date(ms);
```

### Debut et fin de journee
```js
function startOfDay(date) {
	const copy = new Date(date.getTime());
	copy.setHours(0, 0, 0, 0);
	return copy;
}

function endOfDay(date) {
	const copy = new Date(date.getTime());
	copy.setHours(23, 59, 59, 999);
	return copy;
}
```

## Parsing et fuseaux horaires
- Les chaines ISO avec `Z` sont interpretees en UTC.
- Les chaines sans fuseau sont interpretees en heure locale.
- Les calculs de difference doivent se faire en millisecondes.

## Bonnes pratiques
- Utiliser `toISOString()` pour stocker ou echanger des dates.
- Pour les interfaces, preferer `toLocaleDateString()`.
- Attention au mois : `getMonth()` et `setMonth()` utilisent 0-11.

## Exemple complet
```js
function addDays(date, days) {
	const copy = new Date(date.getTime());
	copy.setDate(copy.getDate() + days);
	return copy;
}

const base = new Date("2026-05-25T08:00:00Z");
const nextWeek = addDays(base, 7);

console.log(base.toISOString());
console.log(nextWeek.toISOString());
```
