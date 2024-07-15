const { Router } = require("express");
const { SubCatcreate, UpdateData, getData } = require("../controllers/subCategory.controller");

const SubcatRouter = Router()

SubcatRouter.post('/create', SubCatcreate)
SubcatRouter.patch('/update/:id', UpdateData)
SubcatRouter.get('/getData',getData)

module.exports = { SubcatRouter }