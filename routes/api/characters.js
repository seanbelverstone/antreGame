const CharactersController = require("../../controllers/charactersController");

export default function(app) {

    app.route("/api/characters/:id")
        .get(CharactersController.get);

    app.route("/api/characters/")
        .post(CharactersController.create);

    app.route("/api/characters/")
        .put(CharactersController.update);
}