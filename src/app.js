require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./config/db');

const app = express();

connectToDatabase();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

module.exports = app;
