# Contact

## v1 — Starea actuală

### Ce face
Formularul de contact permite vizitatorilor să trimită un email direct. Există în două locuri: pe homepage (ca secțiune) și la `/contact` (pagina dedicată). Există și o versiune modal accesibilă via intercept route `/contact/me`.

### Fișiere implicate

```
src/app/contact/
├── page.tsx                                    # Pagina /contact
└── me/
    └── page.tsx                                # /contact/me (intercept route target)

src/app/@modal/
├── (.)contact/me/
│   └── page.tsx                                # Modal intercept pentru /contact/me
└── default.tsx                                 # Slot default (null)

src/components/home/profile/contact/
├── About.tsx                                   # Secțiunea de contact pe homepage
├── about.scss
├── contactForm/
│   ├── ContactForm.tsx                         # Formular principal (Client Component)
│   ├── contactForm.scss
│   ├── buttonForm/
│   │   ├── ButtonForm.tsx                      # Buton submit cu loading state
│   │   └── buttonForm.scss
│   └── emailTemplate/
│       └── EmailTemplate.tsx                   # Template HTML email

src/app/api/send/
└── route.ts                                    # POST /api/send → trimite email via Resend

src/_lib/
└── send.tsx                                    # Server Action apelat din ContactForm
```

### Cum funcționează

1. `ContactForm.tsx` (Client Component) are:
   - Input `email` cu validare pattern regex
   - `textarea` pentru mesaj
   - Funcție `copiedHandler` → click pe email business → copiază în clipboard + feedback vizual 5s
   - `formHandler` → Server Action care apelează `sendEmail()`
2. `send.tsx` face POST la `/api/send` cu `{ email, textarea }`
3. `/api/send/route.ts` folosește **Resend** pentru a trimite emailul cu `EmailTemplate`
4. `ContactModal` la `/contact/me` folosește intercept route pentru a afișa formularul ca modal

### Probleme cunoscute (v1)

- Nu există feedback vizual de succes/eroare după trimitere (nicio notificare `react-hot-toast`)
- Formularul se resetează cu `ref.current?.reset()` dar nu există confirmare vizuală că emailul a fost trimis
- `isActive` state este setat din formData dar niciodată folosit (`const [isActive, setIsActive] = useState()`)
- Email-ul de business (`business@alexandru-roventa.ro`) este hardcodat în componentă
- Nu există rate limiting pe `/api/send` — vulnerabil la spam
- `EmailTemplate.tsx` nu este vizualizabil fără a trimite un email real
- Același `ContactForm` este folosit atât în homepage cât și în pagina dedicată — OK, dar logica de resetare e duplicată

### Idei v2

- [ ] Feedback toast după trimitere (succes/eroare) cu `react-hot-toast`
- [ ] Rate limiting pe `/api/send` (ex: 1 email per IP per 10 minute)
- [ ] Honeypot field anti-spam
- [ ] Email-ul de contact configurat din env vars, nu hardcodat
- [ ] Validare mai robustă (lungime minimă textarea, sanitizare input)
- [ ] Preview template email în development
- [ ] Loading state pe butonul de submit în timpul trimiterii
