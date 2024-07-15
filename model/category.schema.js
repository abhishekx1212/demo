const mongoose = require('mongoose');

// const categorySchema = new mongoose.Schema({
//     CatName : String,
//     SubCatId : {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'SubcategoryTbl'
//     }
// })

const categorySchema = new mongoose.Schema({
    CatName: {
        type: String,
        required: true // Added validation to ensure CatName is provided
    },
    SubCatId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SubcategoryTbl',
        unique: true // Ensure each SubCatId in the array is unique
    }]
});

const catModel = mongoose.model('categoryTbl',categorySchema)

module.exports = catModel;