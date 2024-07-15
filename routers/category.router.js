const { Router } = require("express");
const {  UpdateData, getData, Catcreate } = require("../controllers/category.controller");

const catRouter = Router()

catRouter.post('/create', Catcreate)
catRouter.patch('/update/:id', UpdateData)
catRouter.get('/getData',getData)

module.exports = {catRouter}