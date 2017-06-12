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
