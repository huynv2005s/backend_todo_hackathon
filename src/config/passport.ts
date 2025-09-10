import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: "todologin-471606",
            // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            clientSecret: "737357182381-btd6kl0l49kkpmbdv1i8qg61fgve6ron.apps.googleusercontent.com",
            callbackURL: "http://localhost:4000/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = {
                    // id: profile.id,
                    // email: profile.emails[0].value,
                    // name: profile.displayName,
                    // avatar: profile.photos[0].value,
                };
                return done(null, user);
            } catch (err) {
                return done(err, "");
            }
        }
    )
);
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((obj: any, done) => {
    done(null, obj);
});

export default passport;
