require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const authRouter = require('./src/routers/authRouter');

const app = express();
const PORT = process.env.PORT || 3000;
const indexRouter = require('./src/routers/indexRouter');
const clientRouter = require('./routers/clientRouter');
const categoryRouter = require('./src/routers/categoryRouter');
const curatorRouter = require('./src/routers/curatorRouter');
const todoRouter = require('./routers/todoRouter');
const habitRouter = require('./routers/habitRouter');
const parametersRouter = require('./src/routers/parametersRouter');
const stataRouter = require('./src/routers/stataRouter');

const corsOptions = {
  origin: ['http://localhost:5173'],
  optionsSuccessStatus: 200,
  credentials: true,
};

const sessionConfig = {
  name: 'nutrition',
  store: new FileStore(),
  secret: process.env.SECRET_KEY_SESSION,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 10 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

app.use(cors(corsOptions));
app.use(session(sessionConfig));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));

app.use('/auth', authRouter);
app.use('/api/categories', categoryRouter);
app.use('/api/clients', clientRouter);
app.use('/curator', curatorRouter);
app.use('/api/todos', todoRouter);
app.use('/habit', habitRouter);
app.use('/clients', clientRouter);
app.use('/api/parameters', parametersRouter);
app.use('/api/stata', stataRouter);
app.use('*', indexRouter);

app.listen(PORT, () => {
  console.log('Start in ', PORT);
});
