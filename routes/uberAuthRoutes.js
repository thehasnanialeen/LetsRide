const express = require('express');
const passport = require('../controllers/passportConfiguration');

const router = express.Router();

// Route for initiating the Uber OAuth 2.0 authentication flow
router.get('/uber', passport.authenticate('oauth2'));

// Callback route for handling the Uber OAuth 2.0 authentication callback
router.get('/uber/callback', passport.authenticate('oauth2', { failureRedirect: '/login' }), (req, res) => {
  // Successful authentication, redirect to a success page or perform further actions
  res.redirect('/success');
});

module.exports = router;