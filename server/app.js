require('dotenv').config();
const express = require('express');

const app = express();

const { PORT } = process.env || 3100;

app.get('/', (req, res) => {
  res.send('Работает');
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
