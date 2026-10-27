const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const BASE = 'https://api.aniwatch.to';

app.get('/anime/search', async (req, res) => {
  try {
    const q = req.query.q;
    const r = await axios.get(`${BASE}/anime/search?q=${encodeURIComponent(q)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://aniwatch.to' }
    });
    res.json(r.data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/anime/info/:id', async (req, res) => {
  try {
    const r = await axios.get(`${BASE}/anime/info?id=${req.params.id}`, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://aniwatch.to' }
    });
    res.json(r.data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/anime/episodes/:id', async (req, res) => {
  try {
    const r = await axios.get(`${BASE}/anime/episodes/${req.params.id}`, {
      headers: { 'User-Agent': 'Mozilla/5.0', 'Referer': 'https://aniwatch.to' }
    });
    res.json(r.data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
