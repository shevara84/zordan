# 🎭 Playwright Automation Project

<!-- BEDŽEVI KOJI POKAZUJU STATUS TESTOVA UŽIVO -->
[![Playwright Tests](https://github.com)](https://github.com)
[![GitHub Pages Deployment](https://shields.io)](https://github.io)

Ovaj repozitorijum sadrži automatizovane E2E (End-to-End) testove napisane u **Playwright** framework-u uz korišćenje **TypeScript**-a i **Page Object Model (POM)** arhitekture.

---

## 📊 Live Izveštaj sa Testiranja
Najnovije rezultate izvršavanja testova na CI/CD pajplajnu možete pogledati uživo u svakom trenutku klikom na link ispod:

👉 **[POGLEDAJ PLAYWRIGHT HTML IZVEŠTAJ](https://github.io)** *(Uvek prikazuje rezultate poslednjeg pokretanja)*

---

## 🛠️ Tehnologije i Prakse
- **Playwright** - Alat za automatizaciju pretraživača
- **TypeScript** - Tipizirani JavaScript za stabilniji kod
- **Page Object Model (POM)** - Arhitektura za lakše održavanje koda
- **Data-Driven Testing (DDT)** - Pokretanje istih testova sa različitim setovima podataka
- **GitHub Actions** - Automatizovani CI/CD pajplajn sa 2 paralelna workera i automatskim generisanjem HTML izveštaja

---

## 💻 Lokalno Pokretanje Projekta

Pratite ove korake da biste pokrenuli testove lokalno na vašem računaru:

### 1. Kloniranje repozitorijuma
```bash
git clone https://github.com
cd zordan
```

### 2. Instalacija zavisnosti i pretraživača
```bash
npm ci
npx playwright install --with-deps
```

### 3. Podešavanje Environment varijabli
Kreirajte `.env` fajl u korenu projekta i dodajte vaše kredencijale (ovaj fajl je ignorisan na Git-u):
```env
EMAIL=tvoj_email@gmail.com
PASSWORD=tvoja_lozinka123
```

### 4. Pokretanje testova
```bash
# Pokretanje svih testova u "headless" modu (u pozadini)
npx playwright test

# Pokretanje sa otvaranjem interfejsa (UI mode)
npx playwright test --ui

# Pokretanje specifičnog test fajla
npx playwright test tests/product-search.spec.ts
```

### 5. Otvaranje izveštaja lokalno
Nakon što se testovi završe, lokalni HTML izveštaj možete otvoriti komandom:
```bash
npx playwright show-report
```

---

## 🚀 CI/CD i Git Workflow
Projekt prati striktna pravila continuous integration-a:
1. Svaki novi feature ili popravka se radi na posebnoj grani.
2. Otvaranjem **Pull Request (PR)**-a automatski se pokreće GitHub Actions workflow.
3. Testovi se vrte u **2 paralelna workera** radi brzine i efikasnosti.
4. Nakon uspešnog/palog run-a, workflow generiše i ažurira **GitHub Pages** sajt sa svežim izveštajem.
