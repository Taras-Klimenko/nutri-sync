const express = require('express');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Работает');
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
