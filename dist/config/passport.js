"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = __importDefault(require("../db/prisma"));
dotenv_1.default.config();
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: "737357182381-btd6kl0l49kkpmbdv1i8qg61fgve6ron.apps.googleusercontent.com",
    // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    clientSecret: "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",
    callbackURL: "http://localhost:4000/auth/google/callback",
}, async (accessToken, refreshToken, profile, done) => {
    try {
        let user = await prisma_1.default.user.findUnique({
            where: { email: profile.emails?.[0].value || "" },
        });
        if (!user) {
            user = await prisma_1.default.user.create({
                data: {
                    name: profile.displayName,
                    email: profile.emails ? profile.emails[0].value : "",
                    avatar: profile.photos ? profile.photos[0].value : "default-avatar.png",
                    provider: profile.provider,
                },
            });
        }
        return done(null, user);
    }
    catch (err) {
        return done(err, "");
    }
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((obj, done) => {
    done(null, obj);
});
//# sourceMappingURL=passport.js.map