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
