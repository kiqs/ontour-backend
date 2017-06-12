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
