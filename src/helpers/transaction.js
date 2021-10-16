const User = require('../models/User');

const addCoin = (userId, coinSymbol, coinQuantity, price) => {
  User.updateOne(
    { googleId: userId },
    {
      $push: {
        wallet: [
          {
            symbol: coinSymbol,
            quantity: coinQuantity,
            amountInvested: price,
          },
        ],
      },
    },
    (err) => {
      if (err) {
        console.log(err);
      }
    },
  );
};

const removeCoin = (userId, coinSymbol) => {
  User.updateOne(
    { googleId: userId },
    {
      $pull: {
        wallet: { symbol: coinSymbol },
      },
    },
    { safe: true },
    (err) => {
      if (err) {
        console.log(err);
      }
    },
  );
};

const updateCoin = (userId, coinSymbol, coinQuantity, price) => {
  User.updateOne(
    { 'wallet.symbol': coinSymbol, googleId: userId },
    {
      $inc: {
        'wallet.$.quantity': coinQuantity,
        'wallet.$.amountInvested': price,
      },
    },
    (err) => {
      if (err) {
        console.log(err);
      }
    },
  );
};

const updateCash = (userId, newCash) => {
  User.updateOne({ googleId: userId }, { cash: newCash }, (err) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = {
  updateCash,
  addCoin,
  updateCoin,
  removeCoin,
};
