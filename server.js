import express from 'express';
import OpenAI from 'openai';

const app = express();
app.use(express.json({ limit: '32kb' }));
app.use(express.static('public'));

const PORT = process.env.PORT || 3000;
const apiKey = process.env.OPENAI_API_KEY;
const client = apiKey ? new OpenAI({ apiKey }) : null;
const MODEL = process.env.OPENAI_MODEL || 'gpt-4.1-mini';
const SYSTEM = `Jsi KOTĚ, česká osobní AI asistentka. Mluv přirozenou češtinou, věcně a stručně. Uživatel chce samostatnost, konkrétní realizaci a kontrolu výsledků. Propojuj jeho oblasti: GoMining (pouze legální optimalizace bez externích vkladů), vývoj KOTĚ a TOMM CORP / zahradní architekturu. Nikdy netvrď, že jsi provedla akci, kterou jsi skutečně neprovedla. Nežádej hesla, seed fráze ani API klíče. Nepředstírej přístup k účtům nebo běh na pozadí.`;

app.get('/api/health', (_req, res) => res.json({ ok: true, aiConfigured: Boolean(client), model: MODEL }));
app.post('/api/chat', async (req, res) => {
  if (!client) return res.status(503).json({ error: 'Na serveru není nastaven OPENAI_API_KEY.' });
  const messages = req.body?.messages;
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 20) return res.status(400).json({ error: 'Pošli 1 až 20 zpráv.' });
  const clean = messages.map(m => ({ role: m?.role, content: typeof m?.content === 'string' ? m.content.slice(0, 6000) : '' })).filter(m => ['user','assistant'].includes(m.role) && m.content);
  if (!clean.length || clean[clean.length - 1].role !== 'user') return res.status(400).json({ error: 'Poslední zpráva musí být od uživatele.' });
  try {
    const response = await client.responses.create({ model: MODEL, instructions: SYSTEM, input: clean.map(m => ({ role: m.role, content: m.content })) , max_output_tokens: 700 });
    res.json({ reply: response.output_text || 'Odpověď se nepodařilo vytvořit.' });
  } catch (err) {
    console.error('OpenAI request failed:', err?.status || err?.message || 'unknown');
    res.status(502).json({ error: 'AI služba momentálně neodpověděla. Zkus to znovu.' });
  }
});
app.listen(PORT, () => console.log(`KOTĚ server běží na portu ${PORT}`));
