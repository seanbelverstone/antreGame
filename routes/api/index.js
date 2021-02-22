import authRoute from "./auth";
import userRoute from "./users";
import characterRoute from "./characters";
import passport from "passport";

export default function(app) {
	userRoute(app);
	authRoute(app);
	app.use(passport.authenticate("jwt", {session: false}));
	characterRoute(app);
}