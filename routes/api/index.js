import authRoute from "./auth";
import userRoute from "./users";
import characterRoute from "./characters";
import passport from "passport";

export default function(app) {
	authRoute(app);
	userRoute(app);
	app.use(passport.authenticate("jwt", {session: false}));
	characterRoute(app);
}