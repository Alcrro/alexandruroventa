# Certificates

## PRD

Pagina `/certificates` afișează certificările obținute cu filtrare, paginare și vizualizare detaliată.

- Grilă de certificate cu filtrare după organizație și limbaj
- Filtrare via query params (URL bookmarkabil și shared)
- Paginare funcțională
- Număr total certificate afișat în header
- Loading state (skeleton cards) în timp ce se fetch-uiește
- Click pe certificat → modal pe desktop / pagină dedicată pe mobile (intercept route)
- Imagini cu blur placeholder

---

## Tech Spec

### Fișiere

```
src/features/certificates/
├── CertificatesView.tsx        # Grilă + header cu count
├── CertificatesFilter.tsx      # Butoane filtru — "use client", useRouter + useSearchParams
├── CertificateCard.tsx         # Card individual cu blur placeholder
└── certificates.scss

src/app/certificates/
├── page.tsx                    # Server Component — citește searchParams
├── loading.tsx                 # Skeleton grid (Next.js Suspense automat)
├── [slug]/page.tsx             # Pagina full a unui certificat
└── @modal/
    ├── default.tsx
    └── (..)certificates/[slug]/page.tsx  # Modal intercept

src/app/api/certificates/route.ts   # GET cu query params
src/_lib/certificates/getCertificates.ts
src/models/certificates/Certificates.ts
```

### Schema MongoDB

```typescript
{
  organization: String,       // ex: "Udemy", "Coursera"
  languageLearnt: String,     // ex: "React", "TypeScript"
  author: [String],
  date: Date,
  src: String,                // URL imagine certificat
  slug: String,
}
```

### URL-uri filtrare (query params)

```
/certificates                              → toate, ordine default
/certificates?org=Udemy                    → după organizație
/certificates?lang=React                   → după limbaj
/certificates?sort=date&order=desc         → sortare
/certificates?org=Udemy&sort=date&page=2   → combinat + paginare
```

### Cum funcționează

1. `page.tsx` (Server Component) citește `searchParams` → `getCertificates({ org, lang, sort, order, page })`
2. `CertificatesFilter` (Client Component) folosește `useRouter + useSearchParams` → actualizează URL fără reload
3. `loading.tsx` afișat automat de Next.js în timpul fetch-ului
4. Click certificat → intercept route `@modal` pe desktop → modal; direct URL → pagina full

### Actualizare filtru (client)

```typescript
function setFilter(key: string, value: string) {
  const params = new URLSearchParams(searchParams.toString());
  params.set(key, value);
  params.delete("page");
  router.push(`/certificates?${params.toString()}`);
}
```

### Response API structurat

```typescript
interface CertificatesResponse {
  data: iCertificate[];
  totalDocuments: number;
  page: number;
  documentsPerPage: number;
}
```

### Skeleton loading

```tsx
// loading.tsx
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

---

## TODO

- [ ] Filtrare cu query params — șterge structura `filter/` cu parallel routes complexe
- [ ] Șterge `layout.tsx` cu slot `@filter` (nu mai e necesar)
- [ ] Înlocuiește API route `[...filters]/` cu endpoint unic `/api/certificates` + query params
- [ ] `CertificatesFilter.tsx` — Client Component cu `useRouter + useSearchParams`
- [ ] Afișare număr total certificate în header
- [ ] `loading.tsx` cu skeleton cards (animație CSS pulse)
- [ ] `placeholder="blur"` + `blurDataURL` static pe imaginile certificatelor
- [ ] Fix `alt` text: `"${organization} — ${languageLearnt}"` în loc de `"certificate"`
- [ ] Fix anti-pattern `flatMap` cu `&` bitwise — extracție directă din response structurat
- [ ] Return type explicit pe `getCertificates.ts` (elimină `any`)
- [ ] Șterge: `Search.tsx`, componentele `order/` (5 fișiere), `[...filters]/route.ts`
