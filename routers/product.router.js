const { Router } = require('express');
const { productPage, addProduct, productData, deleteData, updateData, getCat, sendGetdata, getSubCat, sendSubGetdata, getOldData, sendOldData } = require('../controllers/product.controller');
const { isAuth } = require('../middleware/middleware');
const productRouter = Router();

productRouter.get('/', isAuth, productPage)

productRouter.get('/data', productData)

productRouter.post('/addProduct', isAuth,  addProduct)

productRouter.post('/getCat', isAuth,  getCat)

productRouter.get('/getCat', isAuth,  sendGetdata)

productRouter.post('/getExtraCat', isAuth,  getSubCat)

productRouter.post('/oldData', isAuth,  getOldData)

productRouter.get('/oldData', isAuth,  sendOldData)

productRouter.get('/getExtraCat', isAuth,  sendSubGetdata)

productRouter.delete('/delete/:id', isAuth,  deleteData)

productRouter.patch('/update/:id', isAuth,  updateData)

module.exports = productRouter
