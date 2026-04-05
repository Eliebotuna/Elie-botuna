const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const express = require('express');
const cors = require('cors');
const { mailConfigured } = require('./mailTransport');
const { processContactPayload } = require('./contactMailLogic');

const app = express();
const port = parseInt(process.env.PORT, 10) || 5001;

const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length ? allowedOrigins : true,
    methods: ['POST', 'GET', 'OPTIONS'],
  })
);
app.use(express.json({ limit: '64kb' }));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, mail: mailConfigured() });
});

app.post('/api/contact', async (req, res) => {
  const { status, json } = await processContactPayload(req.body);
  res.status(status).json(json);
});

const server = app.listen(port, () => {
  console.log(`API contact sur http://localhost:${port} (POST /api/contact)`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(
      `Port ${port} déjà utilisé. Ferme l’autre terminal « npm run server » / « npm run dev », ou mets PORT=5002 dans .env et le même port dans package.json → proxy.`
    );
    process.exit(1);
  }
  throw err;
});
