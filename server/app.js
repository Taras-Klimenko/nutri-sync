require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const categoryRouter = require('./src/routers/categoryRouter');

const app = express();

const { PORT } = process.env || 3100;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));

app.use('/api/categories', categoryRouter);

app.get('/', (req, res) => {
  res.send('Работает');
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
