const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema({
    SubCatName : String,
    extraCatId : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'extracategoryTbl',
        unique: true
    }]
})

const SubcatModel = mongoose.model('SubcategoryTbl',SubcategorySchema)

module.exports = SubcatModel;