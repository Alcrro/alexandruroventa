# Home & Profile

## v1 — Starea actuală

### Ce face
Homepage-ul (`/`) afișează două secțiuni: **Profile** (imagine, info contact, social links) și **About Me** (text descriptiv despre Alexandru Roventa).

### Fișiere implicate

```
src/app/
└── page.tsx                            # Homepage root

src/components/home/
├── profile/
│   ├── Profile.tsx                     # Container profil
│   ├── profileImage/
│   │   ├── ProfileImage.tsx            # Imaginea de profil (eu.png)
│   │   └── profile.scss
│   ├── contact/
│   │   ├── About.tsx                   # Secțiunea de info contact
│   │   ├── about.scss
│   │   └── contactForm/
│   │       ├── ContactForm.tsx         # Formular contact (refolosit și în /contact)
│   │       ├── contactForm.scss
│   │       ├── buttonForm/
│   │       │   ├── ButtonForm.tsx
│   │       │   └── buttonForm.scss
│   │       └── emailTemplate/
│   │           └── EmailTemplate.tsx   # Template HTML pentru email
│   └── social/
│       ├── Social.tsx                  # Link-uri social media
│       └── social.scss
├── aboutMe/
│   ├── AboutMe.tsx                     # Container about me
│   ├── AboutMeContent.tsx              # Text despre Alexandru (hardcodat)
│   └── aboutMe.scss
├── ProfileDescription.tsx              # (unused / nefolosit aparent)
└── spacing/
    ├── Spacing.tsx
    └── spacing.scss
```

### Cum funcționează

- `page.tsx` randează `<Profile />` și `<AboutMe />`
- `Profile` conține imaginea (`eu.png` din `/public`), info de contact și link-uri sociale
- `AboutMeContent` afișează 4 paragrafe hardcodate despre parcursul profesional
- `AboutMeContent` folosește `usePathname()` pentru a aplica clase diferite când e randat pe `/about/me` (modal intercept) vs homepage

### Probleme cunoscute (v1)

- Textul "About Me" este hardcodat în componentă — nu poate fi editat fără a modifica codul
- `ProfileDescription.tsx` există dar nu este importat nicăieri (dead code)
- Imaginea de profil (`eu.png`) nu are `priority` prop pe `<Image>` → warning LCP
- Nu există animații la intrarea în pagină
- Metadata SEO: titlul este generic (`"Alexandru Roventa - Home"`, description `"Home"`)
- Social media afișează doar LinkedIn

---

## v2 — Plan

### Ce se schimbă față de v1

| | v1 | v2 |
|---|---|---|
| Layout hero | Imagine + text fără ierarhie clară | Titlu, rol, 2 butoane CTA structurate |
| Animații | Nicio animație | Framer Motion fade-in + slide-up |
| Social links | Doar LinkedIn | LinkedIn + GitHub |
| SEO / metadata | Title generic, description `"Home"` | Open Graph complet |
| LCP | Warning — `<Image>` fără `priority` | Fix cu `priority` prop |
| Dead code | `ProfileDescription.tsx` nefolosit | Eliminat |

---

### 1. Hero section restructurată

**Problema în v1:** Pagina de home nu are o ierarhie vizuală clară. Utilizatorul nu înțelege imediat cine ești și ce faci — nu există un titlu proeminent, un rol profesional sau un call-to-action.

**Soluție v2:** Restructurare vizuală cu o secțiune hero care comunică rapid informația esențială.

**Layout propus (desktop):**
```
┌─────────────────────────────────────────┐
│  [Imagine profil]   Alexandru Roventa   │
│                     Full Stack Developer│
│                                         │
│                     [Contact] [Projects]│
└─────────────────────────────────────────┘
```

**Layout propus (mobile):** stacked vertical — imagine centrată → titlu → subtitlu → butoane.

**Conținut hero:**
- Titlu H1: `Alexandru Roventa`
- Subtitlu / rol: `Full Stack Developer` (sau textul preferat)
- Buton CTA primar: `Get in touch` → link `/contact`
- Buton CTA secundar: `See my projects` → link `/projects`

**Fișiere modificate:**
- `src/components/home/profile/Profile.tsx` — restructurare layout
- `src/components/home/profile/profileImage/ProfileImage.tsx` — ajustare dimensiuni/poziție
- `src/components/home/profile/contact/About.tsx` — titlu H1 + rol în loc de layout actual
- `src/components/home/profile/social/Social.tsx` — adaugă butoane CTA lângă social links

**Fișiere eliminate:**
- `src/components/home/spacing/Spacing.tsx` și `spacing.scss` — spacing controlat prin Tailwind classes, nu componentă separată

---

### 2. Animații Framer Motion

**Problema în v1:** Framer Motion este instalat (`"framer-motion": "^11.2.10"`) dar nu este folosit nicăieri. Pagina apare static, fără tranziții.

**Soluție v2:** Animații de intrare pe hero și pe secțiunea About Me.

**Hero — stagger la intrare (elementele apar unul după altul):**
```typescript
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};
```

Ordinea de apariție: imagine → titlu → rol → butoane CTA → social links

**About Me — apare la scroll (viewport trigger):**
```typescript
<motion.div
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
```

`viewport={{ once: true }}` — animația se joacă o singură dată, nu de fiecare dată când scrollezi.

**Fișiere modificate:**
- `src/components/home/profile/Profile.tsx` — devine Client Component (`"use client"`), adaugă `motion.div` cu `containerVariants`
- `src/components/home/profile/profileImage/ProfileImage.tsx` — wrappat în `motion.div` cu `itemVariants`
- `src/components/home/profile/contact/About.tsx` — elemente wrappate în `motion.div`
- `src/components/home/aboutMe/AboutMe.tsx` — `whileInView` animation

**Notă:** Componentele care primesc animații trebuie să fie Client Components (`"use client"`). Datele pot rămâne fetch-uite în Server Components parinte și pasate ca props.

---

### 3. Social links extinse + Open Graph metadata

#### Social links

**Problema în v1:** Un singur link social (LinkedIn), fără GitHub.

**Soluție v2:** Adaugă GitHub. Linkurile sunt definite într-un array în `Social.tsx` pentru a fi ușor de extins ulterior.

```typescript
const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/alexandru-roventa/",
    icon: "bi-linkedin",
  },
  {
    label: "GitHub",
    href: "https://github.com/Alcrro",
    icon: "bi-github",
  },
];
```

**Fișiere modificate:**
- `src/components/home/profile/social/Social.tsx` — array de linkuri + map în loc de hardcodat
- `src/components/home/profile/social/social.scss` — stiluri pentru icon-urile noi

#### Open Graph metadata

**Problema în v1:** Metadata din `layout.tsx` este complet generică:
```typescript
{ title: "Alexandru Roventa - Home", description: "Home" }
```
Când pagina e distribuită pe LinkedIn/Twitter/WhatsApp, nu apare nicio imagine și descrierea e `"Home"`.

**Soluție v2:** Metadata completă în `src/app/page.tsx`:

```typescript
export const metadata: Metadata = {
  title: "Alexandru Roventa — Full Stack Developer",
  description: "Portfolio personal — Full Stack Developer cu experiență în Next.js, React, MongoDB și TypeScript.",
  openGraph: {
    title: "Alexandru Roventa — Full Stack Developer",
    description: "Portfolio personal — Full Stack Developer cu experiență în Next.js, React, MongoDB și TypeScript.",
    url: "https://alexandru-roventa.ro",
    siteName: "Alexandru Roventa",
    images: [
      {
        url: "/og-image.png",   // imagine 1200x630 adăugată în /public
        width: 1200,
        height: 630,
        alt: "Alexandru Roventa — Full Stack Developer",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alexandru Roventa — Full Stack Developer",
    description: "Portfolio personal — Full Stack Developer.",
    images: ["/og-image.png"],
  },
};
```

**Fișiere modificate:**
- `src/app/page.tsx` — adaugă export `metadata` complet
- `src/app/layout.tsx` — metadata din layout devine fallback generic, nu mai zice `description: "Home"`

**Fișiere noi:**
- `public/og-image.png` — imagine Open Graph (1200×630px), creat manual

---

### 4. Curățenie cod + LCP fix

#### Fix LCP — `priority` pe imagine de profil

**Problema în v1:** `<Image>` în `ProfileImage.tsx` nu are prop `priority`. Next.js afișează warning în consolă și imaginea de profil (care e cel mai mare element vizibil la încărcare — LCP) este încărcată lazy în loc de eager.

**Fix:**
```tsx
// ProfileImage.tsx
<Image
  src="/eu.png"
  alt="Alexandru Roventa"
  width={200}
  height={200}
  priority          // ← adăugat
/>
```

**Fișiere modificate:**
- `src/components/home/profile/profileImage/ProfileImage.tsx`

#### Elimină dead code

**`ProfileDescription.tsx`** — componentă care există în `src/components/home/` dar nu este importată nicăieri. Se șterge.

**`AboutMeContent.tsx` — simplifică logica `usePathname()`**

În v1 componenta detectează cu `usePathname()` dacă e randată în modal sau pe homepage și aplică clase diferite. Asta e confuz și fragil.

În v2: `AboutMeContent` primește o prop opțională `variant`:
```typescript
// în loc de usePathname() intern
export default function AboutMeContent({ variant = "main" }: { variant?: "main" | "modal" }) {
  return (
    <div className={`content ${variant === "modal" ? "second-layer" : "main-layer"}`}>
      ...
    </div>
  );
}
```

Caller-ul decide varianta, nu componenta singură.

**Fișiere eliminate:**
- `src/components/home/ProfileDescription.tsx`
- `src/components/home/spacing/Spacing.tsx`
- `src/components/home/spacing/spacing.scss`

**Fișiere modificate:**
- `src/components/home/aboutMe/AboutMeContent.tsx` — prop `variant` în loc de `usePathname()`
- Orice componentă care folosea `<Spacing />` — înlocuiește cu `className="py-X"` Tailwind

---

### Fișiere afectate în total (v2)

| Fișier | Acțiune |
|---|---|
| `src/app/page.tsx` | Modificat — adaugă `metadata` Open Graph |
| `src/app/layout.tsx` | Modificat — metadata fallback corectă |
| `src/components/home/profile/Profile.tsx` | Modificat — layout hero + Framer Motion |
| `src/components/home/profile/profileImage/ProfileImage.tsx` | Modificat — `priority` prop |
| `src/components/home/profile/contact/About.tsx` | Modificat — titlu H1 + rol + CTA buttons |
| `src/components/home/profile/social/Social.tsx` | Modificat — array links + GitHub |
| `src/components/home/profile/social/social.scss` | Modificat |
| `src/components/home/aboutMe/AboutMe.tsx` | Modificat — `whileInView` animation |
| `src/components/home/aboutMe/AboutMeContent.tsx` | Modificat — prop `variant` în loc de `usePathname()` |
| `src/components/home/ProfileDescription.tsx` | **Eliminat** |
| `src/components/home/spacing/Spacing.tsx` | **Eliminat** |
| `src/components/home/spacing/spacing.scss` | **Eliminat** |
| `public/og-image.png` | **Nou** — creat manual (1200×630px) |
