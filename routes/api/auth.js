  const authController = require("../../controllers/authController");

export default function(app) {
    app.route("/api/auth/")
        .post(authController.validate);
}