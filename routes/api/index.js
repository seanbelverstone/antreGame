import authRoute from "./auth";
import userRoute from "./users";

export default function(app) {
	authRoute(app);
	userRoute(app);
}