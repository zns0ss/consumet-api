const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const BASE = 'https://gogoanime3.co';

app.get('/anime/gogoanime/search', async (req, res) => {
  try {
    const q = req.query.q;
    const r = await axios.get(`${BASE}/search.html?keyword=${encodeURIComponent(q)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' }
    });
    res.send(r.data);
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
