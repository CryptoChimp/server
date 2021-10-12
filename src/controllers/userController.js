const { updateCash, addCoin, updateCoin } = require('../helpers/transaction');

const getCurrentUser = (req, res) => {
  res.send(req.user);
};

const buyCoin = (req, res) => {
  const { symbol, quantity, price } = req.body;
  const { googleId } = req.user;

  let message;
  let status;

  const totalPrice = price * quantity;
  const newCash = req.user.cash - totalPrice;
  const userOwnsCoin = req.user.wallet.some((data) => data.symbol === symbol);

  if (!price) {
    message = 'Symbol not found';
    status = 'error';
  } else if (newCash < 0) {
    message = 'Not enough cash';
    status = 'error';
  } else if (userOwnsCoin) {
    updateCoin(googleId, symbol, quantity, totalPrice);
    updateCash(googleId, newCash);
    message = 'Bought existing coin';
    status = 'success';
  } else {
    addCoin(googleId, symbol, quantity, totalPrice);
    updateCash(googleId, newCash);
    message = 'Bought coin';
    status = 'success';
  }

  console.log(message);
  res.send({ message, status });
};

module.exports = {
  getCurrentUser,
  buyCoin,
};
