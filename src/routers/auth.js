var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const passport = require('passport')
const GOOGLE_CLIENT_ID = '64343406918-rsi9hme8buvdiv9j892numpko7mkahjp.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET =  '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'
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    console.log(accessToken)
    console.log(1)
    return done(null, profile);
  }
));
passport.serializeUser(function(user, done){
    console.log(user._json)
    done(null, user);
})

passport.deserializeUser(function(user, done){
    console.log(3)
    done(null, user);
})