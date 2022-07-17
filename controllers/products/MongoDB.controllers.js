/*==== Essentials ====*/
const mongoose = require('mongoose');
const config = require('../../utils/config');
const Product = require('../../Models/Productos.model.js');
/*====    //    ====*/
mongoose.connect(config.mongoDB.URL, config.mongoDB.options);

class ContenedorMongoDB{

  constructor(){}
  /*============================= Regular Methods =============================*/
  // C
  async createProduct (req, res) {
    try{
      const { title, price, img } = req.body;
      const newProduct = new Product({ title, price, img, description: ''});
      const productSaved = await newProduct.save();
  
      res.status(201).json(productSaved);
    }
    catch (error){ console.log(error); return res.status(500).json(error); }
  }
  // R
  async getAll(req, res){  
    try { 
      const products = await Product.find();
      res.json(products);
    }
    catch(err){ console.log(err); }
  }
  //
  /*============================= By ID Methods =============================*/
  async getById(req, res){
    const { id } = req.params;
    const doc = await Product.findById(id);
    return res.send(doc);
  }
  // U
  async updateById(req, res){
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true
      }
    );
    res.status(200).json(updatedProduct);
  }
  // D
  async deleteById(req, res){
    const {id} = req.params;
    await Product.findByIdAndDelete(id);
    res.status(204).send(); }
}

module.exports = ContenedorMongoDB;