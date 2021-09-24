const mongoose = require('mongoose');

const { MONGO_URI } = process.env;

const connectToDatabase = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('Connected to database');
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectToDatabase;
