const { Router } = require("express");
const { extraCatcreate } = require("../controllers/extraCat.controller");

const extracatRouter = Router()

extracatRouter.post('/create', extraCatcreate)

module.exports = { extracatRouter }