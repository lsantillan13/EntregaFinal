/*================================ - DAO - ================================*/
const express = require('express');
const router = express.Router();

const {authJwt} = require('../middlewares');
/*=====                           - MONGODB -                        =====*/
const ProductosDAO = require('../Daos/productos/MongoDB.js');
const MensajesDAO = require('../Daos/mensajes/MensajesMongo.js');
const DAO = new ProductosDAO();
const MDAO = new MensajesDAO();
/*=====                            Productos                         =====*/
/*Public Routes*/

/*Express*/
router.get('/productos', DAO.getAll);
router.get('/productos/:id', DAO.getById);
/*Private Routes*/
router.post('/productos', [authJwt.verifyToken, authJwt.isModerator], DAO.createProduct);
router.put('/productos/:id',  [authJwt.verifyToken, authJwt.isAdmin], DAO.updateById);
router.delete('/productos/:id', [authJwt.verifyToken, authJwt.isAdmin], DAO.deleteById);
//router.get('/delete', (req, res) => {product.deleteAll(req, res);});
/*=====                            Mensajes                          =====*/
router.get('/mensajes', (req, res) => { MDAO.getAll(req, res); });
router.post('/mensajes', (req, res) => { MDAO.createMessage(req, res); });


module.exports = router;