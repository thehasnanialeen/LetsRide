//used for Uber API

const passport = require('passport');
const { Strategy: OAuth2Strategy } = require('passport-oauth2');

passport.use(new OAuth2Strategy({
  authorizationURL: 'https://login.uber.com/oauth/v2/authorize',
  tokenURL: 'https://login.uber.com/oauth/v2/token',
  clientID: '1AszzA0Jqbg6mqm7cKyxVU499BtXRzNs',
  clientSecret: 'vXZjDDn_TE5SI2T2-hLxRbj0mhufGltDXH2McGV6',
  callbackURL: 'http://localhost:5000/auth/uber/callback',
}, (accessToken, refreshToken, profile, done) => {
  // Store access token and perform any additional user authentication or setup
  done(null, { accessToken, refreshToken });
}));

module.exports = passport;