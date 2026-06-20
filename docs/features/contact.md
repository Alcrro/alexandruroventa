# Contact

## PRD

Formular de contact accesibil din orice pagină, care trimite email direct via Resend.

- Câmpuri: email + mesaj (textarea)
- Feedback vizual clar după trimitere: toast succes sau eroare
- Loading state pe butonul submit în timpul trimiterii
- Protecție anti-spam: rate limiting + honeypot
- Accesibil ca modal pe desktop via intercept route `/contact/me`
- Validare input: format email, lungime minimă mesaj

---

## Tech Spec

### Fișiere

```
src/features/contact/
├── ContactForm.tsx             # Formular principal — "use client"
├── ButtonForm.tsx              # Buton submit cu loading state
├── EmailTemplate.tsx           # Template HTML email (Resend)
└── contact.scss

src/app/contact/
├── page.tsx                    # Pagina /contact
└── me/page.tsx                 # Target pentru intercept route

src/app/@modal/(.)contact/me/page.tsx   # Modal intercept
src/app/default.tsx                     # Fallback slot @modal

src/app/api/send/route.ts       # POST /api/send → Resend
src/_lib/send.tsx               # Server Action apelat din ContactForm
```

### Cum funcționează

1. `ContactForm` (Client Component) gestionează state: email, mesaj, loading, eroare
2. Submit → Server Action `sendEmail()` → POST `/api/send` → Resend API
3. Response: toast succes (`react-hot-toast`) sau toast eroare cu mesajul primit
4. Pe `/contact/me` → intercept route → modal pe desktop; acces direct → pagina full

### Anti-spam

```typescript
// rate limiting: 1 email per IP per 10 minute
// honeypot: câmp hidden "website" — dacă e completat, request ignorat silențios
```

### Variabile de mediu

```
RESEND_API_KEY              # API key Resend
CONTACT_EMAIL               # email destinatar (fallback: alexandru@alexandru-roventa.ro)
```

---

## TODO

- [x] Toast feedback după trimitere: succes / eroare (`react-hot-toast`)
- [x] Loading state pe butonul submit (`isPending`, buton disabled în timpul trimiterii)
- [x] Rate limiting pe `/api/send` (1 email per IP per 10 minute)
- [x] Honeypot field anti-spam (câmp hidden ignorat la spam bots)
- [x] Email destinatar din env var (`process.env.CONTACT_EMAIL`), nu hardcodat
- [x] Validare robustă: lungime minimă textarea (min 10 caractere), sanitizare input
- [x] Fix: `isActive` state setat din formData dar niciodată folosit — șters
