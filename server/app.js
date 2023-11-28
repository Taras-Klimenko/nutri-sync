require('dotenv').config();

const logger = require('morgan');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const authRouter = require('./src/routers/authRouter');
const clientRoute = require('./routes/clientRoute');

const app = express();
const PORT = process.env.PORT || 3000;
const clientRouter = require('./routers/clientRouter');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
=======
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  }),
);



app.use(cors({ credentials: true, origin: ['http://localhost:5173'] }));
app.use(morgan('dev'));
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
=======
app.use('/auth', authRouter);
app.use('/client', clientRoute);

app.listen(PORT, () => {
 
  console.log('Start in ', PORT);
});
