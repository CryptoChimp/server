require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const session = require('cookie-session');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const connectToDatabase = require('./config/db');
require('./config/passport')(passport);

const app = express();

const { CLIENT_HOME } = process.env;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: CLIENT_HOME,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  }),
);
app.use(
  session({
    name: 'session',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
);
app.use(passport.initialize());
app.use(passport.session());

connectToDatabase();

app.use('/user', userRoutes);
app.use('/auth', authRoutes);

module.exports = app;
