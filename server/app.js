require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const authRouter = require('./src/routers/authRouter');

const app = express();
const PORT = process.env.PORT || 3300;


app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  }),
);

const { PORT } = process.env || 3100;

app.use(cors({ credentials: true, origin: ['http://localhost:5173'] }));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('Работает');
});

app.use('/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
