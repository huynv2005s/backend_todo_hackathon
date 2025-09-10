import "dotenv/config";
import express from "express";
import cors from "cors";
import boardRoutes from "./modules/board/board.routes";
import columnRoutes from "./modules/column/column.routes";
import taskRoutes from "./modules/task/task.routes";
import prisma from "./db/prisma";
// dotenv.config();
const app = express();
app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json());


// app.use(passport.initialize());

// import { Strategy as GoogleStrategy } from "passport-google-oauth20";


// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: "737357182381-btd6kl0l49kkpmbdv1i8qg61fgve6ron.apps.googleusercontent.com",
//             // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             clientSecret: "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",
//             callbackURL: "http://localhost:4000/auth/google/callback",
//         },
//         async (accessToken, refreshToken, profile, done) => {
//             try {
//                 const user = {
//                     // id: profile.id,
//                     // email: profile.emails[0].value,
//                     // name: profile.displayName,
//                     // avatar: profile.photos[0].value,
//                 };
//                 return done(null, user);
//             } catch (err) {
//                 return done(err, "");
//             }
//         }
//     )
// );
// passport.serializeUser((user, done) => {
//     done(null, user);
// });
// passport.deserializeUser((obj: any, done) => {
//     done(null, obj);
// });
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
app.use("/boards", boardRoutes);
app.use("/columns", columnRoutes);
app.use("/tasks", taskRoutes);
app.get("/test", async (req, res) => {
    return await prisma.user.create({
        data: { name: "Test", email: "huy@gmail.com" }
    });
});
const port = Number(process.env.PORT || 4000);
app.listen(port, () => console.log(`HTTP on http://localhost:${port}`));
