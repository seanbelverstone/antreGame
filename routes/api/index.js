import authRoute from "./auth";
import userRoute from "./users";
import characterRoute from "./characters";

export default function(app) {
	authRoute(app);
	userRoute(app);
	characterRoute(app);
}