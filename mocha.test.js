const ProductosDAO = require('./Daos/productos/MongoDB.js');
const assert = require('assert').strict;

describe('Test', function(){
  it('debería crear una nueva instancia de productos',function(){
    const DAO = new ProductosDAO();
    assert.strictEqual(DAO.getAll().lenght, 0);
  });

  it('debería adicionar productos',function(){
    const DAO = new ProductosDAO();

    DAO.createProduct('title', 'price', 'asd');
    assert.strictEqual(DAO.getAll().lenght, 0);
  });
});