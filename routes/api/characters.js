const CharactersController = require("../../controllers/charactersController");

export default function(app) {

    // single character
    app.route("/api/characters/:id")
        .get(CharactersController.get)
        .delete(CharactersController.delete);

    // all characters
    app.route("/api/characters/")
        .get(CharactersController.get);

    app.route("/api/characters/")
        .post(CharactersController.create);

    app.route("/api/characters/:id")
        .put(CharactersController.update);

}