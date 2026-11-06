# Kote — osobní AI asistentka

Česká webová asistentka s hlasovým rozhraním a serverovým AI chatem.

## Spuštění lokálně

1. Nainstaluj Node.js 20 nebo novější.
2. Spusť `npm install`.
3. Nastav proměnnou prostředí `OPENAI_API_KEY` mimo Git a mimo prohlížeč.
4. Volitelně nastav `OPENAI_MODEL` (výchozí `gpt-4.1-mini`).
5. Spusť `npm start` a otevři `http://localhost:3000`.

API klíč nikdy nevkládej do HTML, JavaScriptu prohlížeče ani do GitHubu. Soubor `.env.example` je pouze šablona; skutečný `.env` nepřidávej do repozitáře.

## Nasazení

Nasazení vyžaduje Node hosting, build/start příkaz `npm start` a tajnou proměnnou `OPENAI_API_KEY` nastavenou v administraci hostingu. Samotný GitHub repozitář server nespustí. API volání je placené podle tarifu a spotřeby účtu OpenAI; bez API klíče běží pouze samotné rozhraní.

## Endpointy

- `GET /api/health` — stav serveru a informace, zda je AI klíč nastaven.
- `POST /api/chat` — chat; přijímá `{ "messages": [{"role":"user","content":"Ahoj"}] }`.
