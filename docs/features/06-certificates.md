# Certificates

## v1 — Starea actuală

### Ce face
Pagina `/certificates` afișează certificările obținute, cu paginare, filtrare după organizație/limbaj și un modal pentru vizualizare detaliată. Este una dintre paginile cele mai complexe din aplicație.

### Fișiere implicate

```
src/app/certificates/
├── page.tsx                                    # Lista principală /certificates
├── layout.tsx                                  # Layout cu parallel routes (@modal, @filter)
├── certificates.scss
├── [slug]/
│   └── page.tsx                                # Pagina full a unui certificat
├── @modal/
│   ├── default.tsx                             # Slot default (null)
│   └── (..)certificates/[slug]/
│       └── page.tsx                            # Modal intercept pentru /certificates/[slug]
└── filter/[...filters]/
    ├── layout.tsx
    ├── @filter/page.tsx                        # Slot filtru activ
    └── @main/page.tsx                          # Slot lista filtrată

src/components/certificates/
├── main/
│   ├── Main.tsx                                # Grila de certificate
│   └── certificate.scss
├── filters/
│   ├── Search.tsx                              # Input search/filter
│   └── search.scss
├── modal/
│   ├── Modal.tsx                               # Modal cu detalii certificat
│   └── certificatesModal.scss
└── order/
    ├── Order.tsx                               # Container ordine
    ├── OrderList.tsx                           # Lista opțiuni ordine
    ├── OrderModal.tsx                          # Modal selectare ordine
    ├── CurrentOrder.tsx                        # Afișare ordine curentă
    └── order.scss

src/app/api/certificates/
└── [...filters]/
    └── route.ts                                # GET /api/certificates/[...filters]

src/_lib/certificates/
├── getCertificates.ts                          # fetch() cu filtre
├── getCertificate.ts                           # fetch() certificat singular
└── order/
    └── order.ts                                # Logică sortare

src/models/certificates/
└── Certificates.ts                             # Mongoose schema
```

### Schema MongoDB

```typescript
{
  organization: String,       // ex: "Udemy", "Coursera"
  languageLearnt: String,     // ex: "React", "TypeScript"
  author: [String],           // array de autori
  date: Date,
  src: String,                // URL imagine certificat (Cloudinary / extern)
  slug: String                // URL-friendly identifier
}
```

### Cum funcționează

1. `/certificates` → `Main.tsx` afișează grila de certificate cu paginare
2. Click pe certificat → intercept route cu `@modal` → afișează `Modal.tsx` (fără navigare completă)
3. Acces direct la `/certificates/[slug]` → pagina full a certificatului
4. Filtrare prin `/certificates/filter/[...filters]` cu parallel routes (`@filter` + `@main`)
5. `Order` permite sortare după dată / organizație / etc.
6. Paginare via `Pagination` component

### Probleme cunoscute (v1)

- Structura de rute cu `[...filters]` și parallel routes este foarte complexă de urmărit
- URL-urile de filtrare sunt greu de citit (ex: `/certificates/filter/organization/Udemy/asc`)
- Imaginile certificatelor sunt URL-uri externe — dacă se schimbă, se rup
- Nu există număr total de certificate afișat
- Componentele `flatMap` cu efecte secundare (`& (totalProducts = ...)`) — anti-pattern
- Nu există pagină admin pentru adăugat certificate

---

## v2 — Plan

### Ce se schimbă față de v1

| | v1 | v2 |
|---|---|---|
| Filtrare | URL segments `/filter/organization/Udemy/asc` | Query params `?org=Udemy&sort=desc` |
| Rute | Parallel routes complexe (`@filter`, `@main`) | Pagină unică cu `useSearchParams` |
| Număr certificate | Nu există | Afișat în header ("12 certificates") |
| Loading state | Nimic | Skeleton cards |
| Imagini | Încărcare bruscă | Lazy load cu blur placeholder |
| Logică date | `flatMap` cu efecte secundare | Extracție curată din response |

---

### 1. Filtrare cu query params

**Problema în v1:** Filtrarea se face prin URL segments (`/certificates/filter/organization/Udemy/asc`), ceea ce necesită parallel routes (`@filter`, `@main`) și un sistem complex de parsare manuală. URL-urile sunt greu de citit și de shared.

**Soluție v2:** Query params standard — simplu, lizibil, ușor de bookmarkat.

**URL-uri v2:**
```
/certificates                           → toate, ordine default
/certificates?org=Udemy                 → filtrat după organizație
/certificates?lang=React                → filtrat după limbaj
/certificates?sort=date&order=desc      → sortat după dată descrescător
/certificates?org=Udemy&sort=date       → combinat
?page=2                                 → paginare
```

**Cum funcționează v2:**

`page.tsx` devine un Server Component care citește `searchParams` și le pasează la API:

```typescript
// src/app/certificates/page.tsx
export default async function CertificatesPage({ searchParams }) {
  const { org, lang, sort, order, page } = searchParams;
  const data = await getCertificates({ org, lang, sort, order, page });
  return <CertificatesView data={data} />;
}
```

API route simplificat — un singur endpoint cu query params în loc de `[...filters]`:
```
GET /api/certificates?org=Udemy&sort=date&order=desc&page=1
```

**Structură rute v2 — eliminată complexitatea:**
```
src/app/certificates/
├── page.tsx                    # Server Component — citește searchParams
├── [slug]/
│   └── page.tsx                # Pagina full certificat (neschimbată)
└── @modal/                     # Păstrat — modalul e ok cu intercept routes
    ├── default.tsx
    └── (..)certificates/[slug]/
        └── page.tsx
```

**Eliminat complet:**
```
src/app/certificates/filter/    # Toată această structură dispare
src/app/certificates/layout.tsx # Layout cu parallel routes @filter nu mai e necesar
```

**Filtrele în UI** — `CertificatesFilter.tsx` (Client Component):
```typescript
// folosește useRouter + useSearchParams pentru a actualiza URL-ul
const router = useRouter();
const searchParams = useSearchParams();

function setFilter(key: string, value: string) {
  const params = new URLSearchParams(searchParams.toString());
  params.set(key, value);
  params.delete("page"); // reset paginare la schimbare filtru
  router.push(`/certificates?${params.toString()}`);
}
```

**Fișiere noi:**
- `src/components/certificates/filters/CertificatesFilter.tsx` — Client Component cu butoane filtru
- `src/app/api/certificates/route.ts` — endpoint unic cu query params (înlocuiește `[...filters]`)

**Fișiere modificate:**
- `src/app/certificates/page.tsx` — citește `searchParams`, fără layout cu parallel routes
- `src/_lib/certificates/getCertificates.ts` — construiește query params în loc de URL segments

**Fișiere eliminate:**
- `src/app/certificates/filter/` — toată structura cu parallel routes
- `src/app/certificates/layout.tsx` — layout-ul cu `@filter` slot
- `src/app/api/certificates/[...filters]/route.ts` — înlocuit de endpoint simplu
- `src/components/certificates/filters/Search.tsx` — înlocuit de `CertificatesFilter`
- `src/components/certificates/order/` — logica de ordine integrată în `CertificatesFilter`
- `src/_lib/certificates/order/order.ts`

---

### 2. Număr total + skeleton loading

#### Număr total de certificate

**Problema în v1:** Utilizatorul nu știe câte certificate există în total sau câte sunt filtrate.

**Soluție v2:** Header deasupra grilei cu numărul de certificate:

```tsx
// în CertificatesView.tsx
<div className="certificates-header">
  <h1>Certificates</h1>
  <span className="certificates-count">
    {totalDocuments} {totalDocuments === 1 ? "certificate" : "certificates"}
    {activeFilter && ` for "${activeFilter}"`}
  </span>
</div>
```

`totalDocuments` vine din response-ul API — deja existent în v1 dar neafișat.

#### Skeleton loading

**Problema în v1:** La încărcarea paginii sau la schimbarea filtrului, grila dispare și reapare brusc — niciun indicator vizual de loading.

**Soluție v2:** Skeleton cards afișate în timpul fetch-ului via React `Suspense`.

**Pattern Next.js cu `loading.tsx`:**
```
src/app/certificates/
├── page.tsx
└── loading.tsx             # Afișat automat de Next.js în timpul fetch-ului
```

**`loading.tsx` — skeleton grid:**
```tsx
export default function Loading() {
  return (
    <div className="certificates-skeleton">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="skeleton-card">
          <div className="skeleton-image" />
          <div className="skeleton-line short" />
          <div className="skeleton-line" />
        </div>
      ))}
    </div>
  );
}
```

**Stiluri skeleton** cu animație pulse:
```scss
.skeleton-card {
  .skeleton-image, .skeleton-line {
    background: linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%);
    background-size: 200% 100%;
    animation: skeleton-pulse 1.5s infinite;
    border-radius: 4px;
  }
  .skeleton-image  { height: 200px; margin-bottom: 0.75rem; }
  .skeleton-line   { height: 14px; margin-bottom: 0.5rem; }
  .skeleton-line.short { width: 60%; }
}

@keyframes skeleton-pulse {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

**Dark mode:** culorile skeleton se ajustează via `html.dark` — `#374151` / `#4b5563` în loc de `#e5e7eb` / `#f3f4f6`.

**Fișiere noi:**
- `src/app/certificates/loading.tsx`

**Fișiere modificate:**
- `src/components/certificates/main/certificate.scss` — adaugă stiluri skeleton

---

### 3. Lazy load imagini cu blur placeholder

**Problema în v1:** Imaginile certificatelor (`<Image>`) apar brusc fără nicio tranziție — pe conexiuni lente experiența e proastă.

**Soluție v2:** `placeholder="blur"` pe `<Image>` cu un blur placeholder generat la build time sau un placeholder static base64.

**Opțiunea A — `blurDataURL` static (simplu, fără procesare):**

Un singur placeholder base64 gri de 1×1px refolosit pentru toate certificatele:

```typescript
// src/components/certificates/main/Main.tsx
const BLUR_PLACEHOLDER =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

<Image
  src={certificate.src}
  alt={`${certificate.organization} — ${certificate.languageLearnt}`}
  width={1000}
  height={1000}
  placeholder="blur"
  blurDataURL={BLUR_PLACEHOLDER}
  loading="lazy"
/>
```

**Opțiunea B — blur dinamic per imagine (mai bun vizual, necesită procesare):**

Stochezi în MongoDB un `blurDataURL` pre-generat (10×10px base64) per certificat. Generat o singură dată la adăugarea certificatului.

**Recomandare:** Opțiunea A pentru simplitate. Opțiunea B dacă se adaugă o pagină admin în viitor.

**`alt` text îmbunătățit:** În v1 `alt="certificate"` e generic. În v2: `alt={`${certificate.organization} — ${certificate.languageLearnt}`}` — mai descriptiv și mai bun pentru accesibilitate.

**Fișiere modificate:**
- `src/components/certificates/main/Main.tsx` — adaugă `placeholder`, `blurDataURL`, `alt` corect

---

### 4. Refactorizare flatMap + cod curat

**Problema în v1:** Extracția datelor din response folosește un anti-pattern — efecte secundare în `flatMap`:

```typescript
// v1 — anti-pattern
documents?.flatMap(
  (item: any) =>
    allDocuments.push(item.doc) &
    (totalProducts = item.totalDocuments) &
    (firstPage = item.page) &
    (documentsPerPage = item.documentsPerPage)
);
```

`&` este operatorul bitwise AND — folosit ca separator de efecte secundare. Codul funcționează accidental, nu intenționat.

**Soluție v2:** API returnează un obiect structurat clar, extracție directă:

```typescript
// API response v2
{
  data: Certificate[],
  totalDocuments: number,
  page: number,
  documentsPerPage: number
}

// Extracție v2 — directă, fără efecte secundare
const { data, totalDocuments, page, documentsPerPage } = await getCertificates(params);
```

**`getCertificates.ts` v2** returnează tipul corect, nu `any`:
```typescript
interface CertificatesResponse {
  data: iCertificate[];
  totalDocuments: number;
  page: number;
  documentsPerPage: number;
}

export async function getCertificates(params): Promise<CertificatesResponse>
```

**Tipuri actualizate în `types.ts`:** `iCertificate` rămâne, se adaugă `CertificatesResponse`.

**Fișiere modificate:**
- `src/components/certificates/main/Main.tsx` — elimină `flatMap` cu efecte secundare
- `src/_lib/certificates/getCertificates.ts` — return type explicit
- `src/app/api/certificates/route.ts` — response structurat clar
- `src/types.ts` — adaugă `CertificatesResponse`

---

### Fișiere afectate în total (v2)

| Fișier | Acțiune |
|---|---|
| `src/app/certificates/page.tsx` | Modificat — `searchParams`, fără layout parallel |
| `src/app/certificates/loading.tsx` | **Nou** — skeleton grid |
| `src/app/api/certificates/route.ts` | **Nou** — endpoint unic cu query params |
| `src/components/certificates/filters/CertificatesFilter.tsx` | **Nou** — Client Component filtru |
| `src/components/certificates/main/Main.tsx` | Modificat — blur placeholder, alt corect, fără `flatMap` |
| `src/components/certificates/main/certificate.scss` | Modificat — stiluri skeleton |
| `src/_lib/certificates/getCertificates.ts` | Modificat — query params, return type |
| `src/types.ts` | Modificat — adaugă `CertificatesResponse` |
| `src/app/certificates/layout.tsx` | **Eliminat** |
| `src/app/certificates/filter/` | **Eliminat** (toată structura) |
| `src/app/api/certificates/[...filters]/route.ts` | **Eliminat** |
| `src/components/certificates/filters/Search.tsx` | **Eliminat** |
| `src/components/certificates/order/` | **Eliminat** (5 fișiere) |
| `src/_lib/certificates/order/order.ts` | **Eliminat** |
