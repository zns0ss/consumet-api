const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const BASE = 'https://gogoanime3.co';

app.get('/anime/gogoanime/search', async (req, res) => {
  try {
    const q = req.query.q;
    const r = await axios.get(`${BASE}/search.html?keyword=${encodeURIComponent(q)}`, {
      headers: { 'User-Agent': 'Mozilla/5.0' },
      maxRedirects: 5
    });
    const $ = cheerio.load(r.data);
    const results = [];

    // tenta vários seletores possíveis
    const seletores = ['ul.items li', '.anime_list_body li', '.last_episodes li', 'article', '.video-block'];
    let achou = '';
    seletores.forEach(s => {
      if ($(s).length > 0) achou += s + '=' + $(s).length + ' | ';
    });

    res.json({ debug: achou, html_sample: r.data.slice(0, 2000), results });
  } catch(e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
