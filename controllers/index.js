import authRoutes from "../routes/api/auth";
import passport from "passport";


export default function(app) {
    authRoutes(app);
    // This app.use below ensures that we need authentication to happen from this point on.
    app.use(passport.authenticate("jwt", {session: false}));
    // Only then, can we start using the other routes

    // ALL OTHER ROUTES GO HERE

}