const UsersController = require("../../controllers/usersController");

export default function(app) {

  app.route("/api/users/:id")
    .get(UsersController.get)

  app.route("/api/users/")
    .post(UsersController.create);
}