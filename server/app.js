require('dotenv').config();
const logger = require('morgan');
const express = require('express');

const app = express();

const PORT = 3100;

const clientRouter = require('./routers/clientRouter');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Работает');
});

app.use('/clients', clientRouter);

app.use('/clients/:id', clientRouter);

app.use('client/:id/param', clientRouter);

app.use('*', (req, res) => {
  res.redirect('/');
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
