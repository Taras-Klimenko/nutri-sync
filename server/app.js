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
const clientRouter = require('./routers/clientRouter');
const categoryRouter = require('./src/routers/categoryRouter');

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
  }),
);

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));



app.use('/auth', authRouter);
app.use('/api/categories', categoryRouter);
app.use('/clients', clientRouter);
// app.use('/clients/:id', clientRouter);
// app.use('clients/:id/param', clientRouter);

app.use('*', (req, res) => {
    res.redirect('/');
});

app.listen(PORT, () => {

  console.log('Start in ', PORT);
});
