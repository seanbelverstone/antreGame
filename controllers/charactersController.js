const db = require("../models");

module.exports = {
  get: (request, response) => {
    db.Character.findOne({
      where: {
        id: request.params.id
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
    db.Character.update(request.params.id, (result) => {
        // console.log(result);
        
        res.json(result);
    })
}
};