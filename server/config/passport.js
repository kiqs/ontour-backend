"use strict";

const passport = require('koa-passport');
const User = require('../models/user');

User.findOne({ username: 'test' }, (err, testUser) => {
  if (!testUser) {
    console.log('test user did not exist; creating test user...')
    testUser = new User({
      username: 'test',
      password: 'test'
    })
    testUser.save()
  }
});

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, done);
});

const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy((username, password, done) => {
  User.findOne({ username: username, password: password }, done);
}));

const FacebookStrategy = require('passport-facebook').Strategy;
passport.use(new FacebookStrategy({
    clientID: 'your-client-id',
    clientSecret: 'your-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/facebook/callback'
  },
  (token, tokenSecret, profile, done) => {
    // retrieve user
    User.findOne({ facebook_id: profile.id }, done);
  }
));

const TwitterStrategy = require('passport-twitter').Strategy;
passport.use(new TwitterStrategy({
    consumerKey: 'your-consumer-key',
    consumerSecret: 'your-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/twitter/callback'
  },
  (token, tokenSecret, profile, done) => {
    // retrieve user
    User.findOne({ twitter_id: profile.id }, done);
  }
));

const GoogleStrategy = require('passport-google-auth').Strategy;
passport.use(new GoogleStrategy({
    clientId: 'your-client-id',
    clientSecret: 'your-secret',
    callbackURL: 'http://localhost:' + (process.env.PORT || 3000) + '/auth/google/callback'
  },
  (token, tokenSecret, profile, done) => {
    // retrieve user
    User.findOne({ google_id: profile.id }, done);
  }
));

const GithubStrategy = require('passport-github').Strategy;
passport.use(new GithubStrategy({
  clientID: '[Your CLIENTID]',
  clientSecret: 'Your Secret',
  callbackURL: "http://localhost:3000/auth/github/callback"
}, (accessToken, refreshToken, profile, done) => {
  //Based on profile return from Github, find existing user
  let user = profile;

  //Return user model
  return done(null, user);
}));

module.exports = passport;
