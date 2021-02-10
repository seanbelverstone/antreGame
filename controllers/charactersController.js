const db = require("../models");

module.exports = {

  // route for finding a single character
  get: (request, response) => {
    db.Character.findOne({
      where: {
        id: request.params.id
      }
    }).then((character) => {
      response.json(character);
    });
  },

  delete: (request, response) => {
    db.Character.destroy({
      where: {
        id: request.params.id
      }
    }).then((deletedCharacter) => {
      response.json(deletedCharacter)
    }).catch(err => response.status(422).json(err));
  },

  // route for finding all characters related to the user
  get: (request, response) => {
    db.Character.findAll({
      where: {
        userId: request.params.id,
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