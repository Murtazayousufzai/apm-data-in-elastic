require('./apm');
const express = require('express');
const apm = require('elastic-apm-node');

const app = express();

app.get('/', (req, res) => {
  res.send(`
    <h1>Elastic APM Demo</h1>
    <button onclick="fetch('/trace').then(r => r.text()).then(alert)">Trigger Trace</button>
    <button onclick="fetch('/error').then(r => r.text()).catch(err => alert('Error triggered!'))">Trigger Error</button>
    <button onclick="fetch('/slow').then(r => r.text()).then(alert)">Trigger Slow Request</button>
  `);
});

// Trace route
app.get('/trace', async (req, res) => {
  const span1 = apm.startSpan('simulate-db-call');
  await new Promise(resolve => setTimeout(resolve, 400));
  span1?.end();

  const span2 = apm.startSpan('external-api-call');
  await new Promise(resolve => setTimeout(resolve, 600));
  span2?.end();

  res.send('Trace with spans created');
});

// Error route
app.get('/error', (req, res) => {
  throw new Error('Test APM error!');
});

// Slow route
app.get('/slow', async (req, res) => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  res.send('Slow response done');
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App running on http://localhost:${PORT}`);
});
