const db = require("../models");

module.exports = {

  // route for finding a single character
  get: (request, response) => {
    db.Character.findOne({
      where: {
        id: request.params.id
      },
      include: [db.User]
    }).then((character) => {
      response.json(character);
    });
  },

  // route for finding all characters related to the user
  get: (request, response) => {
    db.Character.findAll({
      where: {
        id: request.query.id,
        include: [db.User]
      }
    }).then((character) => {
      response.json(character);
    });
  },
   
  create: (request, response) => {
    db.Character
      .create(request.body)
      .then(dbModel => response.json(dbModel))
      .catch(err => response.status(422).json(err));
  },

  update: (request, response) => {
    db.Character.update(
      request.body, {
        where: {
          id: request.body.id
        }
    }).then(dbModel => {
      response.json(dbModel);
    });
}
};