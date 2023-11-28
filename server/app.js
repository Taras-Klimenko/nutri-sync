const express = require('express');
require('dotenv').config();
const cors = require('cors');
const morgan = require('morgan');

const app = express();

const PORT = process.env.PORT || 3000;
const { sequelize } = require('./db/models');

const clientRoute = require('./routes/clientRoute');



app.use(cors({ credentials: true, origin: true }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/client', clientRoute);

app.listen(PORT, () => {
  sequelize
      .authenticate()
      .then(() => console.log('БД подключена!'))
      .catch((error) => console.log('ERROR DB==>', error));
  console.log('Start in ', PORT);
});
