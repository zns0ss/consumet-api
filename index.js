const express = require('express');
const cors = require('cors');
const { ANIME } = require('@consumet/extensions');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const gogoanime = new ANIME.Gogoanime();

app.get('/anime/gogoanime/search', async (req, res) => {
  try {
    const q = req.query.q;
    const data = await gogoanime.search(q);
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

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
