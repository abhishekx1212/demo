const mongoose = require('mongoose');

const extracategorySchema = new mongoose.Schema({
    extraCatName : String
})

const extracatModel = mongoose.model('extracategoryTbl',extracategorySchema)

module.exports = extracatModel;