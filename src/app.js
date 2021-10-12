require('dotenv').config();
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);

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
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  }),
);

app.use(passport.initialize());
app.use(passport.session());

connectToDatabase();

app.use('/user', userRoutes);
app.use('/auth', authRoutes);

module.exports = app;
