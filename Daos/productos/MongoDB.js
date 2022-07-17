const ContenedorMongoDB = require('../../controllers/products/MongoDB.controllers.js');
const ProductsModel = require('../../Models/Productos.model.js');


class ProductosDAO extends ContenedorMongoDB {
  constructor(){
    super(ProductsModel);
  }
}

module.exports = ProductosDAO;