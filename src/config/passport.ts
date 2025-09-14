import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import dotenv from "dotenv";
import prisma from "../db/prisma";
dotenv.config();

passport.use(
    new GoogleStrategy(
        {
            clientID: "737357182381-btd6kl0l49kkpmbdv1i8qg61fgve6ron.apps.googleusercontent.com",
            // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            clientSecret: "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",
            callbackURL: "http://localhost:4000/auth/google/callback",
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                let user = await prisma.user.findUnique({
                    where: { email: profile.emails?.[0].value || "" },
                });

                if (!user) {
                    user = await prisma.user.create({
                        data: {
                            name: profile.displayName,
                            email: profile.emails ? profile.emails[0].value : "",
                            avatar: profile.photos ? profile.photos[0].value : "default-avatar.png",
                            provider: profile.provider,
                        },
                    });
                }
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
// // Bắt đầu login
// app.get("/auth/google",
//     passport.authenticate("google", { scope: ["profile", "email"] })
// );

// // Google redirect về đây
// app.get(
//     "/auth/google/callback",
//     passport.authenticate("google", { session: false }),
//     (req, res) => {
//         const user = req.user;

//         // Tạo JWT
//         const token = jwt.sign(
//             { id: user.id, email: user.email, name: user.name },
//             process.env.JWT_SECRET,
//             { expiresIn: "1h" }
//         );

//         // Redirect về FE kèm token
//         res.redirect(`http://localhost:3000/auth/callback?token=${token}`);
//     }
// );