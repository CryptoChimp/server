const express = require('express');
const passport = require('passport');

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(`${process.env.CLIENT_HOME}/home`);
  },
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_HOME);
});

module.exports = router;
