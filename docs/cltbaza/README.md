
---

### 🚀 **Lokalne uruchomienie backendu (FastAPI)**

1. Wymagania: Python 3.9+, `pip install fastapi uvicorn`
2. Uruchom backend (np. Thermal Bridges):

    ```bash
    cd cltbaza/backend
    uvicorn thermal_bridges_api:app --reload --port 8000
    ```

3. API będzie dostępne pod `http://localhost:8000/docs`

---

### 🌐 **Frontend (React/Next.js)**
1. Skopiuj pliki z `cltbaza/frontend` do swojego projektu React/Next.js
2. Importuj jako komponent (np. `<ThermalBridgesCalc />`)
3. Edytuj endpoint API jeśli uruchamiasz backend lokalnie (np. zamień `/api/...` na `http://localhost:8000/api/...`)

---

### ☁️ **Wdrożenie na Netlify**
1. Załóż konto na Netlify i połącz repozytorium GitHub (np. całość katalogu cltbaza/).
2. Skonfiguruj funkcje serverless:
    - Wskaz backend (np. thermal_bridges_api.py) jako Netlify Function (`netlify.toml` – sekcja functions).
    - Ustaw CORS tylko dla własnej domeny.
3. Skonfiguruj build i deploy (`npm run build` jeśli używasz Next.js/React).
4. Frontend i backend będą dostępne z poziomu jednego projektu (własna domena Netlify).
5. Eksport PDF działa przez API `/api/clt/thermal-bridges/pdf`.

---

### 🔒 **Bezpieczeństwo**
- API zabezpieczone przez CORS (tylko własna domena).
- Brak wrażliwych danych w eksportach PDF/JSON.
- Możliwość wdrożenia autoryzacji tokenem.

---

### 📄 **Pełna dokumentacja w plikach JSON oraz kod w katalogach frontend/backend.**

---

### 🇬🇧🇩🇪 🇵🇱 **Wersje językowe dokumentacji dostępne w plikach JSON.**

---

### ✉️ **W razie pytań napisz na kontakt@clthub.com**
# CLT HUB – Moduły Analiz Technicznych (CLT HUB Calculation Modules)

## Szybki start – uruchomienie lokalnie i na Netlify

---

### 📦 Struktura katalogów

