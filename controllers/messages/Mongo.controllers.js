/*==== Essentials ====*/
const mongoose = require('mongoose');
const config = require('../../utils/config');
/*====    //    ====*/
mongoose.connect(config.mongoDB.URL);

class ContenedorMongoDB{

  constructor(nombreColeccion, esquema){ this.coleccion = mongoose.model(nombreColeccion, esquema); }

  /*============================= Regular Methods =============================*/
  // C
  async createMessage (req, res) {
    const { author, message, date } = req.body;
    const myObj = { author, message, date };
    try{ return await this.coleccion.create(myObj) && res.status(200).send({Msg: 'Message appended to DB'});  }
    catch (error){ console.log(error); return res.status(500).json(error); }
  }
  // R
  async getAll(req, res){  
    try { 
      const doc = await this.coleccion.find({});
      res.send(doc);
    }
    catch(err){ console.log(err); }
  }
  // D
  async deleteById(req, res){
    const {id} = req.params;
    await this.coleccion.findByIdAndDelete(id);
    res.status(204).send(); }
}

module.exports = ContenedorMongoDB;