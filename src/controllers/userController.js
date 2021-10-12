const {
  updateCash,
  addCoin,
  updateCoin,
  removeCoin,
} = require('../helpers/transaction');

const getCurrentUser = (req, res) => {
  res.send(req.user);
};

const buyCoin = (req, res) => {
  const { symbol, quantity, price } = req.body;
  const { googleId } = req.user;

  console.log(req.body);

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

const sellCoin = (req, res) => {
  const { symbol, price } = req.body;
  const { quantity } = req.user.wallet.find((data) => data.symbol === symbol);
  const { googleId } = req.user;

  console.log(req.body);

  const totalPrice = price * quantity;
  const newCash = req.user.cash + totalPrice;

  removeCoin(googleId, symbol);
  updateCash(googleId, newCash);

  const response = { message: 'Sold coins', status: 'success' };

  console.log(response.message);
  res.send(response);
};

module.exports = {
  getCurrentUser,
  buyCoin,
  sellCoin,
};
