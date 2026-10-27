const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

let gogoanime;

async function init() {
  const mod = await import('@consumet/extensions');
  const Gogoanime = mod.ANIME?.Gogoanime || mod.default?.ANIME?.Gogoanime;
  gogoanime = new Gogoanime();
  app.listen(PORT, () => console.log(`Rodando na porta ${PORT}`));
}

app.get('/anime/gogoanime/search', async (req, res) => {
  try {
    const data = await gogoanime.search(req.query.q);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/anime/gogoanime/info/:id', async (req, res) => {
  try {
    const data = await gogoanime.fetchAnimeInfo(req.params.id);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

app.get('/anime/gogoanime/watch/:episodeId', async (req, res) => {
  try {
    const data = await gogoanime.fetchEpisodeSources(req.params.episodeId);
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

init();
