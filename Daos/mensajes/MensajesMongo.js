const ContenedorMongoDB = require('../../controllers/messages/Mongo.controllers.js');

class MensajesDAO extends ContenedorMongoDB {
  constructor(){
    super('mensajes',
      {
        author:  { type: String, required: true },
        message: { type: String, required: true },
        date:    { type: String, required: true},
      }
    );
  }
}
module.exports = MensajesDAO;