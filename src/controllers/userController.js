const { updateCash, addCoin, updateCoin } = require('../helpers/transaction');

const getCurrentUser = (req, res) => {
  res.send(req.user);
};

const buyCoin = (req, res) => {
  const { symbol, quantity, price } = req.body;
  const { googleId } = req.user;

  let errorMessage = null;

  const totalPrice = price * quantity;
  const newCash = req.user.cash - totalPrice;
  const userOwnsCoin = req.user.wallet.some((data) => data.symbol === symbol);

  if (!price) {
    errorMessage = 'Symbol not found';
  } else if (newCash < 0) {
    errorMessage = 'Not enough cash';
  } else if (userOwnsCoin) {
    updateCoin(googleId, symbol, quantity, totalPrice);
    updateCash(googleId, newCash);
    errorMessage = 'Bought existing coin';
  } else {
    addCoin(googleId, symbol, quantity, totalPrice);
    updateCash(googleId, newCash);
    errorMessage = 'Bought coin';
  }

  console.log(errorMessage);
  res.send({ error_message: errorMessage });
};

module.exports = {
  getCurrentUser,
  buyCoin,
};
